import { SemanticError } from "../../errors/SemanticError.js";
import { SymbolKind } from "../symbols/SymbolKind.js";


export class FunctionValidator {

    /**
     * @param {SemanticContext} context
     */
    constructor(context) {
        this.context = context;
    }


    /**
     * Valida una declaración de función.
     *
     * AST esperado:
     *
     * {
     *   type: "FunctionDeclaration",
     *   identifier,
     *   parameters,
     *   returnType,
     *   body
     * }
     */
    validate(node) {


        const name =
            node.identifier.name;



        /*
            La función debe registrarse
            en el scope actual.
        */
        if (
            this.context.scopes
                .currentScope
                .contains(name)
        ) {

            throw new SemanticError(
                `La función '${name}' ya ha sido declarada.`,
                node.location
            );
        }



        const functionSymbol =
            this.createFunctionSymbol(node);



        this.context.symbolTable
            .define(functionSymbol);



        /*
            Crear scope propio
            para parámetros y variables locales.
        */
        const functionScope =
            this.context.scopes
                .enterScope(
                    "Function"
                );



        /*
            Registrar parámetros.
        */
        this.registerParameters(
            node.parameters,
            functionScope
        );



        /*
            Guardar contexto de función actual.
            Será utilizado por ReturnValidator.
        */
        this.context.currentFunction = {
            name,
            returnType: node.returnType,
            symbol: functionSymbol
        };



        /*
            El cuerpo será recorrido
            posteriormente por SemanticAnalyzer.
        */

        this.context.scopes
            .exitScope();



        this.context.currentFunction =
            null;


        return functionSymbol;
    }





    /**
     * Construye el símbolo de función.
     */
    createFunctionSymbol(node) {


        return {
            name:
                node.identifier.name,


            kind:
                SymbolKind.Function,


            dataType:
                node.returnType,


            returnType:
                node.returnType,


            parameters:
                node.parameters.map(parameter => ({
                    
                    name:
                        parameter.identifier.name,


                    dataType:
                        parameter.dataType,


                    dimensions:
                        parameter.dimensions ?? []

                })),


            location:
                node.location
        };
    }





    /**
     * Registra parámetros como símbolos locales.
     */
    registerParameters(parameters, scope) {


        for (const parameter of parameters) {


            const name =
                parameter.identifier.name;



            if (
                scope.contains(name)
            ) {

                throw new SemanticError(
                    `El parámetro '${name}' ya ha sido declarado.`,
                    parameter.location
                );
            }



            scope.define({

                name,


                kind:
                    SymbolKind.Parameter,


                dataType:
                    parameter.dataType,


                dimensions:
                    parameter.dimensions ?? [],


                initialized:
                    true,


                location:
                    parameter.location
            });
        }
    }
}