// variableDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * DECLARACIÓN DE VARIABLES
 * ==================================
 *
 * variable_declaracion ::=
 *     "Declarar"
 *     tipo
 *     identificador
 *     { "," identificador }
 *     ;
 */

/**
 * @param {any} parser
 */
export function registerVariableDeclarationRules(parser) {


  parser.RULE("variableDeclaration", () => {


    parser.CONSUME(Tokens.Declare);


    parser.SUBRULE(parser.type);

    // Primer identificador obligatorio
    parser.CONSUME(Tokens.Identifier);

    parser.MANY(() => {

      parser.CONSUME(Tokens.Comma);

      parser.CONSUME2(Tokens.Identifier);

    });

    parser.OPTION(() => {

      parser.SUBRULE(parser.dimensionList);

    });
  });

  parser.RULE("dimensionList", () => {

    parser.AT_LEAST_ONE(() => {

      parser.CONSUME(Tokens.LBracket);

      parser.SUBRULE(parser.expression);

      parser.CONSUME(Tokens.RBracket);

    });

  });
}