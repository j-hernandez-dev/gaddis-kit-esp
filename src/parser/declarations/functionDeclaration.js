// functionDeclaration.js

import * as Tokens from "../../lexer/tokens/index.js";

/**
 * ==================================
 * FUNCIÓN
 * ==================================
 *
 * funcion ::=
 *     "Funcion"
 *      tipo
 *      identificador
 *      "(" [ parametros ] ")"
 *      bloque
 *      "Fin" "Funcion"
 *     ;
 */

/**
 * @param {any} parser
 */
export function registerFunctionDeclarationRules(parser) {
    parser.RULE("functionDeclaration", () => {
        parser.CONSUME(Tokens.Function);

        parser.SUBRULE(parser.type);
        
        // Nombre de la función
        parser.CONSUME(Tokens.Identifier);

        parser.CONSUME(Tokens.LParen);

        parser.OPTION(() => {
            parser.SUBRULE(parser.parameterList);
        });

        parser.CONSUME(Tokens.RParen);

        // Cuerpo de la función
        parser.SUBRULE(parser.block);

        parser.CONSUME(Tokens.End);
        parser.CONSUME2(Tokens.Function);
    });
}