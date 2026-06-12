// arrayDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * DECLARACIÓN DE ARREGLOS
 * ==================================
 *
 * arreglo_declaracion ::=
 *     "Declarar"
 *     identificador
 *     dimensiones
 *     "Como"
 *     tipo ;
 *
 * dimensiones ::=
 *     "[" expresion "]"
 *     { "[" expresion "]" } ;
 */

/**
 * @param {any} parser
 */
export function registerArrayDeclarationRules(parser) {

  parser.RULE("arrayDeclaration", () => {

    parser.CONSUME(Tokens.Declare);

    parser.CONSUME(Tokens.Identifier);

    parser.SUBRULE(parser.dimensionList);

    parser.CONSUME(Tokens.As);

    parser.SUBRULE(parser.type);

  });

  // -------------------------

  parser.RULE("dimensionList", () => {

    parser.AT_LEAST_ONE(() => {

      parser.CONSUME(Tokens.LBracket);

      parser.SUBRULE(parser.expression);

      parser.CONSUME(Tokens.RBracket);

    });

  });

}