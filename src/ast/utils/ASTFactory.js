// ASTFactory.js

import { LiteralNode } from "../expressions/LiteralNode.js";
import { IdentifierNode } from "../expressions/IdentifierNode.js";
import { BinaryExpressionNode } from "../expressions/BinaryExpressionNode.js";
import { LogicalExpressionNode } from "../expressions/LogicalExpressionNode.js";
import { LogicalNotNode } from "../expressions/LogicalNotNode.js";
import { FunctionCallNode } from "../expressions/FunctionCallNode.js";
import { GroupExpressionNode } from "../expressions/GroupExpressionNode.js";
import { AccessNode } from "../expressions/AccessNode.js";

import { ProgramNode } from "../core/ProgramNode.js";

import { AssignmentNode } from "../statements/AssignmentNode.js";
import { BlockNode } from "../statements/BlockNode.js";
import { IfNode } from "../statements/IfNode.js";
import { WhileNode } from "../statements/WhileNode.js";
import { ForNode } from "../statements/ForNode.js";
import { SwitchNode } from "../statements/SwitchNode.js";
import { CaseNode } from "../statements/CaseNode.js";
import { ReturnNode } from "../statements/ReturnNode.js";
import { ReadNode } from "../statements/ReadNode.js";
import { WriteNode } from "../statements/WriteNode.js";
import { ProcedureCallNode } from "../statements/ProcedureCallNode.js";

import { VariableDeclarationNode } from "../declarations/VariableDeclarationNode.js";
import { ConstantDeclarationNode } from "../declarations/ConstantDeclarationNode.js";
import { ArrayDeclarationNode } from "../declarations/ArrayDeclarationNode.js";
import { FunctionDeclarationNode } from "../declarations/FunctionDeclarationNode.js";
import { ProcedureDeclarationNode } from "../declarations/ProcedureDeclarationNode.js";
import { ParameterNode } from "../declarations/ParameterNode.js";
import { NodeTypes } from "../core/NodeTypes.js";


export class ASTFactory {

    // =========================
    // CORE
    // =========================

    /**
     * @param {any[]} statements
     */
    static program(statements = []) {
        return new ProgramNode(statements);
    }

    // =========================
    // EXPRESSIONS
    // =========================

    /**
     * @param {any} type
     * @param {any} value
     */
    static literal(type, value) {
        return new LiteralNode(type, value);
    }

    /**
     * @param {any} name
     */
    static identifier(name) {
        return new IdentifierNode(name);
    }

    /**
     * @param {any} operator
     * @param {any} left
     * @param {any} right
     */
    static binary(operator, left, right) {
        return new BinaryExpressionNode(operator, left, right);
    }

    /**
     * @param {any} operator
     * @param {any} left
     * @param {any} right
     */
    static logical(operator, left, right) {
        return new LogicalExpressionNode(operator, left, right);
    }

    /**
     * @param {any} expression
     */
    static logicalNot(expression) {
        return new LogicalNotNode(expression);
    }

    /**
     * @param {any} identifier
     * @param {any[]} args
     */
    static functionCall(identifier, args = []) {
        return new FunctionCallNode(identifier, args);
    }

    /**
     * @param {any} expression
     */
    static group(expression) {
        return new GroupExpressionNode(expression);
    }

    /**
     * @param {any} identifier
     * @param {any[]} indexes
     */
    static access(identifier, indexes = []) {
        return new AccessNode(identifier, indexes);
    }

    // =========================
    // STATEMENTS
    // =========================

    /**
     * @param {any} left
     * @param {any} right
     */
    static assignment(left, right) {
        return new AssignmentNode(left, right);
    }

    /**
     * @param {any[]} statements
     */
    static block(statements = []) {
        return new BlockNode(statements);
    }

    /**
     * @param {any} condition
     * @param {any} thenBlock
     * @param {any[]} elseIfBlocks
     * @param {any} elseBlock
     */
    static if(condition, thenBlock, elseIfBlocks = [], elseBlock = null) {
        return new IfNode(condition, thenBlock, elseIfBlocks, elseBlock);
    }

    /**
     * @param {any} condition
     * @param {any} body
     */
    static while(condition, body) {
        return new WhileNode(condition, body);
    }

    /**
     * @param {any} variable
     * @param {any} start
     * @param {any} end
     * @param {any} step
     * @param {any} body
     */
    static for(variable, start, end, step, body) {
        return new ForNode(variable, start, end, step, body);
    }

    /**
     * @param {any} expression
     * @param {any} cases
     * @param {any} defaultBlock
     */
    static switch(expression, cases, defaultBlock) {
        return new SwitchNode(expression, cases, defaultBlock);
    }

    /**
     * @param {any} value
     * @param {any} body
     */
    static case(value, body) {
        return new CaseNode(value, body);
    }

    /**
     * @param {any} expression
     */
    static return(expression) {
        return new ReturnNode(expression);
    }

    /**
     * @param {any} identifiers
     */
    static read(identifiers) {
        return new ReadNode(identifiers);
    }

    /**
     * @param {any} expressions
     */
    static write(expressions) {
        return new WriteNode(expressions);
    }

    /**
     * @param {any} identifier
     * @param {any} args
     */
    static procedureCall(identifier, args = []) {
        return new ProcedureCallNode(identifier, args);
    }

    // =========================
    // DECLARATIONS
    // =========================

    /**
     * @param {any} identifiers
     * @param {any} type
     */
    static variableDeclaration(identifiers, type) {

        const fixedIds = identifiers.map((/** @type {string} */ id) =>
            typeof id === "string" ? new IdentifierNode(id) : id
        );

        return new VariableDeclarationNode(fixedIds, type);
    }

    /**
     * @param {any} identifier
     * @param {any} type
     * @param {any} value
     */
    static constantDeclaration(identifier, type, value) {
        return new ConstantDeclarationNode(identifier, type, value);
    }

    /**
     * @param {any} identifier
     * @param {any} dimensions
     * @param {any} dataType
     */
    static arrayDeclaration(identifier, dimensions, dataType) {

        const fixedId =
            typeof identifier === "string"
                ? ASTFactory.identifier(identifier)
                : identifier;

        return new ArrayDeclarationNode(
            fixedId,
            dimensions,
            dataType
        );
    }

    /**
     * @param {any} identifier
     * @param {any} parameters
     * @param {any} returnType
     * @param {any} body
     */
    static functionDeclaration(identifier, parameters, returnType, body) {

        const fixedId =
            typeof identifier === "string"
                ? ASTFactory.identifier(identifier)
                : identifier;

        const fixedParams =
            parameters.map((/** @type {{ identifier: any; dimensions: any; dataType: any; type: any; }} */ p) =>
                p instanceof ParameterNode
                    ? p
                    : ASTFactory.parameter(
                        p.identifier ?? p,
                        p.dimensions ?? [],
                        p.dataType ?? p.type
                    )
            );

        return new FunctionDeclarationNode(
            fixedId,
            fixedParams,
            returnType,
            body
        );
    }

    /**
     * @param {any} identifier
     * @param {any} parameters
     * @param {any} body
     */
    static procedureDeclaration(identifier, parameters, body) {

        const fixedId =
            typeof identifier === "string"
                ? ASTFactory.identifier(identifier)
                : identifier;

        const fixedParams =
            parameters.map((/** @type {{ identifier: any; dimensions: any; dataType: any; type: any; }} */ p) =>
                p instanceof ParameterNode
                    ? p
                    : ASTFactory.parameter(
                        p.identifier ?? p,
                        p.dimensions ?? [],
                        p.dataType ?? p.type
                    )
            );

        return new ProcedureDeclarationNode(
            fixedId,
            fixedParams,
            body
        );
    }

    /**
     * @param {any} identifier
     * @param {any[]} dimensions
     * @param {any} type
     */
    static parameter(identifier, dimensions = [], type) {
        return new ParameterNode(identifier, dimensions, type);
    }
}