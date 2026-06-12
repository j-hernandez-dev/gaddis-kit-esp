// functionDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * FUNCIÓN
 * ==================================
 *
 * funcion ::=
 *     "Funcion"
 *     identificador
 *     "("
 *     [ parametros ]
 *     ")"
 * 
 *     bloque
 *
 *     retornar
 *
 *     "Fin"
 *     "Funcion" ;
 */

/**
 * @param {any} parser
 */
export function registerFunctionDeclarationRules(parser) {

  parser.RULE("functionDeclaration", () => {

    parser.CONSUME(Tokens.Function);

    parser.CONSUME(Tokens.Identifier);

    parser.CONSUME(Tokens.LParen);

    parser.OPTION(() => {
      parser.SUBRULE(parser.parameterList);
    });

    parser.CONSUME(Tokens.RParen);

    parser.SUBRULE(parser.block);

    parser.SUBRULE(parser.returnStatement);

    parser.CONSUME(Tokens.End);

    parser.CONSUME2(Tokens.Function);

  });

}