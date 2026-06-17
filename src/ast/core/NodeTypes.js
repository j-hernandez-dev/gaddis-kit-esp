/**
 * NodeTypes.js
 * ==================================
 * NODE TYPES
 * ==================================
 */

export const NodeTypes = {

    /**
     * =========================
     * CORE
     * =========================
     */
    PROGRAM: "Program",
    BLOCK: "Block",

    /**
     * =========================
     * EXPRESSIONS
     * =========================
     */
    LITERAL: "Literal", // ahora sí representa LiteralNode genérico
    IDENTIFIER: "Identifier",
    LOGICAL_EXPRESSION: "LogicalExpression",
    BINARY_EXPRESSION: "BinaryExpression",
    LOGICAL_NOT: "LogicalNot",
    FUNCTION_CALL: "FunctionCall",
    GROUP_EXPRESSION: "GroupExpression",
    ACCESS: "Access",

    /**
     * =========================
     * STATEMENTS
     * =========================
     */
    ASSIGNMENT: "Assignment",
    IF_STATEMENT: "IfStatement",
    WHILE_STATEMENT: "WhileStatement",
    FOR_STATEMENT: "ForStatement",
    SWITCH_STATEMENT: "SwitchStatement",
    CASE_STATEMENT: "CaseStatement",
    DEFAULT_STATEMENT: "DefaultStatement",
    RETURN_STATEMENT: "ReturnStatement",
    READ_STATEMENT: "ReadStatement",
    WRITE_STATEMENT: "WriteStatement",
    PROCEDURE_CALL: "ProcedureCall",

    /**
     * =========================
     * DECLARATIONS
     * =========================
     */
    VARIABLE_DECLARATION: "VariableDeclaration",
    CONSTANT_DECLARATION: "ConstantDeclaration",
    ARRAY_DECLARATION: "ArrayDeclaration",
    FUNCTION_DECLARATION: "FunctionDeclaration",
    PROCEDURE_DECLARATION: "ProcedureDeclaration",
    PARAMETER: "Parameter",

    /**
     * =========================
     * LITERAL TYPES
     * =========================
     */
    NUMBER_LITERAL: "NumberLiteral",
    STRING_LITERAL: "StringLiteral",
    BOOLEAN_LITERAL: "BooleanLiteral",
    NULL_LITERAL: "NullLiteral"
};