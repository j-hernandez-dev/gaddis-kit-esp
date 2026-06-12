// forRules.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * FOR
 * ==================================
 *
 * for_stmt ::=
 *     "Para"
 *     identificador
 *     "<-"
 *     expresion
 *
 *     "Hasta"
 *     expresion
 *
 *     [ "Paso" expresion ]
 *
 *     bloque
 *
 *     "Fin"
 *     "Para" ;
 */

/**
 * @param {any} parser
 */
export function registerForRules(parser) {

  parser.RULE("forStatement", () => {

    parser.CONSUME(Tokens.For);

    parser.CONSUME(Tokens.Identifier);

    parser.CONSUME(Tokens.Assignment);

    parser.SUBRULE(parser.expression);

    parser.CONSUME(Tokens.To);

    parser.SUBRULE2(parser.expression);

    parser.OPTION(() => {

      parser.CONSUME(Tokens.Step);

      parser.SUBRULE3(parser.expression);

    });

    parser.SUBRULE(parser.block);

    parser.CONSUME(Tokens.End);

    parser.CONSUME2(Tokens.For);

  });

}