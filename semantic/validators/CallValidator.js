// src/semantic/validators/CallValidator.js


import { SemanticError } from "../../errors/SemanticError.js";
import { SymbolKind } from "../symbols/SymbolKind.js";
import { TypeRules } from "../rules/TypeRules.js";



export class CallValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;

    }





    /**
     * Valida llamada a función.
     *
     * AST:
     *
     * FunctionCall
     * {
     *   identifier,
     *   arguments
     * }
     *
     * @returns {string}
     */
    validateFunctionCall(node) {


        const name =
            node.identifier.name;



        const symbol =
            this.context.scopeManager
                .resolve(name);



        if (!symbol) {

            throw new SemanticError(
                `La función '${name}' no ha sido declarada.`,
                node.location
            );

        }



        if (
            symbol.kind !== SymbolKind.Function
        ) {

            throw new SemanticError(
                `'${name}' no es una función.`,
                node.location
            );

        }



        this.validateArguments(
            node.arguments ?? [],
            symbol.parameters ?? [],
            node.location
        );



        return symbol.returnType;

    }







    /**
     * Valida llamada a procedimiento.
     */
    validateProcedureCall(node) {


        const name =
            node.identifier.name;



        const symbol =
            this.context.scopeManager
                .resolve(name);




        if (!symbol) {

            throw new SemanticError(
                `El procedimiento '${name}' no ha sido declarado.`,
                node.location
            );

        }



        if (
            symbol.kind !== SymbolKind.Procedure
        ) {

            throw new SemanticError(
                `'${name}' no es un procedimiento.`,
                node.location
            );

        }



        this.validateArguments(
            node.arguments ?? [],
            symbol.parameters ?? [],
            node.location
        );


        return null;

    }







    /**
     * Compara argumentos con parámetros.
     */
    validateArguments(
        argumentsList,
        parameters,
        location
    ) {



        if (
            argumentsList.length !== parameters.length
        ) {

            throw new SemanticError(
                "La cantidad de argumentos enviados no coincide con los parámetros esperados.",
                location
            );

        }




        for (
            let i = 0;
            i < parameters.length;
            i++
        ) {


            const argument =
                argumentsList[i];


            const parameter =
                parameters[i];



            const argumentType =
                this.context.expressionValidator
                    .validate(argument);



            this.validateArgumentType(
                argumentType,
                parameter,
                argument.location
            );


        }


    }







    /**
     * Valida compatibilidad del tipo.
     */
    validateArgumentType(
        receivedType,
        parameter,
        location
    ) {


        const expectedType =
            parameter.dataType;



        if (
            !TypeRules.isAssignable(
                expectedType,
                receivedType
            )
        ) {


            throw new SemanticError(
                `El tipo recibido '${receivedType}' no puede asignarse al parámetro '${expectedType}'.`,
                location
            );

        }



        /*
            Validación de arreglos.
        */

        this.validateDimensions(
            receivedType.dimensions ?? [],
            parameter.dimensions ?? [],
            location
        );

    }







    /**
     * Valida dimensiones de arreglos.
     */
    validateDimensions(
        receivedDimensions,
        expectedDimensions,
        location
    ) {



        /*
            Ambos escalares.
        */

        if (
            receivedDimensions.length === 0 &&
            expectedDimensions.length === 0
        ) {

            return;

        }




        /*
            Diferente cantidad
            de dimensiones.
        */

        if (
            receivedDimensions.length !==
            expectedDimensions.length
        ) {


            throw new SemanticError(
                "La cantidad de dimensiones del arreglo no coincide con la esperada.",
                location
            );

        }





        for (
            let i = 0;
            i < expectedDimensions.length;
            i++
        ) {


            const expected =
                expectedDimensions[i];



            const received =
                receivedDimensions[i];




            /*
                Parámetro abierto:

                Entero datos[]
            */

            if (
                expected === null
            ) {

                continue;

            }





            const type =
                this.context.expressionValidator
                    .validate(received);



            if (
                type !== "Integer"
            ) {

                throw new SemanticError(
                    "Las dimensiones de un arreglo deben ser de tipo Integer.",
                    location
                );

            }


        }


    }


}