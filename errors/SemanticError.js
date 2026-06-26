// semanticError.js

import { LanguageError } from "./LanguageError.js";


export class SemanticError extends LanguageError {

    /**
     * @param {any} message
     * @param {any} location
     */
    constructor(message, location = null) {
        super(message, "[Error Semántico]", location);
    }
}