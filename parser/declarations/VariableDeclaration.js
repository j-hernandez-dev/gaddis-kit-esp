// variableDeclaration.js

import * as Tokens from "../../lexer/tokens/Index.js";

/**
 * ==================================
 * DECLARACIÓN DE VARIABLES
 * ==================================
 *
 * variable_declaracion ::=
 *     "Declarar"
 *     tipo
 *     declarationItem
 *     { "," declarationItem }
 *
 */


/**
 * @param {any} parser
 */
export function registerVariableDeclarationRules(parser) {


  parser.RULE("variableDeclaration", () => {


    parser.CONSUME(Tokens.Declare);


    parser.SUBRULE(parser.type);


    parser.SUBRULE(parser.declarationItem);


    parser.MANY(() => {

      parser.CONSUME(Tokens.Comma);

      parser.SUBRULE2(parser.declarationItem);

    });


  });


}