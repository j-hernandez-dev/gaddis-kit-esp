/**
 * 
 * ForNode.js
 * 
 * ==================================
 * FOR NODE
 * ==================================
 *
 * Representa una estructura repetitiva
 * Para dentro del AST.
 *
 * Ejemplo:
 *
 * Para i <- 1 Hasta 10 Paso 2
 *
 *     Escribir i
 *
 * Fin Para
 *
 * Contiene:
 *
 * - variable de control
 * - valor inicial
 * - límite del ciclo
 * - paso opcional
 * - bloque de instrucciones
 *
 * ==================================
 */

import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ForNode extends ASTNode {


    /**
     * Crea un nodo Para.
     *
     * @param {any} variable
     * Identificador utilizado como
     * variable de control del ciclo.
     *
     * @param {any} initialValue
     * Expresión que determina el valor
     * inicial de la variable.
     *
     * @param {any} limit
     * Expresión que determina el límite
     * de iteración.
     *
     * @param {any} step
     * Incremento o decremento opcional.
     *
     * @param {any} body
     * Bloque de instrucciones ejecutado
     * en cada iteración.
     */
    constructor(
        variable,
        initialValue,
        limit,
        step = null,
        body
    ) {

        super(NodeTypes.FOR_STATEMENT);


        /**
         * Variable de control.
         *
         * Ejemplo:
         *
         * i
         *
         * @type {any}
         */
        this.variable = variable;


        /**
         * Valor inicial.
         *
         * Ejemplo:
         *
         * 1
         *
         * @type {any}
         */
        this.initialValue = initialValue;


        /**
         * Límite superior del ciclo.
         *
         * Ejemplo:
         *
         * 10
         *
         * @type {any}
         */
        this.limit = limit;


        /**
         * Paso del ciclo.
         *
         * Ejemplo:
         *
         * 2
         *
         * Si no existe:
         *
         * null
         *
         * @type {any}
         */
        this.step = step;


        /**
         * Cuerpo del ciclo.
         *
         * Normalmente corresponde
         * a un BlockNode.
         *
         * @type {any}
         */
        this.body = body;

    }

}