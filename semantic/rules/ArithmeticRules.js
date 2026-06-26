// src/semantic/rules/ArithmeticRules.js


export class ArithmeticRules {


    /**
     * Determina si una operación aritmética es válida.
     *
     * Operadores soportados:
     *
     * +
     * -
     * *
     * /
     * %
     *
     * @param {string} operator
     * @param {string} leftType
     * @param {string} rightType
     */
    static isValid(
        operator,
        leftType,
        rightType
    ) {


        if (
            !operator ||
            !leftType ||
            !rightType
        ) {

            return false;
        }



        /*
         * Concatenación
         *
         * String + cualquier tipo convertible
         *
         */
        if (
            operator === "+" &&
            (
                leftType === "String" ||
                rightType === "String"
            )
        ) {

            return true;
        }



        /*
         * Operaciones numéricas
         */
        if (
            !this.isNumeric(leftType) ||
            !this.isNumeric(rightType)
        ) {

            return false;
        }



        return [
            "+",
            "-",
            "*",
            "/",
            "%"
        ].includes(operator);

    }





    /**
     * Obtiene el tipo resultado
     * de una operación aritmética.
     *
     * @returns {string|null}
     */
    static resolveType(
        operator,
        leftType,
        rightType
    ) {



        /*
         * Concatenación
         */
        if (
            this.isConcatenation(
                operator,
                leftType,
                rightType
            )
        ) {

            return "String";

        }




        /*
         * Operaciones numéricas
         */
        if (
            !this.isValid(
                operator,
                leftType,
                rightType
            )
        ) {

            return null;

        }




        /*
         * División siempre produce Real
         *
         * Ejemplo:
         *
         * 5 / 2 = 2.5
         *
         */
        if (
            operator === "/"
        ) {

            return "Real";

        }



        /*
         * Si participa Real,
         * el resultado es Real
         */
        if (
            leftType === "Real" ||
            rightType === "Real"
        ) {

            return "Real";

        }



        /*
         * Integer op Integer
         */
        return "Integer";

    }





    /**
     * Determina si un tipo
     * participa en operaciones numéricas.
     */
    static isNumeric(type) {

        return (
            type === "Integer" ||
            type === "Real"
        );

    }





    /**
     * Determina si una operación
     * es concatenación.
     */
    static isConcatenation(
        operator,
        leftType,
        rightType
    ) {

        return (
            operator === "+" &&
            (
                leftType === "String" ||
                rightType === "String"
            )
        );

    }





    /**
     * Determina si el operador
     * requiere operandos enteros.
     *
     * Actualmente aplicado a:
     *
     * %
     *
     */
    static requiresIntegerOperands(operator) {

        return operator === "%";

    }





    /**
     * Valida restricciones especiales.
     *
     * Ejemplo:
     *
     * 5 % 2     válido
     *
     * 5.5 % 2   inválido
     *
     */
    static validateSpecialOperator(
        operator,
        leftType,
        rightType
    ) {


        if (
            this.requiresIntegerOperands(operator)
        ) {

            return (
                leftType === "Integer" &&
                rightType === "Integer"
            );

        }


        return true;

    }

}