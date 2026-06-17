/**
 * 
 * LogicalNotNode.js
 * 
 * ==================================
 * LOGICAL NOT NODE
 * ==================================
 *
 * Nodo del AST encargado de representar
 * la negación lógica.
 *
 * Representa el operador:
 *
 *     No
 *
 * Ejemplos:
 *
 * No Verdadero
 *
 * No (edad >= 18)
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";

import { NodeTypes } from "../core/NodeTypes.js";



export class LogicalNotNode extends ASTNode {


    /**
     * @param {any} operand
     */
    constructor(operand) {

        super(NodeTypes.LOGICAL_NOT);



        /**
         * Operando sobre el cual se aplica
         * la negación lógica.
         *
         * Puede ser cualquier expresión.
         *
         * Ejemplos:
         *
         * LiteralNode
         * IdentifierNode
         * BinaryExpressionNode
         *
         * @type {any}
         */
        this.operand = operand;

    }



    /**
     * =========================
     * SERIALIZATION
     * =========================
     *
     * Representación del nodo
     * para depuración.
     *
     * @returns {any}
     */
    toJSON() {

        return {

            type: this.type,

            operand: this.operand

        };

    }


}