import { SemanticError } from "../../errors/SemanticError.js";


export class ReturnValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;
    }



    /**
     * Valida una sentencia Return.
     *
     * AST esperado:
     *
     * {
     *   type: "ReturnStatement",
     *   expression: {}
     * }
     */
    validate(node) {


        /*
            Un return sólo puede existir
            dentro de una función o procedimiento.
        */
        if (
            !this.context.currentFunction &&
            !this.context.currentProcedure
        ) {

            throw new SemanticError(
                "No se puede utilizar Retornar fuera de una función o procedimiento.",
                node.location
            );
        }



        /*
            Caso procedimiento.
        */
        if (
            this.context.currentProcedure
        ) {


            if (
                node.expression !== null &&
                node.expression !== undefined
            ) {

                throw new SemanticError(
                    "Un procedimiento no puede retornar un valor.",
                    node.location
                );
            }


            return;
        }





        /*
            Caso función.
        */
        const functionContext =
            this.context.currentFunction;



        if (
            !node.expression
        ) {

            throw new SemanticError(
                `La función '${functionContext.name}' debe retornar un valor.`,
                node.location
            );
        }



        /*
            Obtener tipo de la expresión.
            
            ExpressionValidator será responsable
            de inferir este tipo.
        */
        const expressionType =
            this.context.expressionValidator
                .inferType(node.expression);



        if (
            expressionType !== functionContext.returnType
        ) {

            throw new SemanticError(

                `El tipo retornado no coincide con el tipo esperado. Se esperaba ${functionContext.returnType}, recibido ${expressionType}.`,

                node.location
            );
        }
    }
}