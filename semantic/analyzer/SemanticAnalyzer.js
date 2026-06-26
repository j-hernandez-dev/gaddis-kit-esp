// src/semantic/analyzer/SemanticAnalyzer.js


import { SemanticContext } from "../context/SemanticContext.js";

import { DeclarationValidator } from "../validators/DeclarationValidator.js";
import { AssignmentValidator } from "../validators/AssignmentValidator.js";
import { ExpressionValidator } from "../validators/ExpressionValidator.js";
import { ArrayValidator } from "../validators/ArrayValidator.js";
import { FunctionValidator } from "../validators/FunctionValidator.js";
import { ProcedureValidator } from "../validators/ProcedureValidator.js";
import { ControlFlowValidator } from "../validators/ControlFlowValidator.js";
import { CallValidator } from "../validators/CallValidator.js";
import { ReturnValidator } from "../validators/ReturnValidator.js";

import { SemanticError } from "../../errors/SemanticError.js";



export class SemanticAnalyzer {


    constructor() {


        this.context =
            new SemanticContext();


        /*
         * Orden importante:
         *
         * ExpressionValidator
         * no depende de otros validators.
         *
         * Los demás pueden depender
         * de ExpressionValidator.
         */
        this.expressionValidator =
            new ExpressionValidator(
                this.context
            );


        this.context.expressionValidator =
            this.expressionValidator;





        this.declarationValidator =
            new DeclarationValidator(
                this.context
            );


        this.context.declarationValidator =
            this.declarationValidator;





        this.assignmentValidator =
            new AssignmentValidator(
                this.context
            );


        this.context.assignmentValidator =
            this.assignmentValidator;





        this.arrayValidator =
            new ArrayValidator(
                this.context
            );


        this.context.arrayValidator =
            this.arrayValidator;





        this.functionValidator =
            new FunctionValidator(
                this.context
            );


        this.context.functionValidator =
            this.functionValidator;





        this.procedureValidator =
            new ProcedureValidator(
                this.context
            );


        this.context.procedureValidator =
            this.procedureValidator;





        this.callValidator =
            new CallValidator(
                this.context
            );


        this.context.callValidator =
            this.callValidator;





        this.controlFlowValidator =
            new ControlFlowValidator(
                this.context
            );


        this.context.controlFlowValidator =
            this.controlFlowValidator;





        this.returnValidator =
            new ReturnValidator(
                this.context
            );


        this.context.returnValidator =
            this.returnValidator;





        /*
         * Registro local de acceso rápido.
         */
        this.validators = {

            Declaration:
                this.declarationValidator,

            Assignment:
                this.assignmentValidator,

            Expression:
                this.expressionValidator,

            Array:
                this.arrayValidator,

            Function:
                this.functionValidator,

            Procedure:
                this.procedureValidator,

            Call:
                this.callValidator,

            ControlFlow:
                this.controlFlowValidator,

            Return:
                this.returnValidator

        };

    }






    /**
     * Punto de entrada del análisis semántico.
     *
     * @param {Object} ast
     *
     * @returns {SemanticContext}
     */
    analyze(ast) {


        if (!ast) {

            throw new SemanticError(
                "No existe AST para analizar."
            );

        }



        if (
            ast.type !== "Program"
        ) {

            throw new SemanticError(
                "El nodo raíz debe ser un Program."
            );

        }



        this.validateProgram(ast);


        return this.context;

    }







    /**
     * Analiza todas las sentencias.
     */
    validateProgram(node) {


        for (
            const statement of node.statements
        ) {


            this.validateStatement(
                statement
            );

        }

    }







    /**
     * Envía cada nodo al validador correspondiente.
     */
    validateStatement(node) {


        switch(node.type) {


            case "VariableDeclaration":


                this.validators.Declaration
                    .validate(node);

                break;




            case "Assignment":


                this.validators.Assignment
                    .validate(node);

                break;




            case "FunctionDeclaration":


                this.validators.Function
                    .validate(node);

                break;




            case "ProcedureDeclaration":


                this.validators.Procedure
                    .validate(node);

                break;




            case "ProcedureCall":


                this.validators.Call
                    .validateProcedureCall(node);

                break;




            case "FunctionCall":


                /*
                 * Una llamada de función
                 * solamente como sentencia.
                 *
                 * Ejemplo:
                 *
                 * Sum(5,10)
                 */
                this.validators.Expression
                    .validate(node);

                break;




            case "IfStatement":
            case "WhileStatement":
            case "ForStatement":
            case "SwitchStatement":


                this.validators.ControlFlow
                    .validate(node);

                break;




            case "ReturnStatement":


                this.validators.Return
                    .validate(node);

                break;




            default:


                throw new SemanticError(

                    `Sentencia no soportada '${node.type}'.`,

                    node.location

                );

        }

    }


}