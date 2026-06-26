import { ASTNode } from "../core/ASTNode.js";
import { NodeTypes } from "../core/NodeTypes.js";

export class CaseNode extends ASTNode {

    /**
     * @param {any} value
     * @param {any} body
     * @param {any} location
     */
    constructor(value, body, location) {

        super(NodeTypes.CASE_STATEMENT, location);

        this.value = value;
        this.body = body;

    }

}