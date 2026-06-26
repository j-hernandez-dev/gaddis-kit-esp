export class TypeSystem {


    constructor() {


        /**
         * Tipos primitivos soportados
         * por el lenguaje.
         */
        this.types = {

            Integer: "Integer",

            Real: "Real",

            String: "String",

            Character: "Character",

            Boolean: "Boolean"
        };

    }



    /**
     * Comprueba si un tipo existe.
     *
     * @param {string} type
     */
    isValidType(type) {

        return Object
            .values(this.types)
            .includes(type);

    }



    /**
     * Determina si un tipo es numérico.
     *
     * Integer y Real pueden participar
     * en operaciones aritméticas.
     */
    isNumeric(type) {

        return (
            type === this.types.Integer ||
            type === this.types.Real
        );

    }



    /**
     * Determina si es lógico.
     */
    isBoolean(type) {

        return type === this.types.Boolean;

    }



    /**
     * Determina si es texto.
     *
     * Incluye:
     *
     * String
     * Character
     */
    isText(type) {

        return (
            type === this.types.String ||
            type === this.types.Character
        );

    }



    /**
     * Determina si dos tipos son exactamente iguales.
     */
    isSameType(left, right) {

        return left === right;

    }



    /**
     * Compatibilidad de asignaciones.
     *
     * Ejemplos:
     *
     * Integer <- Integer  ✓
     *
     * Real <- Integer     ✓
     *
     * Integer <- String   ✗
     *
     */
    canAssign(targetType, valueType) {


        if(targetType === valueType) {

            return true;

        }


        /**
         * Conversión implícita permitida:
         *
         * Entero -> Real
         *
         */
        if(
            targetType === this.types.Real &&
            valueType === this.types.Integer
        ) {

            return true;

        }


        return false;

    }



    /**
     * Determina el tipo resultado
     * de una operación aritmética.
     *
     * Reglas:
     *
     * Integer + Integer = Integer
     *
     * Integer + Real = Real
     *
     * Real + Real = Real
     *
     */
    resolveArithmetic(left, right, operator) {


        /**
         * Caso especial:
         *
         * String + cualquier tipo
         *
         * concatenación
         */
        if(
            operator === "+" &&
            (
                this.isText(left) ||
                this.isText(right)
            )
        ) {

            return this.types.String;

        }



        /**
         * Operaciones normales
         */
        if(
            this.isNumeric(left) &&
            this.isNumeric(right)
        ) {


            if(
                left === this.types.Real ||
                right === this.types.Real
            ) {

                return this.types.Real;

            }


            return this.types.Integer;

        }


        return null;

    }



    /**
     * Determina si una comparación
     * es válida.
     *
     * Permitido:
     *
     * Integer > Integer
     *
     * String = String
     *
     * Incorrecto:
     *
     * String > Integer
     */
    canCompare(left, right, operator) {


        /**
         * Igualdad puede comparar
         * tipos iguales.
         */
        if(
            operator === "=" ||
            operator === "!="
        ) {

            return left === right;

        }



        /**
         * Operadores relacionales
         *
         * solamente numéricos.
         */
        if(
            operator === ">" ||
            operator === "<" ||
            operator === ">=" ||
            operator === "<="
        ) {

            return (
                this.isNumeric(left) &&
                this.isNumeric(right)
            );

        }


        return false;

    }



    /**
     * Valida operaciones lógicas.
     *
     * Solamente acepta:
     *
     * Boolean Y Boolean
     *
     * Boolean O Boolean
     */
    canLogical(left, right) {


        return (
            this.isBoolean(left) &&
            this.isBoolean(right)
        );

    }



    /**
     * Obtiene el tipo resultado
     * de una operación lógica.
     */
    resolveLogical(left, right) {


        if(
            this.canLogical(left, right)
        ) {

            return this.types.Boolean;

        }


        return null;

    }



    /**
     * Obtiene el tipo resultante
     * de operadores de comparación.
     */
    resolveComparison(left, right, operator) {


        if(
            this.canCompare(
                left,
                right,
                operator
            )
        ) {

            return this.types.Boolean;

        }


        return null;

    }



    /**
     * Convierte un tipo interno
     * a una representación legible.
     *
     * Útil para mensajes:
     *
     * Integer -> Entero
     */
    display(type) {


        const names = {


            Integer: "Entero",

            Real: "Real",

            String: "Cadena",

            Character: "Caracter",

            Boolean: "Logico",

        };


        return names[type] ?? type;

    }


}