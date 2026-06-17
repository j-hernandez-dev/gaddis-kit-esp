// assignmentStatement.js

import * as Tokens from "../../lexer/tokens/index.js";
import { consumeAssignment } from "../config/assignmentRules.js";

/**
 * ==================================
 * ASIGNACIÓN
 * ==================================
 *
 * asignacion ::=
 *     L_valor
 *     "<-"
 *      expresion ;
 * 
 * L_valor ::=
 *     identificador
 *     { "[" expresion "]" } ;
 */

/**
 * @param {any} parser
 */
export function registerAssignmentRules(parser) {

  parser.RULE("assignmentStatement", () => {

    parser.SUBRULE(parser.LValue);

    consumeAssignment(parser);

    parser.SUBRULE(parser.expression);

  });

  parser.RULE("LValue", () => {

    parser.CONSUME(Tokens.Identifier);

    parser.MANY(() => {
      parser.CONSUME(Tokens.LBracket);
      parser.SUBRULE(parser.expression);
      parser.CONSUME(Tokens.RBracket);
    });

  });
}