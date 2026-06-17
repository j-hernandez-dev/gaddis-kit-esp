// constantDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";
import { consumeAssignment } from "../config/assignmentRules.js";

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

    consumeAssignment(parser);

    parser.SUBRULE(parser.expression);

  });

}