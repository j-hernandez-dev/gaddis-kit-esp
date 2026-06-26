// src/semantic/validators/ControlFlowValidator.js


import { SemanticError } from "../../errors/SemanticError.js";
import { ComparisonRules } from "../rules/ComparisonRules.js";


export class ControlFlowValidator {


    /**
     * @param {SemanticContext} context
     */
    constructor(context) {

        this.context = context;

        this.expressionValidator =
            context.expressionValidator;

        this.assignmentValidator =
            context.assignmentValidator;

    }





    /**
     * Punto de entrada.
     */
    validate(node) {


        if (!node) {
            return;
        }


        switch(node.type) {


            case "IfStatement":

                this.validateIf(node);
                break;



            case "WhileStatement":

                this.validateWhile(node);
                break;



            case "ForStatement":

                this.validateFor(node);
                break;



            case "SwitchStatement":

                this.validateSwitch(node);
                break;

        }

    }






    /**
     * If / ElseIf / Else
     */
    validateIf(node) {


        this.validateCondition(
            node.condition
        );



        this.validateBlock(
            node.thenBlock
        );



        if (
            Array.isArray(node.elseIfBranches)
        ) {


            for(
                const branch of node.elseIfBranches
            ) {


                this.validateCondition(
                    branch.condition
                );


                this.validateBlock(
                    branch.block
                );

            }

        }




        if(node.elseBlock) {

            this.validateBlock(
                node.elseBlock
            );

        }

    }







    /**
     * While
     */
    validateWhile(node) {


        this.validateCondition(
            node.condition
        );


        this.validateBlock(
            node.body
        );

    }







    /**
     * For
     *
     * La variable utilizada debe
     * comportarse como cualquier
     * otra asignación.
     */
    validateFor(node) {


        if(node.initializer) {


            this.assignmentValidator
                .validate(
                    node.initializer
                );

        }




        this.validateCondition(
            node.condition
        );




        if(node.increment) {


            this.assignmentValidator
                .validate(
                    node.increment
                );

        }




        this.validateBlock(
            node.body
        );

    }









    /**
     * Select Case
     */
    validateSwitch(node) {


        const switchType =
            this.expressionValidator
                .validate(
                    node.expression
                );



        /*
         * No se permiten booleanos
         * como selector.
         */
        if(
            switchType === "Boolean"
        ) {


            throw new SemanticError(

                "Seleccionar no puede utilizar valores Logicos.",

                node.location

            );

        }





        const cases = new Set();



        for(
            const caseNode of node.cases
        ) {



            const caseType =
                this.expressionValidator
                    .validate(
                        caseNode.value
                    );



            if(
                !ComparisonRules.isComparable(
                    switchType,
                    caseType,
                    "="
                )
            ) {


                throw new SemanticError(

                    `El tipo del Caso '${caseType}' no es compatible con '${switchType}'.`,

                    caseNode.location

                );

            }





            const key =
                `${caseType}:${JSON.stringify(caseNode.value.value)}`;



            if(
                cases.has(key)
            ) {


                throw new SemanticError(

                    "No pueden existir Casos repetidos.",

                    caseNode.location

                );

            }



            cases.add(key);



            this.validateBlock(
                caseNode.body
            );

        }






        if(
            node.defaultCase
        ) {


            this.validateBlock(
                node.defaultCase.body
            );

        }

    }









    /**
     * Toda condición debe ser Boolean.
     */
    validateCondition(expression) {


        const type =
            this.expressionValidator
                .validate(
                    expression
                );



        if(
            type !== "Boolean"
        ) {


            throw new SemanticError(

                "La condición debe ser de tipo Boolean.",

                expression.location

            );

        }

    }









    /**
     * Valida un bloque.
     */
    validateBlock(block) {


        if(!block) {
            return;
        }



        for(
            const statement of block.statements
        ) {


            this.validate(
                statement
            );

        }

    }


}