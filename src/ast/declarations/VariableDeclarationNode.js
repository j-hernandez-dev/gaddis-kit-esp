/**
 * 
 * VariableDeclarationNode.js
 * 
 * ==================================
 * VARIABLE DECLARATION NODE
 * ==================================
 *
 * Representa una declaración de variables
 * dentro del AST.
 *
 * Ejemplos:
 *
 * Declarar edad Como Entero
 *
 * Declarar x, y, z Como Real
 *
 * Contiene:
 *
 * - lista de identificadores
 * - tipo de dato asociado
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class VariableDeclarationNode extends ASTNode {


    /**
     * Crea un nodo de declaración
     * de variables.
     *
     * @param {any[]} identifiers
     * Lista de variables declaradas.
     *
     * @param {any} dataType
     * Tipo de dato de las variables.
     */
    constructor(
        identifiers = [],
        dataType
    ) {

        super(NodeTypes.VARIABLE_DECLARATION);



        /**
         * Variables declaradas.
         *
         * Ejemplo:
         *
         * [
         *    IdentifierNode("x"),
         *    IdentifierNode("y")
         * ]
         *
         * @type {any[]}
         */
        this.identifiers = identifiers;



        /**
         * Tipo de dato asociado.
         *
         * Ejemplo:
         *
         * Entero
         * Real
         * Cadena
         *
         * @type {any}
         */
        this.dataType = dataType;

    }



    /**
     * Agrega una variable
     * a la declaración.
     *
     * @param {any} identifier
     */
    addIdentifier(identifier) {

        this.identifiers.push(identifier);

    }

}