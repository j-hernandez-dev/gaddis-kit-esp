import { NodeTypes } from "../core/NodeTypes.js";

export class ASTPrinter {

    /**
     * @param {import("../core/ProgramNode.js").ProgramNode} node
     */
    print(node) {
        console.log(this.format(node, 0));
    }

    /**
     * @param { any } node
     * @returns { any };
     */
    format(node, indent = 0) {

        if (!node) return this.tabs(indent) + "null";

        const space = this.tabs(indent);

        switch (node.type) {

            case NodeTypes.PROGRAM:
                return this.printProgram(node, indent);

            case NodeTypes.BLOCK:
                return this.printBlock(node, indent);

            /**
             * =====================
             * LITERALS
             * =====================
             */
            case NodeTypes.NUMBER_LITERAL:
            case NodeTypes.STRING_LITERAL:
            case NodeTypes.BOOLEAN_LITERAL:
            case NodeTypes.NULL_LITERAL:
                return space + `Literal(${node.value})`;

            /**
             * =====================
             * IDENTIFIER
             * =====================
             */
            case NodeTypes.IDENTIFIER:
                return space + `Identifier(${node.value ?? node.name})`;

            /**
             * =====================
             * BINARY
             * =====================
             */
            case NodeTypes.BINARY_EXPRESSION:
                return this.printBinary(node, indent);

            /**
             * =====================
             * LOGICAL
             * =====================
             */
            case NodeTypes.LOGICAL_EXPRESSION:
                return space + `Logical(${node.operator})\n` +
                    this.format(node.left, indent + 1) + "\n" +
                    this.format(node.right, indent + 1);
            /**
             * =====================
             * LOGICAL NOT
             * =====================
             */
            case NodeTypes.LOGICAL_NOT:
                return space + "Not(\n" +
                    this.format(node.operand, indent + 1) + "\n" +
                    space + ")";

            /**
             * =====================
             * FUNCTION CALL
             * =====================
             */
            case NodeTypes.FUNCTION_CALL:
                return this.printFunctionCall(node, indent);

            /**
             * =====================
             * GROUP
             * =====================
             */
            case NodeTypes.GROUP_EXPRESSION:
                return space + "Group(\n" +
                    this.format(node.value ?? node.expression, indent + 1) + "\n" +
                    space + ")";

            /**
             * =====================
             * ACCESS
             * =====================
             */
            case NodeTypes.ACCESS:
                return this.printAccess(node, indent);

            /**
             * =====================
             * ASSIGNMENT
             * =====================
             */
            case NodeTypes.ASSIGNMENT:
                return space + "Assignment(\n" +
                    this.format(node.left, indent + 1) + ",\n" +
                    this.format(node.right, indent + 1) + "\n" +
                    space + ")";

            /**
             * =====================
             * IF
             * =====================
             */
            case NodeTypes.IF_STATEMENT:
                return this.printIf(node, indent);

            case NodeTypes.WHILE_STATEMENT:
                return this.printWhile(node, indent);

            case NodeTypes.FOR_STATEMENT:
                return this.printFor(node, indent);

            case NodeTypes.SWITCH_STATEMENT:
                return this.printSwitch(node, indent);

            case NodeTypes.CASE_STATEMENT:
                return this.printCase(node, indent);

            case NodeTypes.DEFAULT_STATEMENT:
                return space + "Default\n" +
                    this.format(node.body, indent + 1);

            case NodeTypes.RETURN_STATEMENT:
                return this.printReturn(node, indent);

            case NodeTypes.READ_STATEMENT:
                return this.printRead(node, indent);

            case NodeTypes.WRITE_STATEMENT:
                return this.printWrite(node, indent);

            case NodeTypes.VARIABLE_DECLARATION:
                return this.printVarDecl(node, indent);

            case NodeTypes.CONSTANT_DECLARATION:
                return this.printConstDecl(node, indent);

            case NodeTypes.ARRAY_DECLARATION:
                return this.printArrayDecl(node, indent);

            case NodeTypes.FUNCTION_DECLARATION:
                return this.printFunctionDecl(node, indent);

            case NodeTypes.PROCEDURE_DECLARATION:
                return this.printProcedureDecl(node, indent);

            case NodeTypes.PARAMETER:
                return this.printParameter(node, indent);

            case NodeTypes.PROCEDURE_CALL:
                return this.printProcedureCall(node, indent);

            default:
                return space + `[Unknown Node: ${node.type}]`;
        }
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printProgram(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Program\n";

        const statements =
            node.statements ??
            node.body ??
            node.children ??
            [];

        for (const stmt of statements) {
            out += this.format(stmt, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printBlock(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Block\n";

        const statements =
            node.statements ??
            node.body ??
            node.children ??
            [];

        for (const stmt of statements) {
            out += this.format(stmt, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printBinary(node, indent) {

        const space = this.tabs(indent);

        return (
            space + `Binary(${node.operator ?? node.op})\n` +
            this.format(node.left, indent + 1) + "\n" +
            this.format(node.right, indent + 1)
        );
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printFunctionCall(node, indent) {

        const space = this.tabs(indent);

        let out = space + `Call(${node.name})\n`;

        const args =
            node.arguments ??
            node.args ??
            [];

        for (const arg of args) {
            out += this.format(arg, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printAccess(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Access\n";

        out += this.format(node.identifier, indent + 1) + "\n";

        const indexes =
            node.indexes ??
            node.expressions ??
            [];

        for (const idx of indexes) {
            out += this.format(idx, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printIf(node, indent) {

        const space = this.tabs(indent);

        let out = space + "If\n";

        out += this.format(node.condition, indent + 1) + "\n";
        out += this.format(node.thenBlock, indent + 1) + "\n";

        if (node.elseBlock) {
            out += this.format(node.elseBlock, indent + 1);
        }

        return out.trimEnd();
    }

    /**
     * @param { number } n
     */
    tabs(n) {
        return "  ".repeat(n);
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printWhile(node, indent) {

        const space = this.tabs(indent);

        let out = space + "While\n";

        out += this.format(node.condition, indent + 1) + "\n";
        out += this.format(node.body, indent + 1);

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printFor(node, indent) {

        const space = this.tabs(indent);

        let out = space + "For\n";

        out += space + "  Var: " + node.variable + "\n";

        out += this.format(
            node.initialValue,
            indent + 1
        ) + "\n";

        out += this.format(
            node.limit,
            indent + 1
        ) + "\n";


        if (node.step) {
            out += this.format(
                node.step,
                indent + 1
            ) + "\n";
        }


        out += this.format(
            node.body,
            indent + 1
        );

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printSwitch(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Switch\n";

        out += this.format(node.expression, indent + 1) + "\n";

        const cases = node.cases ?? [];

        for (const c of cases) {
            out += this.format(c, indent + 1) + "\n";
        }

        if (node.defaultCase) {
            out += this.format(node.defaultCase, indent + 1);
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printCase(node, indent) {

        const space = this.tabs(indent);

        let out =
            space + "Case\n";

        out += this.format(
            node.value,
            indent + 1
        ) + "\n";


        out += this.format(
            node.body,
            indent + 1
        );

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printReturn(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Return\n";

        if (node.expression) {
            out += this.format(
                node.expression,
                indent + 1
            );
        }

        return out.trimEnd();
    }


    /**
     * @param { any } node
     * @param { number } indent
     */
    printRead(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Read\n";

        for (const id of node.identifiers ?? []) {
            out += this.format(id, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printWrite(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Write\n";

        for (const expr of node.expressions ?? []) {
            out += this.format(expr, indent + 1) + "\n";
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printVarDecl(node, indent) {

        const space = this.tabs(indent);

        let out = space + "VarDecl\n";

        const ids = node.identifiers ?? [];

        for (const id of ids) {

            if (!id) {
                out += this.tabs(indent + 1) + "[Invalid Identifier]\n";
                continue;
            }

            out += this.format(id, indent + 1) + "\n";
        }

        out += space + "Type: " + node.type;

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printConstDecl(node, indent) {

        const space = this.tabs(indent);

        let out = space + "ConstDecl\n";

        out += this.format(node.identifier, indent + 1) + "\n";
        out += this.format(node.value, indent + 1);

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printArrayDecl(node, indent) {

        const space = this.tabs(indent);

        let out = space + "ArrayDecl\n";

        out += this.tabs(indent + 1) + `Identifier(${node.identifier})\n`;

        for (const dim of node.dimensions ?? []) {
            out += this.format(dim, indent + 1) + "\n";
        }

        out += space + "Type: " + node.dataType;

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printFunctionDecl(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Function\n";

        out += this.format(node.name, indent + 1) + "\n";

        for (const p of node.parameters ?? []) {
            out += this.format(p, indent + 1) + "\n";
        }

        out += this.format(node.body, indent + 1) + "\n";

        if (node.returnExpression) {
            out += this.format(node.returnExpression, indent + 1);
        }

        return out.trimEnd();
    }

    /**
     * @param { any } node
     * @param { number } indent
     */
    printProcedureDecl(node, indent) {

        const space = this.tabs(indent);

        let out = space + "Procedure\n";

        out += this.format(node.name, indent + 1) + "\n";

        for (const p of node.parameters ?? []) {
            out += this.format(p, indent + 1) + "\n";
        }

        out += this.format(node.body, indent + 1);

        return out.trimEnd();
    }

    /**
     * =====================
     * PARAMETER
     * =====================
     * @param {any} node
     * @param {number} indent
     */
    printParameter(node, indent) {

        const space = this.tabs(indent);

        let out =
            space + "Parameter\n";

        out +=
            this.format(node.identifier, indent + 1) + "\n";

        out +=
            space + "Type: " + node.type;

        return out.trimEnd();
    }

    /**
 * =====================
 * PROCEDURE CALL
 * =====================
 * @param {any} node
 * @param {number} indent
 */
    printProcedureCall(node, indent) {

        const space = this.tabs(indent);

        let out =
            space + `ProcedureCall(${node.name})\n`;

        const args =
            node.arguments ??
            node.args ??
            [];

        for (const arg of args) {
            out +=
                this.format(arg, indent + 1) + "\n";
        }

        return out.trimEnd();
    }
}