/**
 * LogicalExpressionNode.js
 * ==================================
 * NODO DE EXPRESIÓN LÓGICA
 * ==================================
 *
 * Representa operaciones lógicas entre
 * dos expresiones booleanas.
 *
 * Ejemplos:
 *  - A Y B
 *  - X O Y
 *
 * ==================================
 */

import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";

export class LogicalExpressionNode extends ASTNode {

    /**
     * @param {string} operator
     * @param {any} left
     * @param {any} right
     */
    constructor(operator, left, right) {

        super(NodeTypes.LOGICAL_EXPRESSION);

        /**
         * Operador lógico:
         * "Y" | "O"
         *
         * @type {string}
         */
        this.operator = operator;

        /**
         * Lado izquierdo de la expresión
         * @type {any}
         */
        this.left = left;

        /**
         * Lado derecho de la expresión
         * @type {any}
         */
        this.right = right;
    }

    /**
     * =========================
     * SERIALIZATION
     * =========================
     * @return {any}
     */
    toJSON() {
        return {
            type: this.type,
            operator: this.operator,
            left: this.left,
            right: this.right
        };
    }
}