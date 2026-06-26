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
     * @param {any} declarations
     * @param {any} dataType
     * @param {any} location
     */
    constructor(
        declarations = [],
        dataType,
        location
    ) {

        super(NodeTypes.VARIABLE_DECLARATION, location);


        this.declarations = declarations;


        this.dataType = dataType;

    }


    /**
     * @param {any} declaration
     */
    addDeclaration(declaration) {

        this.declarations.push(declaration);

    }

}