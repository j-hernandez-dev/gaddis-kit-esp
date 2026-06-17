// typeRules.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * TIPO
 * ==================================
 *
 * tipo ::=
 *       "Entero"
 *     | "Real"
 *     | "Cadena"
 *     | "Logico"
 *     | "Caracter" ;
 */

/**
 * @param {any} parser
 */
export function registerTypeRules(parser) {

  parser.RULE("type", () => {

    parser.OR([
      {
        ALT: () => parser.CONSUME(Tokens.Integer)
      },

      {
        ALT: () => parser.CONSUME(Tokens.Real)
      },

      {
        ALT: () => parser.CONSUME(Tokens.String)
      },

      {
        ALT: () => parser.CONSUME(Tokens.Logical)
      },

      {
        ALT: () => parser.CONSUME(Tokens.Character)
      }

    ]);

  });

}