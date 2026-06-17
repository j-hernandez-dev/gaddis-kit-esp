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
                "DeclarationVisitor recibió un contexto vacío"
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
                    `Declaración no soportada: ${ctx.name}`
                );

        }

    }



    /**
     * =========================
     * VARIABLE / ARRAY DECLARATION
     * =========================
     *
     * @param {any} ctx
     */
    visitVariableDeclaration(ctx) {

        const identifiers =
            (CSTAdapter.get(ctx, "Identifier") ?? [])
                .map(
                    (/** @type {{ image: any; }} */ token) => token.image
                );

        const type =
            this.visitType(
                CSTAdapter.first(ctx, "type")
            );

        const dimensionNode =
            CSTAdapter.first(
                ctx,
                "dimensionList"
            );

        /**
         * Si tiene dimensiones,
         * realmente es un arreglo.
         */
        if (dimensionNode) {

            const dimensions =
                (
                    CSTAdapter.get(
                        dimensionNode,
                        "expression"
                    ) ?? []
                )
                    .map(
                        (/** @type {any} */ expr) =>
                            this.expressionVisitor.visitExpression(expr)
                    );


            return ASTFactory.arrayDeclaration(
                ASTFactory.identifier(
                    identifiers[0]
                ),
                dimensions,
                type
            );

        }


        return ASTFactory.variableDeclaration(
            identifiers,
            type
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
                "ConstantDeclaration sin Identifier"
            );
        }


        const value =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(
                    ctx,
                    "expression"
                )
            );


        const dataType =
            this.visitType(
                CSTAdapter.first(ctx, "type")
            );


        return ASTFactory.constantDeclaration(
            ASTFactory.identifier(identifier.image),
            dataType,
            value
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
                "ArrayDeclaration sin Identifier"
            );
        }


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


        return ASTFactory.arrayDeclaration(
            ASTFactory.identifier(identifier.image),
            dimensions,
            type
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
                "FunctionDeclaration sin Identifier"
            );
        }


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


        return ASTFactory.functionDeclaration(
            ASTFactory.identifier(
                identifier.image
            ),
            parameters,
            returnType,
            body
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
                "ProcedureDeclaration sin Identifier"
            );
        }


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


        return ASTFactory.procedureDeclaration(
            ASTFactory.identifier(
                identifier.image
            ),
            parameters,
            body
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
                "Parameter sin Identifier"
            );
        }


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


        return ASTFactory.parameter(
            ASTFactory.identifier(
                identifier.image
            ),
            dimensions,
            type
        );

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
            ) ?? [];



        return ASTFactory.block(

            statements.map(

                (/** @type {any} */ stmt) =>
                    this.statementVisitor.visitStatement(stmt)

            )
        );
    }
}