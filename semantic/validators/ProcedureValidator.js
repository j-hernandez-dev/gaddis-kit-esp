import { SemanticError } from "../../errors/SemanticError.js";
import { SymbolKind } from "../symbols/SymbolKind.js";


export class ProcedureValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;
    }



    /**
     * Valida una declaración de procedimiento.
     *
     * AST esperado:
     *
     * {
     *   type: "ProcedureDeclaration",
     *   identifier,
     *   parameters,
     *   body
     * }
     */
    validate(node) {


        const name =
            node.identifier.name;



        /*
            Validar redeclaración
            dentro del scope actual.
        */
        if (
            this.context.scopes
                .currentScope
                .contains(name)
        ) {

            throw new SemanticError(
                `El procedimiento '${name}' ya ha sido declarado.`,
                node.location
            );
        }



        const procedureSymbol =
            this.createProcedureSymbol(node);



        /*
            Registrar procedimiento.
        */
        this.context.scopes
            .currentScope
            .define(procedureSymbol);



        /*
            Crear scope interno
            del procedimiento.
        */
        const procedureScope =
            this.context.scopes
                .enterScope(
                    "Procedure"
                );



        /*
            Registrar parámetros.
        */
        this.registerParameters(
            node.parameters,
            procedureScope
        );



        /*
            Guardar contexto actual.
            ReturnValidator utilizará
            esta información para impedir
            retornos inválidos.
        */
        this.context.currentProcedure = {

            name,

            symbol:
                procedureSymbol
        };



        /*
            El cuerpo será recorrido
            posteriormente por SemanticAnalyzer.
        */


        this.context.scopes
            .exitScope();



        this.context.currentProcedure =
            null;



        return procedureSymbol;
    }





    /**
     * Crea el símbolo del procedimiento.
     */
    createProcedureSymbol(node) {


        return {


            name:
                node.identifier.name,


            kind:
                SymbolKind.Procedure,


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
     * Registra parámetros dentro
     * del scope del procedimiento.
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