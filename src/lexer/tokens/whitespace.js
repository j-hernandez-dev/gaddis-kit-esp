import { createToken, Lexer } from "chevrotain";

/**
 * =========================
 * WHITESPACE
 * =========================
 * Espacios, tabulaciones y saltos de línea.
 * Se ignoran durante el análisis léxico.
 */
export const WhiteSpace = createToken({
  name: "EspacoBlanco",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

/**
 * =========================
 * EXPORT LIST
 * =========================
 */
export const WHITESPACE = [
  WhiteSpace
];