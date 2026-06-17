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
     */
    constructor(body) {
        super(NodeTypes.DEFAULT_STATEMENT);
        this.body = body;
    }

}