export class SymbolTable {


    constructor() {

        /**
         * Almacena símbolos por nombre.
         *
         * Ejemplo:
         *
         * {
         *    edad: Symbol,
         *    suma: Symbol
         * }
         *
         */
        this.symbols = new Map();

    }



    /**
     * Agrega un nuevo símbolo.
     *
     * No valida redeclaraciones aquí.
     * La validación pertenece a IdentifierRules /
     * DeclarationValidator.
     *
     * @param {Symbol} symbol
     */
    add(symbol) {

        this.symbols.set(
            symbol.name,
            symbol
        );

    }



    /**
     * Busca un símbolo por nombre.
     *
     * Retorna null si no existe.
     *
     * @param {string} name
     * @returns {Symbol|null}
     */
    lookup(name) {

        return this.symbols.get(name) ?? null;

    }



    /**
     * Verifica si existe un símbolo
     * con ese nombre dentro de esta tabla.
     *
     * Útil para detectar:
     *
     * Declarar Entero edad
     *
     * Declarar Real edad
     *
     * @param {string} name
     */
    contains(name) {

        return this.symbols.has(name);

    }



    /**
     * Elimina un símbolo.
     *
     * No es común en análisis semántico,
     * pero puede ser útil para herramientas
     * de análisis incremental.
     *
     * @param {string} name
     */
    remove(name) {

        this.symbols.delete(name);

    }



    /**
     * Devuelve todos los símbolos registrados.
     *
     * Útil para:
     *
     * - Debug
     * - Reportes
     * - Inspección del compilador
     */
    getAll() {

        return Array.from(
            this.symbols.values()
        );

    }



    /**
     * Cantidad de símbolos registrados.
     */
    size() {

        return this.symbols.size;

    }



    /**
     * Limpia completamente la tabla.
     */
    clear() {

        this.symbols.clear();

    }

}