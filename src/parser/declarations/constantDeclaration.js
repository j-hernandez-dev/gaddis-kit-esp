// constantDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * DECLARACIÓN DE CONSTANTES
 * ==================================
 *
 * constante_declaracion ::=
 * "Declarar"
 * "Constante"
 * identificador
 * "="
 * expresion ;
 */

/**
 * @param {any} parser
 */
export function registerConstantDeclarationRules(parser) {

  parser.RULE("constantDeclaration", () => {

    parser.CONSUME(Tokens.Declare);

    parser.CONSUME(Tokens.Constant);

    parser.CONSUME(Tokens.Identifier);

    parser.CONSUME(Tokens.Equal);

    parser.SUBRULE(parser.expression);

  });

}