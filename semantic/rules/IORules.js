// src/semantic/rules/IORules.js


/**
 * Reglas semánticas para operaciones
 * de entrada y salida.
 *
 * Responsabilidades:
 *
 * - Determinar tipos permitidos.
 * - Validar restricciones generales.
 *
 * No:
 *
 * - Recorre AST.
 * - Busca símbolos.
 * - Lanza errores.
 */
export class IORules {



    /**
     * Determina si un tipo puede
     * enviarse a salida.
     *
     * Permitidos:
     *
     * Integer
     * Real
     * String
     * Character
     * Boolean
     *
     * @param {string} dataType
     * @returns {boolean}
     */
    static canWriteType(dataType) {


        return [

            "Integer",
            "Real",
            "String",
            "Character",
            "Boolean"

        ].includes(dataType);

    }





    /**
     * Determina si un tipo puede
     * recibir entrada.
     *
     * Leer convierte el texto recibido
     * durante ejecución.
     *
     * @param {string} dataType
     * @returns {boolean}
     */
    static canReadType(dataType) {


        return [

            "Integer",
            "Real",
            "String",
            "Character",
            "Boolean"

        ].includes(dataType);

    }





    /**
     * Determina si una operación
     * de escritura es válida.
     *
     * La escritura acepta cualquier
     * expresión cuyo tipo pueda mostrarse.
     *
     * @param {string} dataType
     *
     * @returns {boolean}
     */
    static isValidWriteType(dataType) {

        return this.canWriteType(dataType);

    }





    /**
     * Determina si una operación
     * de lectura es válida.
     *
     * Leer solamente acepta variables.
     *
     * La validación del símbolo
     * corresponde al Call/IO Validator.
     *
     * @param {Object} symbol
     *
     * @returns {boolean}
     */
    static isValidReadSymbol(symbol) {


        if (!symbol) {

            return false;

        }


        return (
            symbol.kind === "Variable"
        );

    }





    /**
     * Determina si un símbolo
     * representa una variable modificable.
     *
     * Útil para Leer.
     *
     * @param {Object} symbol
     *
     * @returns {boolean}
     */
    static isWritableVariable(symbol) {


        if (!symbol) {

            return false;

        }


        return (
            symbol.kind === "Variable" &&
            !symbol.isConstant
        );

    }


}