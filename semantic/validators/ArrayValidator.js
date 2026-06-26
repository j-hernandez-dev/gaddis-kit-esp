// src/semantic/validators/ArrayValidator.js

import { SemanticError } from "../../errors/SemanticError.js";


export class ArrayValidator {

    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;

        this.expressionValidator =
            context.expressionValidator;
    }



    /**
     * Valida las dimensiones de un arreglo declarado.
     *
     * @param {Array<Object>} dimensions
     */
    validateDeclarationDimensions(dimensions, location) {


        if (!dimensions || dimensions.length === 0) {

            throw new SemanticError(
                "Un arreglo declarado debe tener al menos una dimensión.",
                location
            );
        }



        for (const dimension of dimensions) {

            this.validateDimension(
                dimension
            );

        }

    }



    /**
     * Valida una dimensión individual.
     *
     * La dimensión debe producir un Integer.
     */
    validateDimension(expression) {


        const type =
            this.expressionValidator.validate(expression);



        if (type !== "Integer") {

            throw new SemanticError(
                "La dimensión del arreglo sólo puede ser de tipo Entero.",
                expression.location
            );
        }


    }



    /**
     * Obtiene la cantidad de dimensiones.
     *
     * Ejemplo:
     *
     * a[10]        -> 1
     * matriz[3][3] -> 2
     */
    getDimensionCount(dimensions) {

        return dimensions
            ? dimensions.length
            : 0;

    }

}