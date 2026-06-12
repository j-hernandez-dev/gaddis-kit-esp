// variableDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * DECLARACIÓN DE VARIABLES
 * ==================================
 *
 * variable_declaracion ::=
 *     "Declarar"
 *     identificador
 *     { "," identificador }
 *     "Como"
 *     tipo ;
 */

/**
 * @param {any} parser
 */
export function registerVariableDeclarationRules(parser) {

  parser.RULE("variableDeclaration", () => {

    parser.CONSUME(Tokens.Declare);

    // Primer identificador obligatorio
    parser.CONSUME(Tokens.Identifier);

    // Identificadores adicionales
    parser.MANY(() => {

      parser.CONSUME(Tokens.Comma);

      parser.CONSUME2(Tokens.Identifier);

    });

    parser.CONSUME(Tokens.As);

    parser.SUBRULE(parser.type);

  });

}