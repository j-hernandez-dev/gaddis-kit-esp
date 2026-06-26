// src/semantic/validators/ExpressionValidator.js


import { SemanticError } from "../../errors/SemanticError.js";

import { ArithmeticRules } from "../rules/ArithmeticRules.js";
import { LogicalRules } from "../rules/LogicalRules.js";
import { ComparisonRules } from "../rules/ComparisonRules.js";
import { TypeRules } from "../rules/TypeRules.js";



export class ExpressionValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;

        this.scopeManager =
            context.scopeManager;

    }





    /**
     * Valida una expresión
     * y retorna únicamente su tipo.
     *
     * @returns {string}
     */
    validate(expression) {

        return this.getInfo(expression)
            .dataType;

    }





    /**
     * Obtiene información completa
     * de una expresión.
     *
     * {
     *   dataType:"Integer",
     *   dimensions:[]
     * }
     */
    getInfo(expression) {


        if (!expression) {

            throw new SemanticError(
                "La expresión no puede estar vacía."
            );

        }



        switch(expression.type) {


            case "IntegerLiteral":
            case "RealLiteral":
            case "StringLiteral":
            case "CharacterLiteral":
            case "BooleanLiteral":


                return {

                    dataType:
                        expression.dataType,

                    dimensions:[]

                };





            case "Identifier":

                return this.getIdentifierInfo(
                    expression
                );





            case "Access":

                return this.getAccessInfo(
                    expression
                );





            case "GroupExpression":

                return this.getInfo(
                    expression.expression
                );





            case "UnaryExpression":

                return {

                    dataType:
                        this.validateUnaryExpression(
                            expression
                        ),

                    dimensions:[]

                };





            case "BinaryExpression":

                return {

                    dataType:
                        this.validateBinaryExpression(
                            expression
                        ),

                    dimensions:[]

                };





            case "LogicalExpression":

                return {

                    dataType:
                        this.validateLogicalExpression(
                            expression
                        ),

                    dimensions:[]

                };





            case "LogicalNot":

                return {

                    dataType:
                        this.validateLogicalNot(
                            expression
                        ),

                    dimensions:[]

                };





            case "FunctionCall":

                return {

                    dataType:
                        this.validateFunctionCall(
                            expression
                        ),

                    dimensions:[]

                };





            default:

                throw new SemanticError(
                    `Expresión no soportada '${expression.type}'.`,
                    expression.location
                );

        }


    }






        /**
     * Información de acceso a arreglos.
     *
     * Ejemplos:
     *
     * k
     *
     * dimensions:
     * [
     *   3,
     *   3
     * ]
     *
     *
     * k[1][2]
     *
     * dimensions:
     * []
     */
    getAccessInfo(node) {


        const symbol =
            this.scopeManager.resolve(
                node.identifier.name
            );



        if (!symbol) {

            throw new SemanticError(
                `El identificador '${node.identifier.name}' no ha sido declarado.`,
                node.location
            );

        }



        const dimensions =
            symbol.dimensions ?? [];



        if (dimensions.length === 0) {

            throw new SemanticError(
                `'${node.identifier.name}' no es un arreglo.`,
                node.location
            );

        }



        /*
         * Validar cantidad de índices.
         */
        if (
            node.indexes.length >
            dimensions.length
        ) {

            throw new SemanticError(
                `El arreglo '${node.identifier.name}' solamente tiene ${dimensions.length} dimensión(es).`,
                node.location
            );

        }



        /*
         * Validar índices.
         */
        for (const index of node.indexes) {


            const indexInfo =
                this.getInfo(index);



            if (
                indexInfo.dataType !== "Integer"
            ) {

                throw new SemanticError(
                    "Los índices de un arreglo deben ser Integer.",
                    index.location
                );

            }

        }



        /*
         * Cálculo de dimensiones restantes.
         *
         * k[1]
         *
         * de:
         *
         * Integer[3][3]
         *
         * queda:
         *
         * Integer[3]
         *
         */
        const remainingDimensions =
            dimensions.slice(
                node.indexes.length
            );



        return {

            dataType:
                symbol.dataType,


            dimensions:
                remainingDimensions

        };

    }





    /**
     * Operadores unarios:
     *
     * -x
     * +x
     */
    validateUnaryExpression(node) {


        const operandType =
            this.validate(
                node.operand
            );



        if (
            !TypeRules.isNumeric(
                operandType
            )
        ) {

            throw new SemanticError(
                `El operador '${node.operator}' requiere un valor numérico.`,
                node.location
            );

        }



        return operandType;

    }





    /**
     * Operaciones binarias.
     */
    validateBinaryExpression(node) {


        const leftType =
            this.validate(
                node.left
            );


        const rightType =
            this.validate(
                node.right
            );



        switch(node.operator) {


            case "+":
            case "-":
            case "*":
            case "/":
            case "%":


                const arithmetic =
                    ArithmeticRules.resolveType(
                        node.operator,
                        leftType,
                        rightType
                    );



                if (!arithmetic) {

                    throw new SemanticError(
                        `Operación aritmética inválida entre '${leftType}' y '${rightType}'.`,
                        node.location
                    );

                }


                return arithmetic;





            case ">":
            case "<":
            case ">=":
            case "<=":
            case "=":
            case "<>":



                if (
                    !ComparisonRules.validate(
                        leftType,
                        rightType,
                        node.operator
                    )
                ) {

                    throw new SemanticError(
                        `No se pueden comparar los tipos '${leftType}' y '${rightType}'.`,
                        node.location
                    );

                }



                return ComparisonRules.resultType();





            default:

                throw new SemanticError(
                    `Operador '${node.operator}' no soportado.`,
                    node.location
                );

        }


    }






    /**
     * AND / OR
     */
    validateLogicalExpression(node) {


        const leftType =
            this.validate(
                node.left
            );


        const rightType =
            this.validate(
                node.right
            );



        const result =
            LogicalRules.validateBinary(
                node.operator,
                leftType,
                rightType
            );



        if (!result) {

            throw new SemanticError(
                "Los operadores lógicos requieren valores Boolean.",
                node.location
            );

        }



        return result;

    }






    /**
     * NOT
     */
    validateLogicalNot(node) {


        const type =
            this.validate(
                node.operand
            );



        const result =
            LogicalRules.validateUnary(
                "Not",
                type
            );



        if (!result) {

            throw new SemanticError(
                "El operador Not requiere un valor Boolean.",
                node.location
            );

        }



        return result;

    }





    /**
     * Llamadas a funciones dentro
     * de expresiones.
     *
     * Ejemplo:
     *
     * x <- Sum(5,10)
     */
    validateFunctionCall(node) {


        const symbol =
            this.scopeManager.resolve(
                node.identifier.name
            );



        if (!symbol) {

            throw new SemanticError(
                `La función '${node.identifier.name}' no ha sido declarada.`,
                node.location
            );

        }



        if (
            symbol.kind !== "Function"
        ) {

            throw new SemanticError(
                `'${node.identifier.name}' no es una función.`,
                node.location
            );

        }



        if (
            node.arguments.length !==
            symbol.parameters.length
        ) {

            throw new SemanticError(
                `La función '${node.identifier.name}' requiere ${symbol.parameters.length} argumento(s).`,
                node.location
            );

        }





        for (
            let i = 0;
            i < node.arguments.length;
            i++
        ) {


            const argumentInfo =
                this.getInfo(
                    node.arguments[i]
                );



            const parameter =
                symbol.parameters[i];



            if (
                !TypeRules.isAssignable(
                    parameter.dataType,
                    argumentInfo.dataType
                )
            ) {

                throw new SemanticError(
                    `El argumento ${i + 1} de '${node.identifier.name}' no coincide con el tipo esperado.`,
                    node.arguments[i].location
                );

            }



            this.validateArrayDimensions(
                argumentInfo.dimensions,
                parameter.dimensions ?? [],
                node.arguments[i].location
            );

        }



        return symbol.returnType;

    }






    /**
     * Compatibilidad de dimensiones
     * en argumentos.
     *
     * Ejemplos:
     *
     * Entero[]
     *
     * acepta:
     *
     * k
     *
     * pero no:
     *
     * k[1]
     */
    validateArrayDimensions(
        received,
        expected,
        location
    ) {


        if (
            received.length === 0 &&
            expected.length === 0
        ) {

            return;

        }



        if (
            received.length !==
            expected.length
        ) {

            throw new SemanticError(
                "La dimensión del arreglo no coincide con la esperada.",
                location
            );

        }



        for (
            let i = 0;
            i < expected.length;
            i++
        ) {


            const expectedDimension =
                expected[i];



            const receivedDimension =
                received[i];



            /*
             * Parámetros sin tamaño:
             *
             * Entero arreglo[]
             *
             */
            if (
                expectedDimension === null
            ) {

                continue;

            }



            /*
             * Dimensiones conocidas.
             */
            if (
                expectedDimension !==
                receivedDimension
            ) {

                throw new SemanticError(
                    "El tamaño de las dimensiones del arreglo no coincide.",
                    location
                );

            }

        }

    }

}