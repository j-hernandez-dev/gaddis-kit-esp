// parameterRules.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * parametros_lista ::=
 *     parametro
 *     { "," parametro } ;
 *
 * parametro ::=
 *     identificador
 *     dimensiones_opc
 *     tipo ;
 * 
 * dimensiones_opc ::=
 *     dimensiones
 *     | ε ;
 */

/**
 * @param {any} parser
 */
export function registerParameterRules(parser) {

  /**
   * parametro ::=
   *     identificador
   *     dimensiones_opc
   *     tipo ;
   */
  parser.RULE("parameter", () => {

    parser.CONSUME(Tokens.Identifier);

    parser.OPTION(() => {
      parser.SUBRULE(parser.dimensionList);
    });

    parser.SUBRULE(parser.type);

  });

  /**
   * parametros_lista ::=
   *     parametro
   *     { "," parametro } ;
   */
  parser.RULE("parameterList", () => {

    parser.SUBRULE(parser.parameter);

    parser.MANY(() => {

      parser.CONSUME(Tokens.Comma);

      parser.SUBRULE2(parser.parameter);

    });

  });

}