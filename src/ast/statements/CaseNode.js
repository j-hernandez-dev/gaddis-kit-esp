import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";

export class CaseNode extends ASTNode {

    /**
     * @param {any} value
     * @param {any} body
     */
    constructor(value, body) {

        super(NodeTypes.CASE_STATEMENT);

        this.value = value;
        this.body = body;

    }

}