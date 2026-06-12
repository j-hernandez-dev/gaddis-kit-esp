// elseClause.js

import * as Tokens from "../../../lexer/tokens/index.js";

/**
 * ==================================
 * ELSE
 * ==================================
 *
 * else ::=
 *     "Sino"
 *
 *     bloque ;
 */

/**
 * @param {any} parser
 */
export function registerElseRules(parser) {

  parser.RULE("elseClause", () => {

    parser.CONSUME(Tokens.Else);

    parser.SUBRULE(parser.block);

  });

}