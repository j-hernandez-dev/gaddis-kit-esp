// statementRules.js

/**
 * ==================================
 * INSTRUCCION
 * ==================================
 *
 * instruccion ::=
 *     | constante_declaracion
 *     | variable_declaracion
 *     | asignacion
 *     | entrada
 *     | salida
 *     | if_stmt
 *     | while_stmt
 *     | for_stmt
 *     | switch_stmt
 *     | funcion
 *     | procedimiento
 *     | llamada_procedimiento ;
 */

/**
 * @param {any} parser
 */
export function registerStatementRules(parser) {

  parser.RULE("statement", () => {

    parser.OR([

      /**
       * Declaraciones
       */
      {
        ALT: () => parser.SUBRULE(parser.constantDeclaration)
      },
      {
        ALT: () => parser.SUBRULE(parser.variableDeclaration)
      },

      /**
       * Funciones y procedimientos
       */
      {
        ALT: () => parser.SUBRULE(parser.functionDeclaration)
      },
      {
        ALT: () => parser.SUBRULE(parser.procedureDeclaration)
      },

      /**
       * Control de flujo
       */
      {
        ALT: () => parser.SUBRULE(parser.ifStatement)
      },
      {
        ALT: () => parser.SUBRULE(parser.whileStatement)
      },
      {
        ALT: () => parser.SUBRULE(parser.forStatement)
      },
      {
        ALT: () => parser.SUBRULE(parser.switchStatement)
      },

      /**
       * Entrada / salida
       */
      {
        ALT: () => parser.SUBRULE(parser.readStatement)
      },
      {
        ALT: () => parser.SUBRULE(parser.writeStatement)
      },

      /**
       * Retornar
       */
      {
        ALT: () => parser.SUBRULE(parser.returnStatement)
      },

      /**
       * Llamadas
       */
      {
        ALT: () => parser.SUBRULE(parser.procedureCall)
      },

      /**
       * Asignación
       *
       * Se deja al final porque comienza
       * con Identifier y suele ser la regla
       * más genérica.
       */
      {
        ALT: () => parser.SUBRULE(parser.assignmentStatement)
      }

    ]);

  });

}