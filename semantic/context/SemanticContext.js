// src/semantic/context/SemanticContext.js


import { ScopeManager } from "../scopes/ScopeManager.js";
import { TypeSystem } from "../types/TypeSystem.js";



export class SemanticContext {


    constructor() {


        /**
         * Administrador de ámbitos.
         *
         * Controla:
         *
         * - Global
         * - Funciones
         * - Procedimientos
         * - Bloques
         */
        this.scopeManager =
            new ScopeManager();





        /**
         * Sistema de tipos.
         *
         * Utilizado por:
         *
         * - ExpressionValidator
         * - AssignmentValidator
         * - CallValidator
         */
        this.typeSystem =
            new TypeSystem();






        /**
         * Referencias a validators.
         *
         * Son inyectadas por SemanticAnalyzer.
         *
         * Ejemplo:
         *
         * context.expressionValidator
         *
         * context.assignmentValidator
         *
         */
        this.expressionValidator = null;

        this.assignmentValidator = null;

        this.declarationValidator = null;

        this.arrayValidator = null;

        this.functionValidator = null;

        this.procedureValidator = null;

        this.controlFlowValidator = null;

        this.callValidator = null;

        this.returnValidator = null;






        /**
         * Errores semánticos encontrados.
         *
         * Actualmente el sistema usa
         * excepciones directas, pero se mantiene
         * para análisis acumulativo futuro.
         */
        this.errors = [];






        /**
         * Rutina actual.
         *
         * Puede ser:
         *
         * Function
         * Procedure
         *
         */
        this.currentRoutine = null;






        /**
         * Opciones del análisis.
         */
        this.options = {


            strict: true


        };


    }









    /**
     * Registra un error semántico.
     *
     * @param {SemanticError} error
     */
    report(error) {


        this.errors.push(error);


    }









    /**
     * Indica si existen errores.
     *
     * @returns {boolean}
     */
    hasErrors() {


        return this.errors.length > 0;


    }









    /**
     * Obtiene errores.
     *
     * @returns {Array}
     */
    getErrors() {


        return this.errors;


    }









    /**
     * Limpia errores acumulados.
     */
    clearErrors() {


        this.errors = [];


    }









    /**
     * Define la rutina actualmente analizada.
     *
     * @param {Symbol} routine
     */
    enterRoutine(routine) {


        this.currentRoutine = routine;


    }









    /**
     * Finaliza análisis de rutina.
     */
    exitRoutine() {


        this.currentRoutine = null;


    }









    /**
     * Indica si existe una rutina activa.
     *
     * @returns {boolean}
     */
    insideRoutine() {


        return this.currentRoutine !== null;


    }









    /**
     * Reinicia el contexto.
     *
     * Conserva la estructura de validators,
     * porque SemanticAnalyzer puede volver a asignarlos.
     */
    reset() {


        this.scopeManager =
            new ScopeManager();



        this.errors = [];



        this.currentRoutine = null;


    }


}