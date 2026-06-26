// parser.js

import { CstParser } from "chevrotain";

import { TOKEN_VOCABULARY } from "../lexer/TokenVocabulary.js";

/**
 * Core
 */
import { registerProgramRules } from "./core/ProgramRules.js";
import { registerStatementRules } from "./core/StatementRules.js";
import { registerBlockRules } from "./core/BlockRules.js";

/**
 * Expressions
 */
import { registerPrimaryRules } from "./expressions/Primary.js";
import { registerAccessRules } from "./expressions/Access.js";
import { registerPowerRules } from "./expressions/Power.js";
import { registerUnaryRules } from "./expressions/Unary.js";
import { registerMultiplicativeRules } from "./expressions/Multiplicative.js";
import { registerAdditiveRules } from "./expressions/Additive.js";
import { registerComparisonRules } from "./expressions/Comparison.js";
import { registerLogicalRules } from "./expressions/Logical.js";
import { registerExpressionRules } from "./expressions/Expression.js";

/**
 * Types
 */
import { registerTypeRules } from "./types/TypeRules.js";

/**
 * Declarations
 */
import { registerParameterRules } from "./declarations/ParameterRules.js";
import { registerConstantDeclarationRules } from "./declarations/ConstantDeclaration.js";
import { registerVariableDeclarationRules } from "./declarations/VariableDeclaration.js";
import { registerDeclarationItemRules } from "./declarations/DeclarationItem.js";
import { registerFunctionDeclarationRules } from "./declarations/FunctionDeclaration.js";
import { registerProcedureDeclarationRules } from "./declarations/ProcedureDeclaration.js";

/**
 * Calls
 */
import { registerFunctionCallRules } from "./calls/FunctionCall.js";
import { registerProcedureCallRules } from "./calls/ProcedureCall.js";

/**
 * Statements
 */
import { registerAssignmentRules } from "./statements/AssignmentStatement.js";
import { registerReturnRules } from "./statements/ReturnStatement.js";

/**
 * I/O
 */
import { registerReadRules } from "./io/ReadStatement.js";
import { registerWriteRules } from "./io/WriteStatement.js";

/**
 * Control
 */
import { registerIfRules } from "./control/if/IfStatement.js";
import { registerElseIfRules } from "./control/if/ElseIfClause.js";
import { registerElseRules } from "./control/if/ElseClause.js";

import { registerWhileRules } from "./control/WhileRules.js";
import { registerForRules } from "./control/ForRules.js";
import { registerSwitchRules } from "./control/SwitchRules.js";

export class GaddisParser extends CstParser {
  /**
   * @param {any} inputCode
   */
  parse(inputCode) {
    throw new Error("Method not implemented.");
  }

  constructor() {

    super(TOKEN_VOCABULARY);

    /**
     * ==================================
     * EXPRESSIONS
     * ==================================
     */

    registerFunctionCallRules(this);

    registerPrimaryRules(this);
    registerAccessRules(this);
    registerPowerRules(this);
    registerUnaryRules(this);
    registerMultiplicativeRules(this);
    registerAdditiveRules(this);
    registerComparisonRules(this);
    registerLogicalRules(this);
    registerExpressionRules(this);

    /**
     * ==================================
     * TYPES
     * ==================================
     */

    registerTypeRules(this);

    /**
     * ==================================
     * DECLARATIONS
     * ==================================
     */

    registerParameterRules(this);

    registerConstantDeclarationRules(this);
    registerDeclarationItemRules(this);
    registerVariableDeclarationRules(this);
    registerFunctionDeclarationRules(this);
    registerProcedureDeclarationRules(this);

    /**
     * ==================================
     * CALLS
     * ==================================
     */

    registerProcedureCallRules(this);

    /**
     * ==================================
     * STATEMENTS
     * ==================================
     */

    registerAssignmentRules(this);
    registerReturnRules(this);

    /**
     * ==================================
     * IO
     * ==================================
     */

    registerReadRules(this);
    registerWriteRules(this);

    /**
     * ==================================
     * CONTROL FLOW
     * ==================================
     */

    registerElseRules(this);
    registerElseIfRules(this);
    registerIfRules(this);

    registerWhileRules(this);
    registerForRules(this);
    registerSwitchRules(this);

    /**
     * ==================================
     * CORE
     * ==================================
     */

    registerStatementRules(this);
    registerBlockRules(this);
    registerProgramRules(this);

    /**
     * ==================================
     * CHEVROTAIN
     * ==================================
     */

    this.performSelfAnalysis();
  }

}

export const parser = new GaddisParser();