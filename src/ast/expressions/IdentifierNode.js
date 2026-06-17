/**
 * 
 * IdentifierNode.js
 * 
 * ==================================
 * IDENTIFIER NODE
 * ==================================
 *
 * Nodo del AST encargado de representar
 * un identificador.
 *
 * Representa referencias a nombres
 * dentro del programa.
 *
 * Ejemplos:
 *
 * x
 * edad
 * contador
 *
 * No representa declaraciones,
 * solamente referencias.
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";

import { NodeTypes } from "../core/NodeTypes.js";



export class IdentifierNode extends ASTNode {


    /**
     * @param {string} name
     */
    constructor(name) {

        super(NodeTypes.IDENTIFIER);



        /**
         * Nombre del identificador.
         *
         * Ejemplo:
         *
         * contador
         *
         * @type {string}
         */
        this.name = name;

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

            name: this.name

        };

    }


}