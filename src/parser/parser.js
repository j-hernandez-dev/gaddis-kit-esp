// parser.js

import { CstParser } from "chevrotain";

import { TOKEN_VOCABULARY } from "../lexer/tokenVocabulary.js";

/**
 * Core
 */
import { registerProgramRules } from "./core/programRules.js";
import { registerStatementRules } from "./core/statementRules.js";
import { registerBlockRules } from "./core/blockRules.js";

/**
 * Expressions
 */
import { registerPrimaryRules } from "./expressions/primary.js";
import { registerAccessRules } from "./expressions/access.js";
import { registerPowerRules } from "./expressions/power.js";
import { registerMultiplicativeRules } from "./expressions/multiplicative.js";
import { registerAdditiveRules } from "./expressions/additive.js";
import { registerComparisonRules } from "./expressions/comparison.js";
import { registerLogicalRules } from "./expressions/logical.js";
import { registerExpressionRules } from "./expressions/expression.js";

/**
 * Types
 */
import { registerTypeRules } from "./types/typeRules.js";

/**
 * Declarations
 */
import { registerArrayDeclarationRules } from "./declarations/arrayDeclaration.js";
import { registerParameterRules } from "./declarations/parameterRules.js";
import { registerConstantDeclarationRules } from "./declarations/constantDeclaration.js";
import { registerVariableDeclarationRules } from "./declarations/variableDeclaration.js";
import { registerFunctionDeclarationRules } from "./declarations/functionDeclaration.js";
import { registerProcedureDeclarationRules } from "./declarations/procedureDeclaration.js";

/**
 * Calls
 */
import { registerFunctionCallRules } from "./calls/functionCall.js";
import { registerProcedureCallRules } from "./calls/procedureCall.js";

/**
 * Statements
 */
import { registerAssignmentRules } from "./statements/assignmentStatement.js";
import { registerReturnRules } from "./statements/returnStatement.js";

/**
 * I/O
 */
import { registerReadRules } from "./io/readStatement.js";
import { registerWriteRules } from "./io/writeStatement.js";

/**
 * Control
 */
import { registerIfRules } from "./control/if/ifStatement.js";
import { registerElseIfRules } from "./control/if/elseIfClause.js";
import { registerElseRules } from "./control/if/elseClause.js";

import { registerWhileRules } from "./control/whileRules.js";
import { registerForRules } from "./control/forRules.js";
import { registerSwitchRules } from "./control/switchRules.js";

export class GaddisParser extends CstParser {

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

    registerArrayDeclarationRules(this);
    registerConstantDeclarationRules(this);
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