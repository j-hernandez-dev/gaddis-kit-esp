/**
 * 
 * ConstantDeclarationNode.js
 * 
 * ==================================
 * CONSTANT DECLARATION NODE
 * ==================================
 *
 * Representa una declaración de constante
 * dentro del AST.
 *
 * Ejemplos:
 *
 * Declarar Constante PI = 3.1416
 *
 * Declarar Constante Nombre = "Juan"
 *
 * Contiene:
 *
 * - identificador de la constante
 * - expresión utilizada como valor inicial
 *
 * ==================================
 */


import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ConstantDeclarationNode extends ASTNode {


    /**
     * Crea un nodo de declaración
     * de constante.
     *
     * @param {any} identifier
     * Identificador asignado a la constante.
     *
     * @param {any} dataType
     * 
     * @param {any[]} value
     * Expresión que representa el valor
     * inicial de la constante.
     * 
     * @param {any} location
     */
    constructor(
        identifier,
        dataType,
        value = [],
        location
    ) {
        super(NodeTypes.CONSTANT_DECLARATION, location);

        /**
         * Nombre de la constante.
         *
         * Ejemplo:
         *
         * IdentifierNode("PI")
         *
         * @type {any}
         */
        this.identifier = identifier;

        this.dataType = dataType;

        /**
         * Valor inicial.
         *
         * Puede ser:
         *
         * LiteralNode
         * BinaryExpressionNode
         * FunctionCallNode
         *
         * dependiendo de las reglas
         * semánticas posteriores.
         *
         * @type {any}
         */
        this.value = value;

    }

}