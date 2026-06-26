/**
 * Tipos de símbolos reconocidos por el análisis semántico.
 *
 * Estos valores identifican la naturaleza de un identificador
 * almacenado dentro de la tabla de símbolos.
 */
export const SymbolKind = Object.freeze({

    /**
     * Variable mutable declarada mediante:
     *
     * Declarar Tipo nombre
     */
    Variable: "Variable",



    /**
     * Constante inmutable declarada mediante:
     *
     * Constante Tipo nombre
     */
    Constant: "Constant",



    /**
     * Parámetro formal de una función o procedimiento.
     *
     * Ejemplo:
     *
     * Funcion Entero suma(Entero a)
     */
    Parameter: "Parameter",



    /**
     * Función con valor de retorno.
     *
     * Ejemplo:
     *
     * Funcion Entero ObtenerEdad()
     */
    Function: "Function",



    /**
     * Procedimiento sin valor de retorno.
     *
     * Ejemplo:
     *
     * Procedimiento MostrarMensaje()
     */
    Procedure: "Procedure"

});