// procedureDeclaration.js

import * as Tokens from "../../lexer/tokens/Index.js";

/**
 * ==================================
 * PROCEDIMIENTO
 * ==================================
 *
 * procedimiento ::=
 *     "Procedimiento"
 *     identificador
 *     "("
 *     [ parametros ]
 *     ")"
 *
 *     bloque
 *
 *     "Fin"
 *     "Procedimiento" ;
 */

/**
 * @param {any} parser
 */
export function registerProcedureDeclarationRules(parser) {

  parser.RULE("procedureDeclaration", () => {

    parser.CONSUME(Tokens.Procedure);

    parser.CONSUME(Tokens.Identifier);

    parser.CONSUME(Tokens.LParen);

    parser.OPTION(() => {
      parser.SUBRULE(parser.parameterList);
    });

    parser.CONSUME(Tokens.RParen);

    parser.SUBRULE(parser.block);

    parser.CONSUME(Tokens.End);

    parser.CONSUME2(Tokens.Procedure);

  });

}