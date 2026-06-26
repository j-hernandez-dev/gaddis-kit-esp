// procedureCall.js

import * as Tokens from "../../lexer/tokens/Index.js";

/**
 * ==================================
 * LLAMADA A PROCEDIMIENTO
 * ==================================
 *
 * llamada_procedimiento ::=
 *     "Llamar"
 *     identificador
 *     "("
 *     [ argumentos ]
 *     ")" ;
 */

/**
 * @param {any} parser
 */
export function registerProcedureCallRules(parser) {

  parser.RULE("procedureCall", () => {

    parser.CONSUME(Tokens.Call);

    parser.CONSUME(Tokens.Identifier);

    parser.CONSUME(Tokens.LParen);

    parser.OPTION(() => {
      parser.SUBRULE(parser.argumentsList);
    });

    parser.CONSUME(Tokens.RParen);

  });

}