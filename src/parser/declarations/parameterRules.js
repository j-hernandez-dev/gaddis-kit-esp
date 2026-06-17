// parameterRules.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * parametros_lista ::=
 *     parametro
 *     { "," parametro } ;
 *
 * parametro ::=
 *     tipo
 *     identificador
 *     dimensiones_opc ;
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
   *     tipo
   *     identificador
   *     dimensiones_opc ;
   */
  parser.RULE("parameter", () => {

    parser.SUBRULE(parser.type);

    parser.CONSUME(Tokens.Identifier);

    parser.OPTION(() => {
      parser.SUBRULE(parser.dimensionList);
    });
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