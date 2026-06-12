// returnStatement.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * RETORNO
 * ==================================
 *
 * retorno ::=
 *     "Retornar"
 *     expresion ;
 */

/**
 * @param {any} parser
 */
export function registerReturnRules(parser) {

  parser.RULE("returnStatement", () => {

    parser.CONSUME(Tokens.Return);

    parser.SUBRULE(parser.expression);

  });

}