// primary.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * PRIMARIO
 * ==================================
 *
 * primario ::=
 *       numero
 *     | cadena
 *     | logico
 *     | nulo
 *     | llamada_funcion
 *     | acceso
 *     | "(" expresion ")" ;
 * 
 * 
 */

/**
 * @param {any} parser
 */
export function registerPrimaryRules(parser) {

  parser.RULE("primary", () => {

    parser.OR([

      /**
       * numero
       */
      {
        ALT: () => {
          parser.OR1([
            { ALT: () => parser.CONSUME(Tokens.ScientificLiteral) },
            { ALT: () => parser.CONSUME(Tokens.FloatLiteral) },
            { ALT: () => parser.CONSUME(Tokens.IntegerLiteral) }
          ]);
        }
      },

      /**
       * cadena
       */
      {
        ALT: () => {
          parser.CONSUME(Tokens.StringLiteral);
        }
      },

      /**
       * logico
       */
      {
        ALT: () => {
          parser.OR2([
            { ALT: () => parser.CONSUME(Tokens.TrueLiteral) },
            { ALT: () => parser.CONSUME(Tokens.FalseLiteral) }
          ]);
        }
      },

      /**
       * nulo
       */
      {
        ALT: () => {
          parser.CONSUME(Tokens.NullLiteral);
        }
      },

      /**
       * llamada_funcion
       *
       * Debe ir antes que Identifier.
       */
      {
        ALT: () => {
          parser.SUBRULE(parser.functionCall);
        }
      },

      /**
       * identificador
       */
      {
        ALT: () => {
          parser.CONSUME(Tokens.Identifier);
        }
      },

      /**
       * "(" expresion ")"
       */
      {
        ALT: () => {
          parser.CONSUME(Tokens.LParen);
          parser.SUBRULE(parser.expression);
          parser.CONSUME(Tokens.RParen);
        }
      }

    ]);

  });

}