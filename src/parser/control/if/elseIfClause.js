// elseIfClause.js

import * as Tokens from "../../../lexer/tokens/index.js";

/**
 * ==================================
 * ELSE IF
 * ==================================
 *
 * else_if ::=
 *     "Sino"
 *     "Si"
 *     expresion
 *     "Entonces"
 *
 *     bloque ;
 */

/**
 * @param {any} parser
 */
export function registerElseIfRules(parser) {

  parser.RULE("elseIfClause", () => {

    parser.CONSUME(Tokens.Else);

    parser.CONSUME(Tokens.If);

    parser.SUBRULE(parser.expression);

    parser.CONSUME(Tokens.Then);

    parser.SUBRULE(parser.block);

  });

}