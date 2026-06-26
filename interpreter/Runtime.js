// run.js

import { tokenize } from "../lexer/Lexer.js";
import { parser } from "../parser/Parser.js";
import { ASTBuilder } from "../ast/builders/ASTBuilder.js"
import { SemanticAnalyzer } from "../semantic/analyzer/SemanticAnalyzer.js";
import { SemanticError } from "../errors/SemanticError.js";
import { Transpiler } from "./Transpiler.js";
import { executeCodeInteractive } from "./Excecute.js";

/**
 * Tokenización
 * @param {string} sourceCode
 * @returns {import("chevrotain").IToken[]}
 */
function tokenizeCode(sourceCode) {
  const tokens = tokenize(sourceCode);

  return tokens;
}

/**
 * Análisis gramatical (CST) y Construcción (AST)
 * @param {import("chevrotain").IToken[]} tokens
 * @returns {any}
 */
function parserCode(tokens) {
  parser.input = tokens;

  const cst = (/** @type {any} */ (parser)).program();

  if (parser.errors.length > 0) {

    console.error(
      "╔═ Error Sintáctico ══════════════════════════════════════════\n"
    );
    for (const error of parser.errors) {
      console.error(error.message);

      if (error.token) {
        console.error(
          `→ Line ${error.token.startLine}, Column ${error.token.startColumn}`
        );
      }

      console.error("");
    }

    console.error(
      "══════════════════════════════════════════════════════════════"
    );

    return null;
  }

  //console.log(JSON.stringify(cst, null, 1));

  const builder = new ASTBuilder(parser);

  const ast = builder.build(cst);

  //console.log(JSON.stringify(ast, null, 5));

  return ast;
}

/**
 * Ánálisis semántico
 * @param {any} ast
 */
function semanticCode(ast) {
  const semanticAnalyzer = new SemanticAnalyzer();

  try {

    semanticAnalyzer.analyze(ast);

    return semanticAnalyzer;

  } catch (error) {

    if (error instanceof SemanticError) {

      const location = error.location;

      console.error(`
  ╔═ Error Semántico ══════════════════════════════════════════
  
  ✖ ${error.message}
  
  → Línea ${location?.startLine ?? "?"}, Columna ${location?.startColumn ?? "?"}
  
  Rango:
    Desde (${location?.startLine ?? "?"}:${location?.startColumn ?? "?"})
    Hasta  (${location?.endLine ?? "?"}:${location?.endColumn ?? "?"})
  
  ═════════════════════════════════════════════════════════════
  
  ${error.stack}
  `);
    } else {
      console.error("╔═ Error Semántico ══════════════════════════════════════════\n"
        // @ts-ignore
        + error.message
        + "\n"
        // @ts-ignore
        + error.stack
        + "\n═════════════════════════════════════════════════════════════");
    }
  }

  return null;
}

/**
 * Transpilación
 * @param {any} ast
 * @param {any} build
 */
function transpileCode(ast, build) {
  const transpiler = new Transpiler(build);

  try {

    transpiler.transpile(ast);

    return transpiler;

  } catch (error) {
    console.error("╔═ Error De Transpilación ══════════════════════════════════════════\n"
      + "\n"
      // @ts-ignore
      + error.name
      // @ts-ignore
      + error.message
      + "\n"
      // @ts-ignore
      + "Line: " + getLine(error.stack)
      + "\n"
      + "\n════════════════════════════════════════════════════════════════════");
  }

  return null;
}

/**
 * @param {string} sourceCode
 */
export function run(sourceCode) {

  const tokens = tokenizeCode(sourceCode);

  const ast = parserCode(tokens);

  // Necesita mejorarse / Aún con errores  
  //const analyzer = semanticCode(ast);

  if (ast != null) {
    const transpiler = transpileCode(ast, null);

    if (transpiler != null) {
      executeCodeInteractive(transpiler);
    }
  }
}

/**
 * @param {string} sourceCode
 * @param {any} absolutePath
 */
export function build(sourceCode, absolutePath) {
  const tokens = tokenizeCode(sourceCode);

  const ast = parserCode(tokens);

  // Necesita mejorarse / Aún con errores  
  //const analyzer = semanticCode(ast);

  if (ast != null) {
    transpileCode(ast, absolutePath);
  }
}