import path from "node:path";
import { TranspilerError } from "../errors/TranspilerError.js"
import { appendFile, mkdir, unlink, writeFile } from 'node:fs/promises';
import { dependencies, endProgram, standartLibrary } from "./StandartLibrary.js";

export class Transpiler {

    /**
     * @param {any} build
     */
    constructor(build) {
        this.JSFile = "runner-temp.js";
        this.JSDir = ".\\";

        if (build != null) {
            this.JSFile = path.basename(build);
            this.JSDir = path.dirname(build) + "\\build\\";
        }
    }

    /**
     * @param {number} milisecondues
     */
    freezeThread(milisecondues) {
        const inicio = Date.now()
        while (Date.now() - inicio < milisecondues) {
        }
    }

    /**
     * @param {any} content
     */
    async createFile(content, file = this.JSFile, dir = this.JSDir) {
        try {
            await mkdir(dir, { recursive: true });
            await writeFile(path.join(dir, file), content, 'utf8');
        } catch (error) {
            console.error('Error to write file', error);
        }
    }

    /**
     * @param {any} content
     */
    async writeFile(content, file = this.JSFile, dir = this.JSDir) {
        try {
            await mkdir(dir, { recursive: true });
            const linea = `${content}`;
            await appendFile(path.join(dir, file), linea, 'utf8');
        } catch (error) {
            console.error('Error to write file', error);
        }
    }

    async deleteFile(file = this.JSFile, dir = this.JSDir) {
        try {
            await mkdir(dir, { recursive: true });
            await unlink(path.join(dir, file));
        } catch (error) {
            // @ts-ignore
            if (error.code === 'ENOENT') {
            } else {
                // @ts-ignore
                console.error('Error trying to delete the file', error.message);
            }
        }
    }

    /**
     * @param {any} ast
     */
    transpile(ast) {

        if (!ast) {

            throw new TranspilerError(
                "There is no AST to analyze"
            );

        }

        if (
            ast.type !== "Program"
        ) {

            throw new TranspilerError(
                "The root node must be a Program"
            );

        }

        const Program = ast.statements;

        let code = "";
        for (let i = 0; i < Program.length; i++) {
            const statement = Program[i];

            code += this.statementType(statement);
        }

        const fileContent = dependencies + standartLibrary + code + endProgram;
        this.createFile(fileContent);
        this.freezeThread(500);
    }

    /**
     * Despacha cada nodo del AST hacia su generador correspondiente.
     *
     * @param {any} statement
     */
    statementType(statement) {

        if (!statement || !statement.type) {
            throw new TranspilerError(
                "The statement node is not valid"
            );
        }

        const generators = {

            VariableDeclaration:
                this.variableDeclaration,

            ConstantDeclaration:
                this.constantDeclaration,

            Assignment:
                this.assignment,

            ProcedureDeclaration:
                this.functionsDeclaration,

            FunctionDeclaration:
                this.functionsDeclaration,

            ProcedureCall:
                this.procedureCall,

            WriteStatement:
                this.writeStatement,

            ReadStatement:
                this.readStatement,

            IfStatement:
                this.ifStatement,

            SwitchStatement:
                this.switchStatement,

            WhileStatement:
                this.whileStatement,

            ForStatement:
                this.forStatement,

            ReturnStatement:
                this.returnStatement
        };

        // @ts-ignore
        const generator = generators[statement.type];

        if (!generator) {
            throw new TranspilerError(
                `There is no generator for the node: ${statement.type}`
            );
        }

        return generator.call(this, statement);
    }

    /**
     * Genera código JavaScript a partir de un nodo expresión del AST.
     *
     * @param {any} expression
     * @returns {any}
     */
    getExpression(expression) {

        if (!expression || !expression.type) {
            throw new TranspilerError(
                "The expression is not valid"
            );
        }


        switch (expression.type) {

            case "LogicalNot":
            case "UnaryExpression": {
                const operator =
                    expression.operator === "Not"
                        ? "!"
                        : expression.operator;


                return (
                    operator +
                    this.getExpression(expression.operand)
                );
            }

            case "GroupExpression": {

                return (
                    "(" +
                    this.getExpression(expression.expression) +
                    ")"
                );
            }

            case "BinaryExpression":
            case "LogicalExpression": {

                const operator =
                    this.getOperator(expression.operator);


                return (
                    this.getExpression(expression.left) +
                    " " +
                    operator +
                    " " +
                    this.getExpression(expression.right)
                );
            }

            case "Identifier": {

                return expression.name;
            }

            case "FunctionCall": {

                const args =
                    expression.arguments
                        .map((/** @type {any} */ argument) =>
                            this.getExpression(argument)
                        )
                        .join(", ");

                return (
                    "await " +
                    expression.identifier.name +
                    "(" +
                    args +
                    ")"
                );
            }

            case "IntegerLiteral":
            case "RealLiteral":
            case "CharacterLiteral":
            case "StringLiteral":
            case "BooleanLiteral": {

                return this.getLiteral(expression);
            }

            case "Access": {

                let result =
                    expression.identifier.name;

                for (const index of expression.indexes) {

                    result +=
                        `[${this.getExpression(index)}]`;
                }

                return result;
            }

            default:
                throw new TranspilerError(
                    `Unsupported expression: ${expression.type}`
                );
        }
    }

    /**
     * @param {any} operator
     */
    getOperator(operator) {

        const operators = {
            "==": "===",

            "^": "**"
        };


        // @ts-ignore
        return operators[operator] ?? operator;
    }

    /**
     * @param {any} literal
     */
    getLiteral(literal) {

        switch (literal.type) {


            case "CharacterLiteral":

                return `'${literal.value}'`;


            case "StringLiteral":

                return `"${literal.value}"`;


            case "BooleanLiteral":

                return literal.value === "True"
                    ? "true"
                    : "false";


            default:

                return String(literal.value);
        }
    }

    /**
 * Genera declaraciones de variables.
 *
 * @param {any} statement
 */
    variableDeclaration(statement) {

        const declarations =
            statement.declarations;


        let instruction = "";


        for (const declarationItem of declarations) {

            const identifier =
                declarationItem.identifier.name;


            const dimensions =
                declarationItem.dimensions ?? [];


            instruction +=
                this.generateVariable(identifier, dimensions);

        }


        return instruction;
    }

    /**
 * Genera una declaración individual de variable.
 *
 * @param {string} identifier
 * @param {any[]} dimensions
 */
    generateVariable(identifier, dimensions) {

        let instruction = "";


        if (dimensions.length === 0) {

            return `let ${identifier};\n`;

        }


        instruction +=
            `let ${identifier} = [];\n`;


        for (let i = 1; i < dimensions.length; i++) {

            instruction +=
                `${identifier}.push([]);\n`;

        }


        return instruction;
    }

    /**
     * Genera una declaración de constante.
     *
     * @param {any} statement
     */
    constantDeclaration(statement) {

        const identifier =
            statement.identifier.name;


        const values =
            statement.value ?? [];


        if (values.length === 0) {

            throw new TranspilerError(
                `The constant ${identifier} has no assigned value`
            );

        }


        const value =
            values
                .map((/** @type {any} */ expression) =>
                    this.getExpression(expression)
                )
                .join(", ");


        return `const ${identifier} = ${value};\n`;
    }

    /**
     * Genera una asignación.
     *
     * @param {any} statement
     */
    assignment(statement) {

        if (!statement.left || !statement.right) {

            throw new TranspilerError(
                "The assignment must have a left-hand side and a right-hand side"
            );

        }


        const target =
            this.getExpression(statement.left);


        const value =
            this.getExpression(statement.right);


        return `${target} = ${value};\n`;
    }

    /**
     * Genera una declaración de función o procedimiento.
     *
     * @param {any} statement
     */
    functionsDeclaration(statement) {

        const identifier =
            statement.identifier.name;


        const parameters =
            statement.parameters ?? [];


        let instruction =
            `async function ${identifier}(`;


        instruction +=
            parameters
                .map((/** @type {{ identifier: { name: any; }; }} */ parameter) =>
                    parameter.identifier.name
                )
                .join(", ");


        instruction += ") {\n";


        const statements =
            statement.body?.statements ?? [];


        for (const bodyStatement of statements) {

            instruction +=
                "\t" +
                this.statementType(bodyStatement);

        }


        instruction +=
            "}\n";


        if (
            statement.type === "ProcedureDeclaration" &&
            (
                identifier === "main" ||
                identifier === "principal"
            )
        ) {

            instruction +=
                `${identifier}();\n`;

        }


        return instruction;
    }

    /**
     * Genera una llamada a procedimiento.
     *
     * @param {any} statement
     */
    procedureCall(statement) {

        if (!statement.identifier) {

            throw new TranspilerError(
                "The procedure call does not have an identifier"
            );

        }

        const identifier =
            statement.identifier.name;

        const argumentsList =
            statement.arguments ?? [];

        const args =
            argumentsList
                .map((/** @type {any} */ argument) =>
                    this.getExpression(argument)
                )
                .join(", ");

        return `${identifier}(${args});\n`;
    }

    /**
     * Genera una instrucción de salida.
     *
     * @param {any} statement
     */
    writeStatement(statement) {

        const expressions =
            statement.expressions ?? [];


        const values =
            expressions
                .map((/** @type {any} */ expression) =>
                    this.getExpression(expression)
                )
                .join("+ ");


        return `console.log(${values});\n`;
    }

    /**
     * Genera una instrucción de lectura (input).
     *
     * @param {any} statement
     */
    readStatement(statement) {

        const identifiers =
            statement.identifiers ?? [];

        return identifiers
            .map((/** @type {any} */ identifier) =>
                `${this.getExpression(identifier)} = await inputData();\n`
            )
            .join("");
    }

    /**
     * Genera estructura if / else if / else.
     *
     * @param {any} statement
     */
    ifStatement(statement) {

        const condition =
            this.getExpression(statement.condition);


        const thenBlock =
            this.buildBlock(statement.thenBlock?.statements);


        const elseIfBranches =
            statement.elseIfBranches ?? [];


        const elseBlock =
            statement.elseBlock?.statements;


        let instruction =
            `if (${condition}) {\n${thenBlock}\n}\n`;


        instruction += elseIfBranches
            .map((/** @type {{ condition: any; block: { statements: any[] | undefined; }; }} */ branch) => {

                const cond =
                    this.getExpression(branch.condition);


                const body =
                    this.buildBlock(branch.block?.statements);


                return `else if (${cond}) {\n${body}\n}\n`;
            })
            .join("");


        if (elseBlock) {

            instruction +=
                `else {\n${this.buildBlock(elseBlock)}\n}\n`;

        }


        return instruction;
    }

    /**
     * Genera un bloque de statements con indentación.
     *
     * @param {any[]} statements
     */
    buildBlock(statements = []) {

        return statements
            .map(stmt =>
                "\t" + this.statementType(stmt)
            )
            .join("");
    }

    /**
     * Genera estructura switch.
     *
     * @param {any} statement
     */
    switchStatement(statement) {

        const expression =
            this.getExpression(statement.expression);


        const cases =
            statement.cases ?? [];


        const defaultCase =
            statement.defaultCase;


        let instruction =
            `switch (${expression}) {\n`;


        instruction += cases
            .map((/** @type {any} */ caseItem) => {

                const value =
                    this.getExpression(caseItem.value);


                const body =
                    this.buildSwitchBlock(caseItem.body?.statements);


                return `\tcase ${value}:\n${body}\tbreak;\n`;
            })
            .join("");


        if (defaultCase) {

            const body =
                this.buildSwitchBlock(defaultCase.body?.statements);


            instruction +=
                `\tdefault:\n${body}\tbreak;\n`;

        }


        instruction += "}\n";


        return instruction;
    }

    /**
     * Genera bloque de statements dentro de switch (sin duplicar break lógica).
     *
     * @param {any[]} statements
     */
    buildSwitchBlock(statements = []) {

        return statements
            .map(stmt =>
                "\t" + this.statementType(stmt) + "\n"
            )
            .join("");
    }

    /**
     * Genera estructura while.
     *
     * @param {any} statement
     */
    whileStatement(statement) {

        const condition =
            this.getExpression(statement.condition);


        const body =
            this.buildBlock(statement.body?.statements);


        return `while (${condition}) {\n${body}\n}\n`;
    }

    /**
     * Genera estructura for.
     *
     * @param {any} statement
     * @returns {any}
     */
    forStatement(statement) {

        const variable =
            statement.initializer?.left?.name;


        const start =
            this.getExpression(statement.initializer?.right);


        const end =
            this.getExpression(statement.condition?.right);


        const incrementValue =
            this.getExpression(statement.increment?.right?.right);


        const body =
            this.buildBlock(statement.body?.statements);


        return `for (${variable} = ${start}; ${variable} <= ${end}; ${variable} = ${variable} + ${incrementValue}) {\n${body}\n}\n`;
    }

    /**
     * @param {any} statement
     */
    returnStatement(statement) {

        const expression =
            statement.expression
                ? this.getExpression(statement.expression)
                : "";

        return `return ${expression};\n`;
    }
}