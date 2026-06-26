/**
 *
 * DeclarationVisitor.js
 *
 * ==================================
 * DECLARATION VISITOR
 * ==================================
 *
 * Convierte declaraciones del CST
 * generado por Chevrotain en nodos AST.
 *
 * CST Declaration
 *        ↓
 * AST Nodes
 *
 * No contiene análisis semántico.
 *
 * ==================================
 */


import { ASTFactory } from "../utils/ASTFactory.js";
import { CSTAdapter } from "../utils/CSTAdapter.js";
import { LocationHelper } from "../utils/LocationHelper.js";


export class DeclarationVisitor {


    /**
     * @param {any} expressionVisitor
     * @param {any} statementVisitor
     */
    constructor(expressionVisitor, statementVisitor) {

        this.expressionVisitor = expressionVisitor;
        this.statementVisitor = statementVisitor;
    }


    /**
     * =========================
     * DISPATCH
     * =========================
     *
     * @param {any} ctx
     */
    visitDeclaration(ctx) {


        if (!ctx) {

            throw new Error(
                "DeclarationVisitor received an empty context"
            );

        }


        switch (ctx.name) {


            case "variableDeclaration":

                return this.visitVariableDeclaration(ctx);



            case "constantDeclaration":

                return this.visitConstantDeclaration(ctx);



            case "arrayDeclaration":

                return this.visitArrayDeclaration(ctx);



            case "functionDeclaration":

                return this.visitFunctionDeclaration(ctx);



            case "procedureDeclaration":

                return this.visitProcedureDeclaration(ctx);



            default:

                throw new Error(
                    `Delcaration not supported: ${ctx.name}`
                );

        }

    }



    /**
     * @param {any} ctx
     */
    visitVariableDeclaration(ctx) {

        const type =
            this.visitType(
                CSTAdapter.first(ctx, "type")
            );

        const items =
            CSTAdapter.get(
                ctx,
                "declarationItem"
            ) ?? [];

        const declarations =
            items.map(
                (/** @type {any} */ item) =>
                    this.visitDeclarationItem(item)
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.variableDeclaration(
            declarations,
            type,
            location
        );
    }

    /**
     * @param {any} ctx
     */
    visitDeclarationItem(ctx) {

        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "VariableDeclaration has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const dimensionNode =
            CSTAdapter.first(
                ctx,
                "dimensionList"
            );

        const dimensions =
            dimensionNode
                ?
                (
                    CSTAdapter.get(
                        dimensionNode,
                        "expression"
                    ) ?? []
                )
                    .map(
                        (/** @type {any} */ expr) =>
                            this.expressionVisitor.visitExpression(expr)
                    )
                :
                [];

        const location = LocationHelper.from(ctx);

        return ASTFactory.declarationItem(
            identifierNode,
            dimensions,
            location
        );
    }

    /**
     * =========================
     * CONSTANT DECLARATION
     * =========================
     *
     * @param {any} ctx
     */
    visitConstantDeclaration(ctx) {


        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "ConstantDeclaration has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const value = [
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            )
        ];


        const dataType =
            this.visitType(
                CSTAdapter.first(ctx, "type")
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.constantDeclaration(
            identifierNode,
            dataType,
            value,
            location
        );
    }

    /**
     * =========================
     * ARRAY DECLARATION
     * =========================
     *
     * @param {any} ctx
     */
    visitArrayDeclaration(ctx) {

        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "ArrayDeclaration has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const dimensionNode =
            CSTAdapter.first(
                ctx,
                "dimensionList"
            );


        const dimensions =
            dimensionNode
                ?
                (
                    CSTAdapter.get(
                        dimensionNode,
                        "expression"
                    ) ?? []
                )
                    .map(
                        (/** @type {any} */ expr) =>
                            this.expressionVisitor.visitExpression(expr)
                    )
                :
                [];


        const type =
            this.visitType(
                CSTAdapter.first(
                    ctx,
                    "type"
                )
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.arrayDeclaration(
            identifierNode,
            dimensions,
            type,
            location
        );
    }


    /**
     * =========================
     * FUNCTION DECLARATION
     * =========================
     *
     * @param {any} ctx
     */
    visitFunctionDeclaration(ctx) {


        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "FunctionDeclaration has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const parameters =
            CSTAdapter.has(
                ctx,
                "parameterList"
            )
                ?
                this.visitParameterList(
                    CSTAdapter.first(
                        ctx,
                        "parameterList"
                    )
                )
                :
                [];


        const returnType =
            CSTAdapter.has(
                ctx,
                "type"
            )
                ?
                this.visitType(
                    CSTAdapter.first(
                        ctx,
                        "type"
                    )
                )
                :
                null;


        const body =
            CSTAdapter.has(
                ctx,
                "block"
            )
                ?
                this.visitBlock(
                    CSTAdapter.first(
                        ctx,
                        "block"
                    )
                )
                :
                null;

        const location = LocationHelper.from(ctx);

        return ASTFactory.functionDeclaration(
            identifierNode,
            parameters,
            returnType,
            body,
            location
        );

    }


    /**
     * =========================
     * PROCEDURE DECLARATION
     * =========================
     *
     * @param {any} ctx
     */
    visitProcedureDeclaration(ctx) {

        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "ProcedureDeclaration has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const parameters =
            CSTAdapter.has(
                ctx,
                "parameterList"
            )
                ?
                this.visitParameterList(
                    CSTAdapter.first(
                        ctx,
                        "parameterList"
                    )
                )
                :
                [];


        const body =
            CSTAdapter.has(
                ctx,
                "block"
            )
                ?
                this.visitBlock(
                    CSTAdapter.first(
                        ctx,
                        "block"
                    )
                )
                :
                null;

        const location = LocationHelper.from(ctx);

        return ASTFactory.procedureDeclaration(
            identifierNode,
            parameters,
            body,
            location
        );

    }


    /**
     * =========================
     * TYPE
     * =========================
     *
     * @param {any} ctx
     */
    visitType(ctx) {

        if (!ctx) {
            return null;
        }

        const children =
            CSTAdapter.children(ctx);

        return Object.keys(children)[0] ?? null;

    }


    /**
     * =========================
     * PARAMETERS
     * =========================
     *
     * @param {any} ctx
     */
    visitParameterList(ctx) {

        return (
            CSTAdapter.get(
                ctx,
                "parameter"
            ) ?? []
        )
            .map(
                (/** @type {any} */ param) =>
                    this.visitParameter(param)
            );
    }

    /**
     * =========================
     * PARAMETER
     * =========================
     *
     * @param {any} ctx
     */
    visitParameter(ctx) {

        const identifier =
            CSTAdapter.token(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "Parameter has no identifier"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const type =
            this.visitType(
                CSTAdapter.first(
                    ctx,
                    "type"
                )
            );


        const dimensionNode =
            CSTAdapter.first(
                ctx,
                "parameterDimensionList"
            );


        const dimensions =
            dimensionNode
                ?
                this.getParameterDimensions(dimensionNode)
                :
                [];

        const location = LocationHelper.from(ctx);

        return ASTFactory.parameter(
            identifierNode,
            dimensions,
            type,
            location
        );
    }

    /**
     * =========================
     * CONTAR DIMENSIONES
     * =========================
     *
     * @param {any} ctx
     */
    getParameterDimensions(ctx) {

        const brackets =
            CSTAdapter.get(
                ctx,
                "LBracket"
            ) ?? [];


        const expressions =
            CSTAdapter.get(
                ctx,
                "expression"
            ) ?? [];

        const dimensions = [];

        for (let i = 0; i < brackets.length; i++) {

            const expression =
                expressions[i];


            dimensions.push(
                expression
                    ?
                    this.expressionVisitor.visitExpression(expression)
                    :
                    null
            );
        }

        return dimensions;
    }

    /**
     * =========================
     * BLOCK
     * =========================
     *
     * @param {any} ctx
     */
    visitBlock(ctx) {

        const statements =
            CSTAdapter.get(
                ctx,
                "statement"
            );

        return ASTFactory.block(
            statements.map(
                (/** @type {any} */ stmt) =>
                    this.statementVisitor.visitStatement(stmt)
            )
        );

    }
}