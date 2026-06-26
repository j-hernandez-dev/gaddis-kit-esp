import { Scope } from "./Scope.js";


export class ScopeManager {


    constructor() {


        /**
         * Pila de scopes activos.
         *
         * El último elemento representa
         * el scope anterior al actual.
         */
        this.scopeStack = [];



        /**
         * Scope global del programa.
         */
        this.globalScope =
            this.createScope({
                parent: null,
                type: "Global"
            });



        /**
         * Scope actualmente activo.
         */
        this.currentScope =
            this.globalScope;

    }





    /**
     * Crea un nuevo scope.
     *
     * No lo activa.
     *
     * @param {Object} options
     * @param {Scope|null} options.parent
     * @param {string} options.type
     *
     * @returns {Scope}
     */
    createScope({
        parent = this.currentScope,
        type = "Block"
    } = {}) {


        return new Scope({
            parent,
            type
        });

    }





    /**
     * Entra a un nuevo scope hijo.
     *
     * Ejemplos:
     *
     * Function
     * Procedure
     * While
     * If
     *
     * @param {string} type
     *
     * @returns {Scope}
     */
    enterScope(type = "Block") {


        const newScope =
            this.createScope({
                parent: this.currentScope,
                type
            });



        this.scopeStack.push(
            this.currentScope
        );



        this.currentScope =
            newScope;



        return newScope;

    }





    /**
     * Sale del scope actual.
     *
     * Regresa al scope anterior.
     *
     * @returns {Scope}
     */
    exitScope() {


        if (
            this.scopeStack.length === 0
        ) {


            throw new Error(
                "No existe un scope superior."
            );

        }



        this.currentScope =
            this.scopeStack.pop();



        return this.currentScope;

    }





    /**
     * Obtiene el scope actual.
     *
     * @returns {Scope}
     */
    getCurrentScope() {


        return this.currentScope;

    }





    /**
     * Obtiene el scope global.
     *
     * @returns {Scope}
     */
    getGlobalScope() {


        return this.globalScope;

    }





    /**
     * Busca un símbolo desde el scope actual
     * hacia los scopes superiores.
     *
     * Ejemplo:
     *
     * Variable local
     *        |
     *        v
     * Variable global
     *
     *
     * @param {string} name
     *
     * @returns {Symbol|null}
     */
    resolve(name) {


        return this.currentScope.resolve(
            name
        );

    }





    /**
     * Busca únicamente dentro
     * del scope actual.
     *
     * Usado para detectar:
     *
     * Declarar Entero edad
     * Declarar Real edad
     *
     *
     * @param {string} name
     *
     * @returns {Symbol|null}
     */
    resolveCurrent(name) {


        return this.currentScope.resolveLocal(
            name
        );

    }





    /**
     * Determina si un identificador
     * existe en scopes superiores.
     *
     * Utilizado para evitar shadowing.
     *
     * @param {string} name
     *
     * @returns {boolean}
     */
    existsInParentScopes(name) {


        return this.currentScope.existsInParent(
            name
        );

    }





    /**
     * Define un símbolo en el scope actual.
     *
     * Los validators deben validar
     * previamente las reglas semánticas.
     *
     * @param {Symbol} symbol
     */
    define(symbol) {


        this.currentScope.define(
            symbol
        );

    }





    /**
     * Reinicia el administrador.
     *
     * Se elimina toda la cadena
     * de scopes y se crea un nuevo global.
     */
    reset() {


        this.scopeStack = [];



        this.globalScope =
            this.createScope({
                parent: null,
                type: "Global"
            });



        this.currentScope =
            this.globalScope;

    }


}