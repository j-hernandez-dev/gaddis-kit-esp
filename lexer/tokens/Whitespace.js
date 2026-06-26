// whitespace.js

import { createToken, Lexer } from "chevrotain";

/**
 * =========================
 * WHITESPACE
 * =========================
 * Espacios, tabulaciones y saltos de línea.
 * Se ignoran durante el análisis léxico.
 */
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
  label: "EspacioBlanco"
});

/**
 * =========================
 * EXPORT LIST
 * =========================
 */
export const WHITESPACE = [
  WhiteSpace
];