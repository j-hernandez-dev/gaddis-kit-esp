// src/semantic/rules/ComparisonRules.js


/**
 * Reglas semánticas para operadores
 * de comparación.
 *
 * Responsabilidades:
 *
 * - Validar comparaciones.
 * - Resolver tipo resultado.
 *
 * No:
 *
 * - Recorre AST.
 * - Maneja scopes.
 * - Lanza errores.
 */
export class ComparisonRules {



    /**
     * Operadores comparativos soportados.
     */
    static operators = [

        ">",
        ">=",
        "<",
        "<=",
        "=",
        "<>"

    ];





    /**
     * Determina si una comparación
     * es válida.
     *
     * Reglas:
     *
     * Numéricos:
     *
     * Integer > Real
     * Real <= Integer
     *
     *
     * Igualdad:
     *
     * String = String
     * Character = Character
     * Boolean = Boolean
     *
     *
     * No permitido:
     *
     * String > String
     * Boolean < Integer
     *
     *
     * @returns {boolean}
     */
    static isValid(
        leftType,
        rightType,
        operator
    ) {


        if (
            !this.isComparisonOperator(operator)
        ) {

            return false;

        }



        /*
         * Operadores relacionales
         *
         * > < >= <=
         *
         * solamente números
         */
        if (
            this.isRelationalOperator(operator)
        ) {

            return (
                this.isNumeric(leftType) &&
                this.isNumeric(rightType)
            );

        }





        /*
         * Igualdad:
         *
         * = <>
         *
         * acepta tipos compatibles
         */
        if (
            operator === "=" ||
            operator === "<>"
        ) {


            return (
                this.isComparableType(leftType) &&
                leftType === rightType
            );

        }



        return false;

    }





    /**
     * Obtiene el tipo resultado
     * de una comparación.
     *
     * Toda comparación válida
     * retorna Boolean.
     *
     * @returns {string|null}
     */
    static resolveType(
        leftType,
        rightType,
        operator
    ) {


        if (
            !this.isValid(
                leftType,
                rightType,
                operator
            )
        ) {

            return null;

        }


        return "Boolean";

    }





    /**
     * Alias de compatibilidad.
     *
     * Permite mantener código antiguo.
     */
    static validate(
        leftType,
        rightType,
        operator
    ) {

        return this.isValid(
            leftType,
            rightType,
            operator
        );

    }





    /**
     * Determina si un operador
     * es comparativo.
     */
    static isComparisonOperator(operator) {

        return this.operators.includes(operator);

    }





    /**
     * Operadores:
     *
     * >
     * <
     * >=
     * <=
     */
    static isRelationalOperator(operator) {

        return [

            ">",
            ">=",
            "<",
            "<="

        ].includes(operator);

    }





    /**
     * Tipos numéricos.
     */
    static isNumeric(type) {

        return (
            type === "Integer" ||
            type === "Real"
        );

    }





    /**
     * Tipos que pueden compararse
     * mediante igualdad.
     */
    static isComparableType(type) {

        return [

            "Integer",
            "Real",
            "String",
            "Character",
            "Boolean"

        ].includes(type);

    }


}