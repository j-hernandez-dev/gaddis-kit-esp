// declarationItem.js

import * as Tokens from "../../lexer/tokens/Index.js";


/**
 * ==================================
 * DECLARATION ITEM
 * ==================================
 *
 * declarationItem ::=
 *
 *     identificador
 *     dimensiones_opc
 *
 *
 * dimensiones_opc ::=
 *
 *     dimensionList
 *     | ε
 *
 */


/**
 * @param {any} parser
 */
export function registerDeclarationItemRules(parser) {

    parser.RULE("declarationItem", () => {

        parser.CONSUME(Tokens.Identifier);

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