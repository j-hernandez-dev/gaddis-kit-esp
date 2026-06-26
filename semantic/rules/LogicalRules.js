// src/semantic/rules/LogicalRules.js


/**
 * Reglas semánticas para operadores lógicos.
 *
 * Responsabilidades:
 *
 * - Validar operandos booleanos.
 * - Resolver tipos resultantes.
 *
 * No:
 *
 * - Recorre AST.
 * - Maneja scopes.
 * - Lanza errores.
 */
export class LogicalRules {


    /**
     * Operadores lógicos binarios.
     */
    static operators = {

        And: "And",

        Or: "Or"

    };





    /**
     * Determina si una operación lógica binaria
     * es válida.
     *
     * Reglas:
     *
     * Boolean And Boolean
     * Boolean Or Boolean
     *
     * @returns {boolean}
     */
    static isValidBinary(
        operator,
        leftType,
        rightType
    ) {


        if (
            !this.isLogicalOperator(operator)
        ) {

            return false;

        }



        return (
            this.isBoolean(leftType) &&
            this.isBoolean(rightType)
        );

    }





    /**
     * Obtiene el tipo resultado
     * de una operación lógica binaria.
     *
     * Ejemplo:
     *
     * Boolean And Boolean
     *
     * Resultado:
     *
     * Boolean
     *
     * @returns {string|null}
     */
    static resolveBinaryType(
        operator,
        leftType,
        rightType
    ) {


        if (
            !this.isValidBinary(
                operator,
                leftType,
                rightType
            )
        ) {

            return null;

        }


        return "Boolean";

    }





    /**
     * Determina si una operación NOT
     * es válida.
     *
     * Regla:
     *
     * Not Boolean
     *
     * @returns {boolean}
     */
    static isValidUnary(
        operator,
        expressionType
    ) {


        if (
            operator !== "Not"
        ) {

            return false;

        }



        return this.isBoolean(expressionType);

    }





    /**
     * Obtiene el tipo resultado
     * del operador NOT.
     *
     * @returns {string|null}
     */
    static resolveUnaryType(
        operator,
        expressionType
    ) {


        if (
            !this.isValidUnary(
                operator,
                expressionType
            )
        ) {

            return null;

        }


        return "Boolean";

    }





    /**
     * Verifica si un operador
     * es lógico binario.
     */
    static isLogicalOperator(operator) {

        return (
            operator === this.operators.And ||
            operator === this.operators.Or
        );

    }





    /**
     * Determina si un tipo
     * puede utilizarse como lógico.
     */
    static isBoolean(type) {

        return type === "Boolean";

    }

}