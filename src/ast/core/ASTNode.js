/**
 * ASTNode.js
 * 
 * ==================================
 * AST NODE
 * ==================================
 *
 * Clase base para todos los nodos
 * pertenecientes al AST.
 *
 * Los nodos concretos deberán extender
 * esta clase.
 * ==================================
 */

export class ASTNode {

    /**
     * @param {any} type
     */
    constructor(type) {

        this.type = type;

    }


    toJSON() {

        return {
            ...this
        };

    }

}