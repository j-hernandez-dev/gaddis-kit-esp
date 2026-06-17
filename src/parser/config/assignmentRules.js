import * as Tokens from "../../lexer/tokens/index.js";
import { ParserConfig, AssignmentMode } from "../../lexer/config/assignmentMode.js";

/**
 * @param {any} parser
 */
export function consumeAssignment(parser){

    switch(ParserConfig.assignmentMode){

        case AssignmentMode.ARROW:
            parser.CONSUME(Tokens.Assignment);
            break;

        case AssignmentMode.EQUAL:
            parser.CONSUME(Tokens.Equal);
            break;
    }
}