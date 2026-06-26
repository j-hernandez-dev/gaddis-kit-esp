/**
 * 
 * DefaultNode.js
 */

import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class DefaultNode extends ASTNode {

    /**
     * 
     * @param {any} body
     * Bloque de instrucciones ejecutado
     * en cada iteración.
     * 
     * @param {any} location
     */
    constructor(body, location) {
        super(NodeTypes.DEFAULT_STATEMENT, location);
        this.body = body;
    }

}