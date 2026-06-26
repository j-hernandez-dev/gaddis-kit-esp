/**
 * Reglas semánticas relacionadas con identificadores.
 *
 * Responsabilidades:
 * - Validación de existencia.
 * - Validación de redeclaración.
 * - Validación de acceso.
 * - Validación de uso según SymbolKind.
 *
 * No maneja:
 * - scopes.
 * - tablas de símbolos.
 * - tipos.
 * - AST traversal.
 */


export class IdentifierRules {


    /**
     * Verifica que un identificador pueda ser declarado.
     *
     * Reglas:
     * - No puede existir otro símbolo con el mismo nombre
     *   en el mismo scope.
     *
     * @param {string} name
     * @param {Scope} scope
     * @returns {boolean}
     */
    static canDeclare(name, scope) {

        return !scope.containsLocal(name);

    }



    /**
     * Verifica que un identificador exista
     * dentro del contexto actual.
     *
     * Busca respetando scope léxico.
     *
     * @param {string} name
     * @param {Scope} scope
     * @returns {boolean}
     */
    static exists(name, scope) {

        return scope.resolve(name) !== null;

    }



    /**
     * Obtiene un símbolo asociado a un identificador.
     *
     * @param {string} name
     * @param {Scope} scope
     * @returns {Symbol|null}
     */
    static resolve(name, scope) {

        return scope.resolve(name);

    }



    /**
     * Valida que un identificador pueda utilizarse
     * como variable.
     *
     * Ejemplo:
     *
     * Declarar Entero edad
     *
     * edad <- 20
     *
     * Permitido.
     *
     * Pero:
     *
     * Funcion Entero suma()
     *
     * suma <- 10
     *
     * No permitido.
     *
     * @param {Symbol} symbol
     */
    static isVariable(symbol) {

        if (!symbol)
            return false;


        return (
            symbol.kind === "Variable" ||
            symbol.kind === "Parameter"
        );

    }



    /**
     * Valida que un identificador sea constante.
     *
     * @param {Symbol} symbol
     */
    static isConstant(symbol) {

        if (!symbol)
            return false;


        return symbol.kind === "Constant";

    }



    /**
     * Valida que un identificador sea invocable.
     *
     * Aplica para:
     * - Funciones.
     * - Procedimientos.
     *
     * @param {Symbol} symbol
     */
    static isCallable(symbol) {

        if (!symbol)
            return false;


        return (
            symbol.kind === "Function" ||
            symbol.kind === "Procedure"
        );

    }



    /**
     * Verifica que un símbolo haya sido inicializado.
     *
     * Importante para:
     *
     * Declarar Entero a
     *
     * Escribir a
     *
     * @param {Symbol} symbol
     */
    static isInitialized(symbol) {

        if (!symbol)
            return false;


        return symbol.initialized === true;

    }



    /**
     * Verifica si un símbolo puede recibir asignación.
     *
     * Las constantes no pueden modificarse.
     *
     * @param {Symbol} symbol
     */
    static canAssign(symbol) {

        if (!symbol)
            return false;


        if (symbol.kind === "Constant")
            return false;


        return (
            symbol.kind === "Variable" ||
            symbol.kind === "Parameter"
        );

    }



    /**
     * Verifica si un identificador representa un arreglo.
     *
     * @param {Symbol} symbol
     */
    static isArray(symbol) {

        if (!symbol)
            return false;


        return symbol.array === true;

    }



    /**
     * Verifica si un identificador representa
     * un parámetro.
     *
     * @param {Symbol} symbol
     */
    static isParameter(symbol) {

        if (!symbol)
            return false;


        return symbol.kind === "Parameter";

    }



    /**
     * Valida acceso a un identificador.
     *
     * Actualmente sólo valida existencia.
     *
     * Futuras extensiones:
     * - visibilidad.
     * - variables fuera de scope.
     *
     * @param {string} name
     * @param {Scope} scope
     */
    static validateAccess(name, scope) {

        return this.exists(name, scope);

    }

}