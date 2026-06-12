import * as Tokens from "../../lexer/tokens/index.js";

/**
 * postfixExpression ::=
 *     primary
 *     { "[" expression "]" } ;
 */

/**
 * @param {any} parser
 */
export function registerAccessRules(parser) {

  parser.RULE("access", () => {

    parser.SUBRULE(parser.primary);

    parser.MANY(() => {

      parser.CONSUME(Tokens.LBracket);
      parser.SUBRULE(parser.expression);
      parser.CONSUME(Tokens.RBracket);

    });

  });

}