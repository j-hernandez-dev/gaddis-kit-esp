/**
 * 
 * ProcedureCallNode.js
 * 
 * ==================================
 * PROCEDURE CALL NODE
 * ==================================
 *
 * Representa una llamada a procedimiento
 * dentro del AST.
 *
 * Ejemplo:
 *
 * Llamar MostrarMensaje("Hola")
 *
 * A diferencia de una función, un procedimiento
 * no genera un valor de retorno.
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ProcedureCallNode extends ASTNode {


    /**
     * 
     * @param {string} name
     * Nombre del procedimiento llamado.
     * 
     * @param {any[]} argumentsList
     * Lista de argumentos enviados.
     */
    constructor(name, argumentsList = []) {

        super(NodeTypes.PROCEDURE_CALL);


        /**
         * Nombre del procedimiento.
         * 
         * @type {string}
         */
        this.name = name;


        /**
         * Argumentos de la llamada.
         * 
         * Cada elemento será un nodo
         * de expresión.
         * 
         * @type {any[]}
         */
        this.arguments = argumentsList;

    }



    /**
     * Agrega un argumento
     * posteriormente durante construcción
     * del AST.
     *
     * @param {any} argument
     */
    addArgument(argument) {

        this.arguments.push(argument);

    }

}