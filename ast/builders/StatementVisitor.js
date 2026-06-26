/**
 *
 * StatementVisitor.js
 *
 * ==================================
 * STATEMENT VISITOR
 * ==================================
 */

import { ASTFactory } from "../utils/ASTFactory.js";
import { CSTAdapter } from "../utils/CSTAdapter.js";
import { DefaultNode } from "../statements/DefaultNode.js";
import { LocationHelper } from "../utils/LocationHelper.js";

export class StatementVisitor {

    /**
     * @param {import("./ExpressionVisitor.js").ExpressionVisitor} expressionVisitor
     * @param {import("./DeclarationVisitor.js").DeclarationVisitor} declarationVisitor
     */
    constructor(expressionVisitor, declarationVisitor) {
        this.expressionVisitor = expressionVisitor;
        this.declarationVisitor = declarationVisitor;
    }

    /**
     * =========================
     * DISPATCH
     * =========================
     * @param {any} ctx
     */
    visitStatement(ctx) {

        const children = CSTAdapter.children(ctx);

        if (CSTAdapter.has(ctx, "assignmentStatement")) {
            return this.visitAssignment(CSTAdapter.first(ctx, "assignmentStatement"));
        }

        if (CSTAdapter.has(ctx, "ifStatement")) {
            return this.visitIf(CSTAdapter.first(ctx, "ifStatement"));
        }

        if (CSTAdapter.has(ctx, "whileStatement")) {
            return this.visitWhile(CSTAdapter.first(ctx, "whileStatement"));
        }

        if (CSTAdapter.has(ctx, "forStatement")) {
            return this.visitFor(CSTAdapter.first(ctx, "forStatement"));
        }

        if (CSTAdapter.has(ctx, "switchStatement")) {
            return this.visitSwitch(CSTAdapter.first(ctx, "switchStatement"));
        }

        if (CSTAdapter.has(ctx, "returnStatement")) {
            return this.visitReturn(CSTAdapter.first(ctx, "returnStatement"));
        }

        if (CSTAdapter.has(ctx, "readStatement")) {
            return this.visitRead(CSTAdapter.first(ctx, "readStatement"));
        }

        if (CSTAdapter.has(ctx, "writeStatement")) {
            return this.visitWrite(CSTAdapter.first(ctx, "writeStatement"));
        }

        if (CSTAdapter.has(ctx, "procedureCall")) {
            return this.visitProcedureCall(CSTAdapter.first(ctx, "procedureCall"));
        }

        if (
            CSTAdapter.has(ctx, "variableDeclaration") ||
            CSTAdapter.has(ctx, "constantDeclaration") ||
            CSTAdapter.has(ctx, "arrayDeclaration") ||
            CSTAdapter.has(ctx, "functionDeclaration") ||
            CSTAdapter.has(ctx, "procedureDeclaration")
        ) {

            // @ts-ignore
            const declaration = CSTAdapter.first(ctx, Object.keys(children).find(key =>
                [
                    "variableDeclaration",
                    "constantDeclaration",
                    "arrayDeclaration",
                    "functionDeclaration",
                    "procedureDeclaration"
                ].includes(key)
            ));


            return this.declarationVisitor.visitDeclaration(
                declaration
            );
        }

        throw new Error(
            "Statement not supported by StatementVisitor: " +
            JSON.stringify(Object.keys(children))
        );
    }

    /**
     * =========================
     * ASSIGNMENT
     * =========================
     * @param {any} ctx
     */
    visitAssignment(ctx) {

        const lvalue =
            CSTAdapter.first(ctx, "LValue");


        let left;

        // =========================
        // VARIABLE NORMAL
        // =========================

        if (
            CSTAdapter.has(lvalue, "Identifier") &&
            !CSTAdapter.has(lvalue, "expression")
        ) {

            const identifier = CSTAdapter.first(lvalue, "Identifier");

            const identifierLocation =
                LocationHelper.fromTokens(
                    identifier
                );

            left = ASTFactory.identifier(
                identifier.image,
                identifierLocation
            );
        }

        // =========================
        // ACCESO ARRAY
        // =========================

        else {

            const identifier = CSTAdapter.first(lvalue, "Identifier");

            const identifierLocation =
                LocationHelper.fromTokens(
                    identifier
                );

            const identifierNode = ASTFactory.identifier(
                identifier.image,
                identifierLocation
            );

            const indexes =
                (CSTAdapter.get(lvalue, "expression") ?? [])
                    .map((/** @type {any} */ expr) =>
                        this.expressionVisitor.visitExpression(expr)
                    );

            const location = LocationHelper.from(ctx)

            left =
                ASTFactory.access(
                    identifierNode,
                    indexes,
                    location
                );
        }

        const right =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.assignment(
            left,
            right,
            location
        );
    }

    /**
     * =========================
     * IF
     * =========================
     * @param {any} ctx
     */
    visitIf(ctx) {

        // =========================
        // IF principal
        // =========================
        const condition =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            );

        const thenBlock =
            this.visitBlock(
                CSTAdapter.first(ctx, "block")
            );

        // =========================
        // ELSE IFs
        // =========================
        const elseIfBranches =
            (CSTAdapter.get(ctx, "elseIfClause") ?? []).map((/** @type {any} */ c) => {

                return {
                    condition: this.expressionVisitor.visitExpression(
                        CSTAdapter.first(c, "expression")
                    ),
                    block: this.visitBlock(
                        CSTAdapter.first(c, "block")
                    )
                };
            });

        // =========================
        // ELSE
        // =========================
        let elseBlock = null;

        if (CSTAdapter.has(ctx, "elseClause")) {

            const elseCtx =
                CSTAdapter.first(ctx, "elseClause");

            elseBlock =
                this.visitBlock(
                    CSTAdapter.first(elseCtx, "block")
                );
        }

        const location = LocationHelper.from(ctx);

        // =========================
        // AST FINAL
        // =========================
        return ASTFactory.if(
            condition,
            thenBlock,
            elseIfBranches,
            elseBlock,
            location
        );
    }

    /**
     * =========================
     * WHILE
     * =========================
     * @param {any} ctx
     */
    visitWhile(ctx) {

        const condition =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            );

        const body =
            this.visitBlock(
                CSTAdapter.first(ctx, "block")
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.while(condition, body, location);
    }

    /**
     * =========================
     * FOR
     * =========================
     * @param {any} ctx
     */
    visitFor(ctx) {

        const identifier =
            CSTAdapter.first(
                ctx,
                "Identifier"
            );

        if (!identifier) {
            throw new Error(
                "For has no variable"
            );
        }

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const variable = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const expressions =
            CSTAdapter.get(
                ctx,
                "expression"
            ) ?? [];

        const start =
            this.expressionVisitor.visitExpression(
                expressions[0]
            );

        const limit =
            this.expressionVisitor.visitExpression(
                expressions[1]
            );

        const stepValue =
            this.expressionVisitor.visitExpression(
                expressions[2]
            );

        const initializerLocation =
            LocationHelper.from(
                expressions[0]
            );

        const initializer =
            ASTFactory.assignment(
                variable,
                start,
                initializerLocation
            );

        const conditionLocation =
            LocationHelper.from(
                expressions[1]
            );

        const condition =
            ASTFactory.binary(
                "<=",
                variable,
                limit,
                conditionLocation
            );

        const stepLocation =
            LocationHelper.from(
                expressions[2]
            );

        const increment =
            ASTFactory.assignment(
                variable,
                ASTFactory.binary(
                    "+",
                    variable,
                    stepValue,
                    stepLocation
                ),
                stepLocation
            );

        const body =
            this.visitBlock(
                CSTAdapter.first(
                    ctx,
                    "block"
                )
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.for(
            initializer,
            condition,
            increment,
            body,
            location
        );

    }

    /**
     * =========================
     * SWITCH
     * =========================
     * @param {any} ctx
     */
    visitSwitch(ctx) {

        const expression =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            );


        const cases =
            CSTAdapter.get(ctx, "caseClause")
                .map((/** @type {any} */ c) =>
                    this.visitCase(c)
                );


        let defaultCase = null;


        if (CSTAdapter.has(ctx, "defaultClause")) {

            defaultCase =
                this.visitDefault(
                    CSTAdapter.first(ctx, "defaultClause")
                );
        }

        const location = LocationHelper.from(ctx);

        return ASTFactory.switch(
            expression,
            cases,
            defaultCase,
            location
        );
    }

    /**
     * =========================
     * CASE
     * =========================
     * @param {any} ctx
     */
    visitCase(ctx) {

        const value =
            this.expressionVisitor.visitExpression(
                CSTAdapter.first(ctx, "expression")
            );


        const body =
            this.visitBlock(
                CSTAdapter.first(ctx, "block")
            );

        const location = LocationHelper.from(ctx);

        return ASTFactory.case(
            value,
            body,
            location
        );
    }

    /**
     * =========================
     * DEFAULT
     * =========================
     * @param {any} ctx
     */
    visitDefault(ctx) {

        const body =
            this.visitBlock(
                CSTAdapter.first(ctx, "block")
            );

        const location = LocationHelper.from(ctx);

        return new DefaultNode(body, location);
    }

    /**
     * =========================
     * RETURN
     * =========================
     * @param {any} ctx
     */
    visitReturn(ctx) {

        const expr =
            CSTAdapter.has(ctx, "expression")
                ? this.expressionVisitor.visitExpression(
                    CSTAdapter.first(ctx, "expression")
                )
                : null;

        const location = LocationHelper.from(ctx);

        return ASTFactory.return(expr, location);
    }

    /**
     * =========================
     * READ
     * =========================
     * @param {any} ctx
     */
    visitRead(ctx) {

        const identifiers =
            CSTAdapter.get(ctx, "Identifier") ?? [];


        const identifierNodes =
            identifiers.map(
                (/** @type {any} */ token) =>
                    ASTFactory.identifier(
                        token.image,
                        LocationHelper.fromTokens(token)
                    )
            );


        const location =
            LocationHelper.from(ctx);


        return ASTFactory.read(
            identifierNodes,
            location
        );
    }

    /**
     * =========================
     * WRITE
     * =========================
     * @param {any} ctx
     */
    visitWrite(ctx) {

        const expressions =
            (CSTAdapter.get(ctx, "expression") ?? [])
                .map((/** @type {any} */ expr) =>
                    this.expressionVisitor.visitExpression(expr)
                );

        const location = LocationHelper.from(ctx);

        return ASTFactory.write(expressions, location);
    }

    /**
     * =========================
     * PROCEDURE CALL
     * =========================
     * @param {any} ctx
     */
    visitProcedureCall(ctx) {

        const identifier =
            CSTAdapter.first(
                ctx,
                "Identifier"
            );

        const identifierLocation =
            LocationHelper.fromTokens(
                identifier
            );

        const identifierNode = ASTFactory.identifier(
            identifier.image,
            identifierLocation
        );

        const args =
            CSTAdapter.get(ctx, "argumentsList")
                .flatMap((/** @type {any} */ argList) =>
                    CSTAdapter.get(
                        argList,
                        "expression"
                    ) ?? []
                )
                .map((/** @type {any} */ expr) =>
                    this.expressionVisitor.visitExpression(expr)
                );

        const location = LocationHelper.from(ctx);

        return ASTFactory.procedureCall(
            identifierNode,
            args,
            location
        );
    }

    /**
     * =========================
     * BLOCK
     * =========================
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
                    this.visitStatement(stmt)
            )
        );

    }
}