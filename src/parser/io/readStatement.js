// readStatement.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * ENTRADA
 * ==================================
 *
 * entrada ::=
 *     "Leer"
 *     identificador
 *     { "," identificador } ;
 */

/**
 * @param {any} parser
 */
export function registerReadRules(parser) {

  parser.RULE("readStatement", () => {

    parser.CONSUME(Tokens.Input);

    // Primer identificador obligatorio
    parser.CONSUME(Tokens.Identifier);

    // Identificadores adicionales
    parser.MANY(() => {

      parser.CONSUME(Tokens.Comma);

      parser.CONSUME2(Tokens.Identifier);

    });

  });

}