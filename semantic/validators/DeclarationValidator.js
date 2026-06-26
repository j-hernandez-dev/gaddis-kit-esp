import { SemanticError } from "../../errors/SemanticError.js";

import { Symbol } from "../symbols/Symbol.js";
import { SymbolKind } from "../symbols/SymbolKind.js";


export class DeclarationValidator {

    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;

    }


    /**
     * Procesa declaraciones de variables.
     * 
     * AST:
     * {
     *   type: "VariableDeclaration",
     *   declarations: [],
     *   dataType
     * }
     */
    validateVariableDeclaration(node) {


        const dataType = node.dataType;


        for (const declaration of node.declarations) {


            const name = declaration.identifier.name;


            this.validateIdentifierAvailable(
                name,
                declaration.identifier.location
            );


            const symbol = new Symbol({

                name,

                kind: SymbolKind.Variable,

                dataType,

                dimensions: declaration.dimensions,

                initialized: false,

                constant: false,

                location: declaration.location

            });



            this.context.scopeManager
                .currentScope
                .define(symbol);


        }

    }



    /**
     * Procesa declaraciones de constantes.
     *
     * AST:
     *
     * {
     *   type:"ConstantDeclaration",
     *   identifier,
     *   dataType,
     *   value
     * }
     */
    validateConstantDeclaration(node) {


        const name = node.identifier.name;


        this.validateIdentifierAvailable(
            name,
            node.identifier.location
        );



        const valueType =
            this.context.typeSystem
                .resolveExpressionType(
                    node.value,
                    this.context
                );



        this.context.typeSystem
            .assertAssignable(
                node.dataType,
                valueType,
                node.value.location
            );



        const symbol = new Symbol({

            name,

            kind: SymbolKind.Constant,

            dataType: node.dataType,

            dimensions: [],

            initialized: true,

            constant: true,

            location: node.location

        });



        this.context.scopeManager
            .currentScope
            .define(symbol);


    }




    /**
     * Verifica que el identificador no exista
     * dentro del scope actual.
     *
     * Shadowing se valida posteriormente
     * mediante ScopeRules.
     */
    validateIdentifierAvailable(name, location) {


        const currentScope =
            this.context.scopeManager.currentScope;



        if(currentScope.existsLocal(name)) {


            throw new SemanticError(
                `El identificador '${name}' ya ha sido declarado.`,
                location
            );

        }


    }



    /**
     * Valida una declaración genérica.
     */
    validate(node) {


        switch(node.type) {


            case "VariableDeclaration":

                this.validateVariableDeclaration(node);

                break;



            case "ConstantDeclaration":

                this.validateConstantDeclaration(node);

                break;



            default:

                throw new SemanticError(
                    `Tipo de declaración no soportado: ${node.type}`,
                    node.location
                );

        }


    }

}