// constantDeclaration.js

import * as Tokens from "../../lexer/tokens/Index.js";

/**
 * ==================================
 * DECLARACIÓN DE CONSTANTES
 * ==================================
 *
 * constante_declaracion ::=
 * "Constante"
 * tipo
 * identificador
 * "<-"
 * expresion ;
 */

/**
 * @param {any} parser
 */
export function registerConstantDeclarationRules(parser) {

  parser.RULE("constantDeclaration", () => {

    parser.CONSUME(Tokens.Constant);

    parser.SUBRULE(parser.type);

    parser.CONSUME(Tokens.Identifier);

    parser.OR([
      {
        ALT: () => parser.CONSUME(Tokens.AssignmentArrow)
      },
      {
        ALT: () => parser.CONSUME(Tokens.AssignmentEqual)
      }
    ]);

    parser.SUBRULE(parser.expression);

  });

}