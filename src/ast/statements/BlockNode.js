/**
 * 
 * BlockNode.js
 * 
 * ==================================
 * BLOCK NODE
 * ==================================
 *
 * Representa un bloque de instrucciones
 * dentro del AST.
 *
 * Ejemplos:
 *
 *     Si
 *     Mientras
 *     Para
 *     Funcion
 *     Procedimiento
 *
 * contienen bloques de instrucciones.
 *
 * El nodo mantiene el orden original
 * de las instrucciones.
 * ==================================
 */

import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class BlockNode extends ASTNode {


    /**
     * Crea un nodo de bloque.
     *
     * @param {any[]} statements
     * Lista de instrucciones contenidas
     * en el bloque.
     */
    constructor(statements = []) {

        super(NodeTypes.BLOCK);


        /**
         * Instrucciones del bloque.
         *
         * Ejemplo:
         *
         * [
         *   AssignmentNode,
         *   WriteNode
         * ]
         *
         * @type {any[]}
         */
        this.statements = statements;

    }


    /**
     * Agrega una instrucción
     * al bloque.
     *
     * @param {any} statement
     * Nodo de instrucción.
     */
    addStatement(statement) {

        this.statements.push(statement);

    }


}