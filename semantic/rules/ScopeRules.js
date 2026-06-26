/**
 * Reglas semánticas relacionadas con scopes.
 *
 * Responsabilidades:
 * - Validar creación de ámbitos.
 * - Validar acceso entre ámbitos.
 * - Evitar shadowing.
 * - Validar visibilidad.
 *
 * No administra scopes.
 * Esa responsabilidad pertenece a ScopeManager.
 */


export class ScopeRules {


    /**
     * Verifica si un nuevo scope puede ser creado.
     *
     * Ejemplos:
     *
     * Mientras
     * Si
     * Para
     * Funcion
     * Procedimiento
     *
     * todos generan scopes válidos.
     *
     * @param {Scope|null} parentScope
     */
    static canCreateScope(parentScope) {

        return parentScope !== undefined;

    }



    /**
     * Verifica si un identificador puede declararse
     * en un scope determinado.
     *
     * Reglas:
     *
     * 1. No debe existir en el mismo scope.
     * 2. No debe existir en scopes superiores
     *    porque el lenguaje no permite shadowing.
     *
     * Ejemplo inválido:
     *
     * Declarar Entero x
     *
     * Mientras condicion
     *
     *     Declarar Real x
     *
     * Fin Mientras
     *
     * @param {string} name
     * @param {Scope} scope
     */
    static canDeclare(name, scope) {


        if (!scope)
            return false;



        /*
            Mismo scope
        */

        if (scope.containsLocal(name))
            return false;



        /*
            Shadowing:
            Buscar en scopes padres.
        */

        let parent = scope.parent;


        while (parent) {


            if (parent.containsLocal(name))
                return false;


            parent = parent.parent;

        }


        return true;

    }



    /**
     * Verifica si un símbolo puede ser visible
     * desde un scope.
     *
     * Ejemplo:
     *
     * Declarar Entero edad
     *
     * Si condicion
     *
     *     Escribir edad
     *
     * Fin Si
     *
     * Correcto.
     *
     * @param {Symbol} symbol
     * @param {Scope} currentScope
     */
    static isVisible(symbol, currentScope) {


        if (!symbol || !currentScope)
            return false;



        let scope = currentScope;


        while (scope) {


            if (scope.containsSymbol(symbol.name))
                return true;


            scope = scope.parent;

        }


        return false;

    }



    /**
     * Verifica si un identificador está fuera
     * de alcance.
     *
     * Ejemplo:
     *
     * Mientras x < 10
     *
     *     Declarar Entero temporal
     *
     * Fin Mientras
     *
     * Escribir temporal
     *
     * Error.
     *
     * @param {string} name
     * @param {Scope} currentScope
     */
    static isOutOfScope(name, currentScope) {


        if (!currentScope)
            return true;


        return currentScope.resolve(name) === null;

    }



    /**
     * Determina si un scope puede acceder
     * a otro scope.
     *
     * El lenguaje utiliza scope léxico:
     *
     * Padre -> hijo permitido
     * Hijo -> padre permitido
     *
     * Hermano -> hermano prohibido
     *
     * @param {Scope} from
     * @param {Scope} target
     */
    static canAccess(from, target) {


        if (!from || !target)
            return false;



        let current = from;


        while (current) {


            if (current === target)
                return true;


            current = current.parent;

        }


        return false;

    }



    /**
     * Valida cierre correcto de un scope.
     *
     * Útil para evitar inconsistencias
     * durante el análisis.
     *
     * @param {Scope} scope
     */
    static canExitScope(scope) {

        return scope !== null;

    }



    /**
     * Determina si un bloque requiere
     * creación de scope.
     *
     * Según las especificaciones:
     *
     * - Mientras      Sí
     * - Para          Sí
     * - Si            Sí
     * - Funcion       Sí
     * - Procedimiento Sí
     *
     * @param {string} nodeType
     */
    static createsScope(nodeType) {


        const scopedNodes = [

            "WhileStatement",
            "ForStatement",
            "IfStatement",
            "FunctionDeclaration",
            "ProcedureDeclaration"

        ];


        return scopedNodes.includes(nodeType);

    }

}