// src/semantic/validators/AssignmentValidator.js


import { SemanticError } from "../../errors/SemanticError.js";
import { SemanticContext } from "../context/SemanticContext.js";


export class AssignmentValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {


        this.context = context;


        /*
         * ExpressionValidator ya fue creado
         * por SemanticAnalyzer.
         */
        this.expressionValidator =
            context.expressionValidator;

    }






    /**
     * Valida una sentencia de asignación.
     *
     * Ejemplos:
     *
     * edad <- 10
     *
     * matriz[1][2] <- 5
     *
     *
     * @param {Object} node
     *
     * @returns {string}
     */
    validate(node) {


        const target =
            node.left;



        if (!target) {

            throw new SemanticError(
                "La asignación requiere un destino.",
                node.location
            );

        }




        /*
         * El destino puede ser:
         *
         * Identifier
         * Access (arreglo)
         */
        if (
            target.type !== "Identifier" &&
            target.type !== "Access"
        ) {

            throw new SemanticError(
                "El destino de una asignación debe ser una variable o un acceso de arreglo.",
                target.location
            );

        }






        /*
         * Obtener símbolo asociado.
         */
        const name =
            target.identifier
                ? target.identifier.name
                : target.name;



        const symbol =
            this.context.scopeManager
                .resolve(name);




        /*
         * Declaración obligatoria.
         */
        if (!symbol) {

            throw new SemanticError(
                `La variable '${name}' no ha sido declarada.`,
                target.location
            );

        }






        /*
         * Constantes no modificables.
         */
        if (
            symbol.isConstant
        ) {

            throw new SemanticError(
                `No se puede modificar la constante '${name}'.`,
                target.location
            );

        }






        /*
         * Si es acceso a arreglo:
         *
         * valida índices y obtiene
         * el tipo del elemento.
         */
        const targetType =
            this.expressionValidator
                .validate(target);






        /*
         * Obtener tipo de expresión derecha.
         */
        const expressionType =
            this.expressionValidator
                .validate(node.right);






        /*
         * Compatibilidad.
         */
        const compatible =
            this.context.typeSystem
                .isAssignable(
                    targetType,
                    expressionType
                );



        if (!compatible) {


            throw new SemanticError(
                `No se puede asignar ${expressionType} a ${targetType}.`,
                node.location
            );

        }






        /*
         * Marcar símbolo como inicializado.
         *
         * Aunque sea un acceso de arreglo,
         * la inicialización pertenece
         * al símbolo completo.
         */
        symbol.initialized = true;



        return targetType;

    }


}