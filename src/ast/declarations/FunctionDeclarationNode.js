/**
 * 
 * FunctionDeclarationNode.js
 * 
 * ==================================
 * FUNCTION DECLARATION NODE
 * ==================================
 *
 * Representa una declaración de función
 * dentro del AST.
 *
 * Ejemplo:
 *
 * Funcion Sumar(a Entero, b Entero) Como Entero
 *
 *     Retornar a + b
 *
 * Fin Funcion
 *
 * Contiene:
 *
 * - nombre de la función
 * - parámetros
 * - cuerpo de instrucciones
 * - retorno
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class FunctionDeclarationNode extends ASTNode {


    /**
     * Crea un nodo de declaración
     * de función.
     *
     * @param {string} name
     * Nombre de la función.
     *
     * @param {any[]} parameters
     * Lista de parámetros.
     * 
     * @param {any} returnType
     * Tipo de retorno.
     *
     * @param {any} body
     * Bloque de instrucciones.
     */
    constructor(
        name,
        parameters = [],
        returnType = null,
        body
    ) {

        super(NodeTypes.FUNCTION_DECLARATION);


        this.name = name;

        this.parameters = parameters;

        this.returnType = returnType;

        this.body = body;

    }


    /**
     * @param {any} parameter
     */
    addParameter(parameter) {

        this.parameters.push(parameter);

    }

}