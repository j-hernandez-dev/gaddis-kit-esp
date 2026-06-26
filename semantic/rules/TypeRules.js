// src/semantic/rules/TypeRules.js


import { TypeSystem } from "../types/TypeSystem.js";



export class TypeRules {



    /**
     * Compatibilidad para asignaciones,
     * parámetros y retornos.
     *
     * Integer -> Real permitido.
     */
    static isAssignable(
        targetType,
        sourceType
    ) {


        if (
            !targetType ||
            !sourceType
        ) {

            return false;

        }



        if (
            targetType === sourceType
        ) {

            return true;

        }



        /*
         * Conversión implícita:
         *
         * Integer -> Real
         */
        if (
            targetType === TypeSystem.Real &&
            sourceType === TypeSystem.Integer
        ) {

            return true;

        }



        return false;

    }





    /**
     * Alias usado por otros validadores.
     */
    static isCompatible(
        expected,
        received
    ) {

        return this.isAssignable(
            expected,
            received
        );

    }





    /**
     * Determina si un tipo es numérico.
     */
    static isNumeric(type) {

        return (
            type === TypeSystem.Integer ||
            type === TypeSystem.Real
        );

    }





    /**
     * Determina si un tipo es lógico.
     */
    static isBoolean(type) {

        return (
            type === TypeSystem.Boolean
        );

    }





    /**
     * Determina si un tipo es texto.
     */
    static isText(type) {

        return (
            type === TypeSystem.String ||
            type === TypeSystem.Character
        );

    }





    /**
     * Comparaciones:
     *
     * >
     * <
     * >=
     * <=
     * =
     * <>
     */
    static areComparable(
        leftType,
        rightType,
        operator
    ) {


        if (
            !leftType ||
            !rightType
        ) {

            return false;

        }



        /*
         * Igualdad
         */
        if (
            operator === "=" ||
            operator === "<>"
        ) {


            return (
                this.isAssignable(
                    leftType,
                    rightType
                )
                ||
                this.isAssignable(
                    rightType,
                    leftType
                )
            );

        }




        /*
         * Comparaciones relacionales
         */
        if (
            operator === ">" ||
            operator === "<" ||
            operator === ">=" ||
            operator === "<="
        ) {


            return (
                this.isNumeric(leftType) &&
                this.isNumeric(rightType)
            );

        }



        return false;

    }





    /**
     * Operaciones aritméticas.
     */
    static isArithmeticValid(
        leftType,
        rightType,
        operator
    ) {


        /*
         * Concatenación
         */
        if (
            operator === "+" &&
            (
                this.isText(leftType) ||
                this.isText(rightType)
            )
        ) {

            return true;

        }



        return (
            this.isNumeric(leftType) &&
            this.isNumeric(rightType)
        );

    }





    /**
     * Obtiene el resultado
     * de una operación aritmética.
     */
    static resolveArithmeticType(
        leftType,
        rightType,
        operator
    ) {


        if (
            !this.isArithmeticValid(
                leftType,
                rightType,
                operator
            )
        ) {

            return null;

        }



        /*
         * Concatenación
         */
        if (
            operator === "+" &&
            (
                this.isText(leftType) ||
                this.isText(rightType)
            )
        ) {

            return TypeSystem.String;

        }




        /*
         * Si uno es Real,
         * resultado Real.
         */
        if (
            leftType === TypeSystem.Real ||
            rightType === TypeSystem.Real
        ) {

            return TypeSystem.Real;

        }



        return TypeSystem.Integer;

    }





    /**
     * Operaciones lógicas.
     */
    static isLogicalValid(
        leftType,
        rightType
    ) {


        return (
            this.isBoolean(leftType) &&
            this.isBoolean(rightType)
        );

    }





    /**
     * Operador NOT.
     */
    static isLogicalNotValid(type) {


        return this.isBoolean(type);

    }





    /**
     * Operador unario:
     *
     * -5
     * +10
     */
    static isUnaryNumericValid(type) {


        return this.isNumeric(type);

    }





    /**
     * Conversión para concatenación.
     */
    static canConvertToString(type) {


        return [
            TypeSystem.Integer,
            TypeSystem.Real,
            TypeSystem.String,
            TypeSystem.Character,
            TypeSystem.Boolean

        ].includes(type);

    }



}