/**
 * 
 * ProcedureDeclarationNode.js
 * 
 * ==================================
 * PROCEDURE DECLARATION NODE
 * ==================================
 *
 * Representa una declaración de procedimiento
 * dentro del AST.
 *
 * Ejemplo:
 *
 * Procedimiento MostrarMensaje(texto Cadena)
 *
 *     Escribir texto
 *
 * Fin Procedimiento
 *
 * Contiene:
 *
 * - nombre del procedimiento
 * - parámetros
 * - cuerpo de instrucciones
 *
 * A diferencia de una función,
 * no posee valor de retorno.
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ProcedureDeclarationNode extends ASTNode {


    /**
     * Crea un nodo de declaración
     * de procedimiento.
     *
     * @param {string} name
     * Nombre del procedimiento.
     *
     * @param {any[]} parameters
     * Lista de parámetros formales.
     *
     * @param {any} body
     * Bloque de instrucciones.
     */
    constructor(
        name,
        parameters = [],
        body
    ) {

        super(NodeTypes.PROCEDURE_DECLARATION);



        /**
         * Nombre del procedimiento.
         *
         * Ejemplo:
         *
         * "MostrarMensaje"
         *
         * @type {string}
         */
        this.name = name;



        /**
         * Parámetros formales.
         *
         * Ejemplo:
         *
         * [
         *   ParameterNode,
         *   ParameterNode
         * ]
         *
         * @type {any[]}
         */
        this.parameters = parameters;



        /**
         * Cuerpo del procedimiento.
         *
         * Contiene un BlockNode.
         *
         * @type {any}
         */
        this.body = body;

    }



    /**
     * Agrega un parámetro
     * al procedimiento.
     *
     * @param {any} parameter
     */
    addParameter(parameter) {

        this.parameters.push(parameter);

    }

}