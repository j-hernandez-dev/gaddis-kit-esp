/**
 * 
 * SwitchNode.js
 * 
 * ==================================
 * SWITCH NODE
 * ==================================
 *
 * Representa una estructura de selección
 * múltiple dentro del AST.
 *
 * Ejemplo:
 *
 * Seleccionar opcion
 *
 * Caso 1:
 *     Escribir "Uno"
 *
 * Caso 2:
 *     Escribir "Dos"
 *
 * Defecto:
 *     Escribir "Otro"
 *
 * Fin Seleccionar
 *
 * Contiene:
 *
 * - expresión evaluada
 * - lista de casos
 * - caso por defecto opcional
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class SwitchNode extends ASTNode {


    /**
     * Crea un nodo Seleccionar.
     *
     * @param {any} expression
     * Expresión principal utilizada
     * para comparar los casos.
     *
     * @param {any[]} cases
     * Lista de casos disponibles.
     *
     * Cada elemento contiene:
     *
     * {
     *     value,
     *     body
     * }
     *
     * @param {any} defaultCase
     * Bloque ejecutado cuando ningún
     * caso coincide.
     *
     * Puede ser null.
     */
    constructor(
        expression,
        cases = [],
        defaultCase = null
    ) {

        super(NodeTypes.SWITCH_STATEMENT);



        /**
         * Expresión evaluada.
         *
         * Ejemplo:
         *
         * opcion
         *
         * @type {any}
         */
        this.expression = expression;



        /**
         * Lista de casos.
         *
         * Ejemplo:
         *
         * [
         *   {
         *      value: 1,
         *      body: BlockNode
         *   }
         * ]
         *
         * @type {any[]}
         */
        this.cases = cases;



        /**
         * Caso por defecto.
         *
         * Ejemplo:
         *
         * BlockNode
         *
         * Si no existe:
         *
         * null
         *
         * @type {any}
         */
        this.defaultCase = defaultCase;

    }


}