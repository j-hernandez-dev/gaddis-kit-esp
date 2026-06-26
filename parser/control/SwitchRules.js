// switchRules.js

import * as Tokens from "../../lexer/tokens/Index.js";

/**
 * ==================================
 * CASE
 * ==================================
 *
 * caso ::=
 *     "Caso"
 *     expresion
 *     ":"
 *
 *     bloque ;
 */

/**
 * ==================================
 * DEFAULT
 * ==================================
 *
 * defecto ::=
 *     "Defecto"
 *     ":"
 *
 *     bloque ;
 */

/**
 * ==================================
 * SWITCH
 * ==================================
 *
 * switch_stmt ::=
 *     "Seleccionar"
 *     expresion
 *
 *     caso
 *     { caso }
 *
 *     [ defecto ]
 *
 *     "Fin"
 *     "Seleccionar" ;
 * 
 */

/**
 * @param {any} parser
 */
export function registerSwitchRules(parser) {

  parser.RULE("caseClause", () => {

    parser.CONSUME(Tokens.Case);

    parser.SUBRULE(parser.expression);

    parser.CONSUME(Tokens.Colon);

    parser.SUBRULE(parser.block);

  });

  parser.RULE("defaultClause", () => {

    parser.CONSUME(Tokens.Default);

    parser.CONSUME(Tokens.Colon);

    parser.SUBRULE(parser.block);

  });

  parser.RULE("switchStatement", () => {

    parser.CONSUME(Tokens.Switch);

    parser.SUBRULE(parser.expression);

    parser.AT_LEAST_ONE(() => {
      parser.SUBRULE(parser.caseClause);
    });

    parser.OPTION(() => {
      parser.SUBRULE(parser.defaultClause);
    });

    parser.CONSUME(Tokens.End);

    parser.CONSUME2(Tokens.Switch);

  });

}