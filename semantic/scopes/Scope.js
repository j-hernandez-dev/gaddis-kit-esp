// src/semantic/scopes/Scope.js


import { SymbolTable } from "../symbols/SymbolTable.js";



export class Scope {


    /**
     * Representa un ámbito léxico.
     *
     * Cada scope posee:
     *
     * - tabla de símbolos propia.
     * - referencia al scope padre.
     *
     * Jerarquía:
     *
     * Global
     *    |
     * Function
     *    |
     * Block
     *
     *
     * @param {Object} options
     * @param {Scope|null} options.parent
     * @param {string} options.type
     */
    constructor({
        parent = null,
        type = "Block"
    } = {}) {


        this.parent = parent;


        this.type = type;


        this.symbolTable =
            new SymbolTable();

    }







    /**
     * Agrega un símbolo al scope actual.
     *
     * No valida reglas semánticas.
     *
     * @param {Symbol} symbol
     */
    define(symbol) {


        if (!symbol) {

            throw new Error(
                "No se puede agregar un símbolo vacío."
            );

        }


        this.symbolTable.add(symbol);

    }








    /**
     * Busca únicamente dentro
     * del scope actual.
     *
     * @param {string} name
     * @returns {Symbol|null}
     */
    resolveLocal(name) {


        if (!name) {

            return null;

        }


        return this.symbolTable.lookup(
            name
        );

    }








    /**
     * Alias compatible.
     *
     * Algunos componentes pueden
     * utilizar lookup como API
     * de búsqueda local.
     *
     * @param {string} name
     * @returns {Symbol|null}
     */
    lookup(name) {


        return this.resolveLocal(
            name
        );

    }








    /**
     * Busca recorriendo scopes superiores.
     *
     * @param {string} name
     * @returns {Symbol|null}
     */
    resolve(name) {


        let current =
            this;



        while (current !== null) {


            const symbol =
                current.resolveLocal(name);



            if (symbol !== null) {

                return symbol;

            }


            current =
                current.parent;

        }


        return null;

    }








    /**
     * Indica si existe un símbolo
     * dentro del scope actual.
     *
     * Uso:
     *
     * Declarar Entero edad
     * Declarar Real edad
     *
     *
     * @param {string} name
     * @returns {boolean}
     */
    existsLocal(name) {


        return this.symbolTable.contains(
            name
        );

    }








    /**
     * Alias semántico de existsLocal.
     *
     * Se mantiene por compatibilidad.
     *
     * @param {string} name
     * @returns {boolean}
     */
    contains(name) {


        return this.existsLocal(
            name
        );

    }








    /**
     * Determina si un identificador
     * existe en un scope superior.
     *
     * Utilizado para evitar shadowing.
     *
     * @param {string} name
     * @returns {boolean}
     */
    existsInParent(name) {


        let current =
            this.parent;



        while (current !== null) {


            if (
                current.existsLocal(name)
            ) {

                return true;

            }


            current =
                current.parent;

        }


        return false;

    }








    /**
     * Obtiene símbolos locales.
     *
     * @returns {Array<Symbol>}
     */
    getSymbols() {


        return this.symbolTable.getAll();

    }








    /**
     * Determina si es global.
     *
     * @returns {boolean}
     */
    isGlobal() {


        return this.parent === null;

    }








    /**
     * Determina si pertenece
     * a una función.
     *
     * @returns {boolean}
     */
    isFunctionScope() {


        return this.type === "Function";

    }








    /**
     * Determina si pertenece
     * a un procedimiento.
     *
     * @returns {boolean}
     */
    isProcedureScope() {


        return this.type === "Procedure";

    }


}