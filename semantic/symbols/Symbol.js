export class Symbol {

    /**
     * Representa un identificador dentro del análisis semántico.
     *
     * Puede representar:
     * - Variable
     * - Constante
     * - Parámetro
     * - Función
     * - Procedimiento
     *
     * @param {Object} options
     */
    constructor({
        name,
        kind,
        dataType = null,
        location = null,

        // Variables / constantes / parámetros
        initialized = false,
        mutable = true,

        // Arrays
        dimensions = [],

        // Funciones y procedimientos
        parameters = [],
        returnType = null
    }) {

        /**
         * Nombre del identificador
         */
        this.name = name;


        /**
         * Tipo de símbolo.
         *
         * Ej:
         * Variable
         * Constant
         * Function
         */
        this.kind = kind;


        /**
         * Tipo de dato asociado.
         *
         * Ej:
         * Integer
         * Real
         * String
         * Boolean
         */
        this.dataType = dataType;


        /**
         * Ubicación en código fuente.
         * Usado para errores semánticos.
         */
        this.location = location;


        /**
         * Indica si tiene valor asignado.
         *
         * Importante para:
         *
         * Declarar Entero x
         * Escribir x
         *
         */
        this.initialized = initialized;


        /**
         * Indica si puede modificarse.
         *
         * Variables:
         * true
         *
         * Constantes:
         * false
         */
        this.mutable = mutable;


        /**
         * Dimensiones del arreglo.
         *
         * Ej:
         *
         * Entero numeros[5]
         *
         * dimensions:
         * [5]
         *
         *
         * Parámetro:
         *
         * Entero numeros[]
         *
         * dimensions:
         * [null]
         *
         */
        this.dimensions = dimensions;


        /**
         * Parámetros de funciones/procedimientos.
         *
         * Cada elemento es un Symbol.
         */
        this.parameters = parameters;


        /**
         * Tipo retornado.
         *
         * Sólo aplica para funciones.
         *
         * Ej:
         *
         * Funcion Entero suma()
         *
         * returnType:
         * Integer
         *
         */
        this.returnType = returnType;
    }


    /**
     * Determina si el símbolo representa un arreglo.
     */
    isArray() {

        return this.dimensions.length > 0;

    }


    /**
     * Determina si el símbolo puede recibir asignaciones.
     */
    isMutable() {

        return this.mutable;

    }


    /**
     * Determina si es una función.
     */
    isFunction() {

        return this.kind === "Function";

    }


    /**
     * Determina si es un procedimiento.
     */
    isProcedure() {

        return this.kind === "Procedure";

    }


    /**
     * Determina si representa una variable.
     */
    isVariable() {

        return this.kind === "Variable";

    }


    /**
     * Determina si representa una constante.
     */
    isConstant() {

        return this.kind === "Constant";

    }


    /**
     * Determina si representa un parámetro.
     */
    isParameter() {

        return this.kind === "Parameter";

    }

}