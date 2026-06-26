// ASTFactory.js

import { LiteralNode } from "../expressions/LiteralNode.js";
import { IdentifierNode } from "../expressions/IdentifierNode.js";
import { BinaryExpressionNode } from "../expressions/BinaryExpressionNode.js";
import { LogicalExpressionNode } from "../expressions/LogicalExpressionNode.js";
import { LogicalNotNode } from "../expressions/LogicalNotNode.js";
import { FunctionCallNode } from "../expressions/FunctionCallNode.js";
import { GroupExpressionNode } from "../expressions/GroupExpressionNode.js";
import { AccessNode } from "../expressions/AccessNode.js";
import { UnaryNode } from "../expressions/UnaryNode.js";

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
import { DeclarationItemNode } from "../declarations/DeclarationItemNode.js";


export class ASTFactory {

    // =========================
    // CORE
    // =========================

    /**
     * @param {any[]} statements
     * @param {any} location
     */
    static program(statements = [], location) {
        return new ProgramNode(statements, location);
    }

    // =========================
    // EXPRESSIONS
    // =========================

    /**
     * @param {any} literalType
     * @param {any} dataType
     * @param {any} value
     * @param {any} location
     */
    static literal(literalType, dataType, value, location) {
        return new LiteralNode(literalType, dataType, value, location);
    }

    /**
     * @param {any} name
     * @param {any} location
     */
    static identifier(name, location) {
        return new IdentifierNode(name, location);
    }

    /**
     * @param {any} operator
     * @param {any} left
     * @param {any} right
     * @param {any} location
     */
    static binary(operator, left, right, location) {
        return new BinaryExpressionNode(operator, left, right, location);
    }

    /**
     * @param {any} operator
     * @param {any} left
     * @param {any} right
     * @param {any} location
     */
    static logical(operator, left, right, location) {
        return new LogicalExpressionNode(operator, left, right, location);
    }

    /**
     * @param {any} operator
     * @param {any} operand
     * @param {any} location
     */
    static logicalNot(operator, operand, location) {
        return new LogicalNotNode(operator, operand, location);
    }

    /**
     * @param {any} operator
     * @param {any} operand
     * @param {any} location
     */
    static unary(operator, operand, location) {
        return new UnaryNode(operator, operand, location);
    }

    /**
     * @param {any} identifier
     * @param {any[]} args
     * @param {any} location
     */
    static functionCall(identifier, args = [], location) {

        return new FunctionCallNode(
            identifier,
            args,
            location
        );
    }

    /**
     * @param {any} expression
     * @param {any} location
     */
    static group(expression, location) {
        return new GroupExpressionNode(expression, location);
    }

    /**
     * @param {any} identifier
     * @param {any[]} indexes
     * @param {any} location
     */
    static access(identifier, indexes = [], location) {
        return new AccessNode(identifier, indexes, location);
    }

    // =========================
    // STATEMENTS
    // =========================

    /**
     * @param {any} left
     * @param {any} right
     * @param {any} location
     */
    static assignment(left, right, location) {
        return new AssignmentNode(left, right, location);
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
     * @param {any} location
     */
    static if(condition, thenBlock, elseIfBlocks = [], elseBlock = null, location) {
        return new IfNode(condition, thenBlock, elseIfBlocks, elseBlock, location);
    }

    /**
     * @param {any} condition
     * @param {any} body
     * @param {any} location
     */
    static while(condition, body, location) {
        return new WhileNode(condition, body, location);
    }

    /**
     * @param {any} initializer
     * @param {any} condition
     * @param {any} increment
     * @param {any} body
     * @param {any} location
     */
    static for(initializer, condition, increment, body, location) {
        return new ForNode(initializer, condition, increment, body, location);
    }

    /**
     * @param {any} expression
     * @param {any} cases
     * @param {any} defaultBlock
     * @param {any} location
     */
    static switch(expression, cases, defaultBlock, location) {
        return new SwitchNode(expression, cases, defaultBlock, location);
    }

    /**
     * @param {any} value
     * @param {any} body
     * @param {any} location
     */
    static case(value, body, location) {
        return new CaseNode(value, body, location);
    }

    /**
     * @param {any} expression
     * @param {any} location
     */
    static return(expression, location) {
        return new ReturnNode(expression, location);
    }

    /**
     * @param {any} identifiers
     * @param {any} location
     */
    static read(identifiers, location) {
        return new ReadNode(identifiers, location);
    }

    /**
     * @param {any} expressions
     * @param {any} location
     */
    static write(expressions, location) {
        return new WriteNode(expressions, location);
    }

    /**
     * @param {any} identifier
     * @param {any} args
     * @param {any} location
     */
    static procedureCall(identifier, args = [], location) {

        return new ProcedureCallNode(
            identifier,
            args,
            location
        );
    }

    // =========================
    // DECLARATIONS
    // =========================

    /**
     * @param {any} declarations
     * @param {any} type
     * @param {any} location
     */
    static variableDeclaration(declarations, type, location) {
        return new VariableDeclarationNode(declarations, type, location);
    }

    /**
     * @param {any} identifier
     * @param {any} dimensions
     * @param {any} location
     */
    static declarationItem(identifier, dimensions = [], location) {
        return new DeclarationItemNode(identifier, dimensions, location);
    }

    /**
     * @param {any} identifier
     * @param {any} type
     * @param {any} value
     * @param {any} location
     */
    static constantDeclaration(identifier, type, value, location) {
        return new ConstantDeclarationNode(identifier, type, value, location);
    }

    /**
     * @param {any} identifier
     * @param {any} dimensions
     * @param {any} dataType
     * @param {any} location
     */
    static arrayDeclaration(identifier, dimensions, dataType, location) {

        return new ArrayDeclarationNode(
            identifier,
            dimensions,
            dataType,
            location
        );
    }

    /**
     * @param {any} identifier
     * @param {any} parameters
     * @param {any} returnType
     * @param {any} body
     * @param {any} location
     */
    static functionDeclaration(identifier, parameters, returnType, body, location) {

        const locationPar = identifier
            ? {
                startLine: identifier.startLine,
                endLine: identifier.endLine,
                startColumn: identifier.startColumn,
                endColumn: identifier.endColumn
            }
            : null;

        const fixedParams =
            parameters.map((/** @type {any} */ p) =>
                p instanceof ParameterNode
                    ? p
                    : ASTFactory.parameter(
                        p.identifier ?? p,
                        p.dimensions ?? [],
                        p.dataType ?? p.type,
                        locationPar
                    )
            );

        return new FunctionDeclarationNode(
            identifier,
            fixedParams,
            returnType,
            body,
            location
        );
    }

    /**
     * @param {any} identifier
     * @param {any} parameters
     * @param {any} body
     * @param {any} location
     */
    static procedureDeclaration(identifier, parameters, body, location) {

        const locationPar = identifier
            ? {
                startLine: identifier.startLine,
                endLine: identifier.endLine,
                startColumn: identifier.startColumn,
                endColumn: identifier.endColumn
            }
            : null;

        const fixedParams =
            parameters.map((/** @type {any} */ p) =>
                p instanceof ParameterNode
                    ? p
                    : ASTFactory.parameter(
                        p.identifier ?? p,
                        p.dimensions ?? [],
                        p.dataType ?? p.type,
                        locationPar
                    )
            );

        return new ProcedureDeclarationNode(
            identifier,
            fixedParams,
            body,
            location
        );
    }

    /**
     * @param {any} identifier
     * @param {any[]} dimensions
     * @param {any} type
     * @param {any} location
     */
    static parameter(identifier, dimensions = [], type, location) {
        return new ParameterNode(identifier, dimensions, type, location);
    }
}