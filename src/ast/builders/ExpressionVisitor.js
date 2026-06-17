/**
 *
 * ExpressionVisitor.js
 *
 * ==================================
 * EXPRESSION VISITOR
 * ==================================
 *
 * Convierte CST de expresiones
 * generado por Chevrotain a AST.
 *
 */

import { ASTFactory } from "../utils/ASTFactory.js";
import { CSTAdapter } from "../utils/CSTAdapter.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ExpressionVisitor {


    /**
     * Punto de entrada general.
     * @param {any} ctx
     * @returns {any}
     */
    visitExpression(ctx) {

        if (!ctx) {
            throw new Error(
                "visitExpression recibió null"
            );
        }

        /*
         * expression
         *     -> logical
         */
        const logical =
            CSTAdapter.first(ctx, "logical");


        if (logical) {
            return this.visitLogical(logical);
        }


        /*
         * Permitir recibir reglas internas
         */
        if (CSTAdapter.has(ctx, "logicalOr")) {
            return this.visitLogicalOr(ctx);
        }


        if (CSTAdapter.has(ctx, "logicalAnd")) {
            return this.visitLogicalAnd(ctx);
        }


        if (CSTAdapter.has(ctx, "comparison")) {
            return this.visitComparison(ctx);
        }


        if (CSTAdapter.has(ctx, "additive")) {
            return this.visitAdditive(ctx);
        }


        throw new Error(
            `Nodo expression no soportado: ${ctx.name}`
        );
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitLogical(ctx) {

        const logicalOr =
            CSTAdapter.first(ctx, "logicalOr");


        return this.visitLogicalOr(
            logicalOr ?? ctx
        );
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitLogicalOr(ctx) {

        let node =
            this.visitLogicalAnd(
                CSTAdapter.first(ctx, "logicalAnd")
            );


        const operators =
            CSTAdapter.get(ctx, "Or");


        const operands =
            CSTAdapter.get(ctx, "logicalAnd");


        for (let i = 0; i < operators.length; i++) {

            node =
                ASTFactory.logical(
                    operators[i].image,
                    node,
                    this.visitLogicalAnd(
                        operands[i + 1]
                    )
                );
        }


        return node;
    }


    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitLogicalAnd(ctx) {

        let node =
            this.visitLogicalNot(
                CSTAdapter.first(ctx, "logicalNot")
            );


        const operators =
            CSTAdapter.get(ctx, "And");


        const operands =
            CSTAdapter.get(ctx, "logicalNot");


        for (let i = 0; i < operators.length; i++) {

            node =
                ASTFactory.logical(
                    operators[i].image,
                    node,
                    this.visitLogicalNot(
                        operands[i + 1]
                    )
                );
        }


        return node;
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitLogicalNot(ctx) {


        if (CSTAdapter.has(ctx, "Not")) {

            const inner =
                CSTAdapter.first(
                    ctx,
                    "logicalNot"
                )
                ??
                CSTAdapter.first(
                    ctx,
                    "comparison"
                );


            return ASTFactory.logicalNot(
                this.visitLogicalNot(inner)
            );
        }

        return this.visitComparison(
            CSTAdapter.first(ctx, "comparison")
        );
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitComparison(ctx) {

        let node =
            this.visitAdditive(
                CSTAdapter.first(ctx, "additive")
            );

        const operands =
            CSTAdapter.get(ctx, "additive");

        if (operands.length > 1) {


            const operator =
                [
                    "LessThan",
                    "GreaterThan",
                    "Equal",
                    "NotEqual",
                    "LessOrEqual",
                    "GreaterOrEqual"
                ]
                    .map(
                        x => CSTAdapter.first(ctx, x)
                    )
                    .find(Boolean);


            node =
                ASTFactory.binary(
                    operator.image,
                    node,
                    this.visitAdditive(
                        operands[1]
                    )
                );
        }

        return node;
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitAdditive(ctx) {

        let node =
            this.visitMultiplicative(
                CSTAdapter.first(
                    ctx,
                    "multiplicative"
                )
            );


        const operands =
            CSTAdapter.get(
                ctx,
                "multiplicative"
            );


        const operators =
            [
                ...CSTAdapter.get(ctx, "Plus"),
                ...CSTAdapter.get(ctx, "Minus")
            ]
                .sort(
                    (a, b) =>
                        a.startOffset - b.startOffset
                );



        for (
            let i = 0;
            i < operators.length;
            i++
        ) {

            node =
                ASTFactory.binary(
                    operators[i].image,
                    node,
                    this.visitMultiplicative(
                        operands[i + 1]
                    )
                );
        }


        return node;
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitMultiplicative(ctx) {
        let node =
            this.visitPower(
                CSTAdapter.first(
                    ctx,
                    "power"
                )
            );

        const operands =
            CSTAdapter.get(
                ctx,
                "power"
            );

        const operators =
            [
                ...CSTAdapter.get(ctx, "Multiply"),
                ...CSTAdapter.get(ctx, "Divide"),
                ...CSTAdapter.get(ctx, "Mod")
            ]
                .sort(
                    (a, b) =>
                        a.startOffset - b.startOffset
                );

        for (
            let i = 0;
            i < operators.length;
            i++
        ) {

            node =
                ASTFactory.binary(
                    operators[i].image,
                    node,
                    this.visitPower(
                        operands[i + 1]
                    )
                );
        }

        return node;
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitPower(ctx) {

        const access =
            CSTAdapter.first(
                ctx,
                "access"
            );


        let node =
            this.visitAccess(access);



        const power =
            CSTAdapter.first(
                ctx,
                "power"
            );


        if (!power) {
            return node;
        }


        return ASTFactory.binary(
            "^",
            node,
            this.visitPower(power)
        );
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitAccess(ctx) {

        if (!ctx) {
            throw new Error(
                "visitAccess recibió null"
            );
        }


        const primary =
            CSTAdapter.first(
                ctx,
                "primary"
            );


        if (!primary) {

            throw new Error(
                "Access sin primary"
            );
        }


        return this.visitPrimary(primary);
    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitPrimary(ctx) {
        /*
         * =========================
         * INTEGER
         * =========================
         */

        if (CSTAdapter.has(ctx, "IntegerLiteral")) {

            const token =
                CSTAdapter.token(
                    ctx,
                    "IntegerLiteral"
                );


            return ASTFactory.literal(
                NodeTypes.NUMBER_LITERAL,
                Number(token.image)
            );

        }

        /*
         * =========================
         * FLOAT
         * =========================
         */

        if (CSTAdapter.has(ctx, "FloatLiteral")) {

            const token =
                CSTAdapter.token(
                    ctx,
                    "FloatLiteral"
                );


            return ASTFactory.literal(
                NodeTypes.NUMBER_LITERAL,
                Number(token.image)
            );

        }

        /*
         * =========================
         * SCIENTIFIC
         * =========================
         */

        if (CSTAdapter.has(ctx, "ScientificLiteral")) {

            const token =
                CSTAdapter.token(
                    ctx,
                    "ScientificLiteral"
                );


            return ASTFactory.literal(
                NodeTypes.NUMBER_LITERAL,
                Number(token.image)
            );

        }

        /*
         * =========================
         * STRING
         * =========================
         */

        if (CSTAdapter.has(ctx, "StringLiteral")) {


            const token =
                CSTAdapter.token(
                    ctx,
                    "StringLiteral"
                );


            return ASTFactory.literal(
                NodeTypes.STRING_LITERAL,
                token.image.substring(
                    1,
                    token.image.length - 1
                )
            );

        }

        /*
         * =========================
         * BOOLEAN
         * =========================
         */

        if (CSTAdapter.has(ctx, "TrueLiteral")) {

            return ASTFactory.literal(
                NodeTypes.BOOLEAN_LITERAL,
                true
            );

        }

        if (CSTAdapter.has(ctx, "FalseLiteral")) {

            return ASTFactory.literal(
                NodeTypes.BOOLEAN_LITERAL,
                false
            );

        }

        /*
         * =========================
         * NULL
         * =========================
         */

        if (CSTAdapter.has(ctx, "NullLiteral")) {

            return ASTFactory.literal(
                NodeTypes.NULL_LITERAL,
                null
            );

        }

        /*
         * =========================
         * IDENTIFIER
         * =========================
         */

        if (CSTAdapter.has(ctx, "Identifier")) {


            const token =
                CSTAdapter.token(
                    ctx,
                    "Identifier"
                );


            return ASTFactory.identifier(
                token.image
            );

        }

        /*
         * =========================
         * FUNCTION CALL
         * =========================
         */

        if (CSTAdapter.has(ctx, "functionCall")) {


            return this.visitFunctionCall(
                CSTAdapter.first(
                    ctx,
                    "functionCall"
                )
            );

        }

        /*
         * =========================
         * GROUP EXPRESSION
         * =========================
         */

        if (CSTAdapter.has(ctx, "expression")) {


            return ASTFactory.group(
                this.visitExpression(
                    CSTAdapter.first(
                        ctx,
                        "expression"
                    )
                )
            );

        }

        throw new Error(
            `Primary no soportado: ${ctx.name}`
        );

    }

    /**
     * @param {any} ctx
     * @returns {any}
     */
    visitFunctionCall(ctx) {

        const token =
            CSTAdapter.token(ctx, "Identifier");

        const argumentList =
            CSTAdapter.first(ctx, "argumentsList");

        let args = [];

        if (argumentList) {

            const expressions =
                CSTAdapter.get(argumentList, "expression");

            const commas =
                CSTAdapter.get(argumentList, "Comma");

            /**
             * IMPORTANTE:
             * no confíes en estructura plana
             * solo recorre expressions
             */
            args = expressions.map((/** @type {any} */ expr) =>
                this.visitExpression(expr)
            );
        }

        return ASTFactory.functionCall(
            token.image,
            args
        );
    }

}