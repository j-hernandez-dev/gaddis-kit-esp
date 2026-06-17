/**
 *
 * LiteralNode.js
 *
 * ==================================
 * LITERAL NODE
 * ==================================
 *
 * Nodo del AST encargado de representar
 * valores literales tipados.
 *
 * Ejemplos:
 *
 * 10
 * 3.14
 * "Hola"
 * Verdadero
 * Falso
 * Nulo
 *
 * IMPORTANTE:
 * El tipo del nodo NO es genérico "Literal",
 * sino el tipo específico:
 *
 * NumberLiteral | StringLiteral | BooleanLiteral | NullLiteral
 *
 * ==================================
 */

import { ASTNode } from "../core/ASTNode.js";

export class LiteralNode extends ASTNode {

    /**
     * @param {string} literalType
     * @param {any} value
     */
    constructor(literalType, value) {

        /**
         * IMPORTANTE:
         * El type del nodo ES el literal específico.
         *
         * Ejemplo:
         * NumberLiteral
         * StringLiteral
         * BooleanLiteral
         * NullLiteral
         */
        super(literalType);

        /**
         * Tipo semántico del literal.
         *
         * Se conserva como metadata adicional.
         *
         * @type {string}
         */
        this.literalType = literalType;

        /**
         * Valor real del literal.
         *
         * number | string | boolean | null
         *
         * @type {any}
         */
        this.value = value;
    }

    /**
     * =========================
     * SERIALIZATION
     * =========================
     *
     * @returns {any}
     */
    toJSON() {

        return {
            type: this.type,
            literalType: this.literalType,
            value: this.value
        };
    }
}