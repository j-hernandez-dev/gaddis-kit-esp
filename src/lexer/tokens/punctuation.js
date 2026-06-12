import { createToken } from "chevrotain";

/**
 * =========================
 * GROUPING
 * =========================
 */
export const LParen = createToken({
  name: "IzqParen",
  pattern: /\(/
});

export const RParen = createToken({
  name: "DerParen",
  pattern: /\)/
});

/**
 * =========================
 * ARRAYS / INDEXING
 * =========================
 */
export const LBracket = createToken({
  name: "IzqBracket",
  pattern: /\[/
});

export const RBracket = createToken({
  name: "DerBracket",
  pattern: /\]/
});

/**
 * =========================
 * BLOCKS (opcional futuro)
 * =========================
 */
export const LBrace = createToken({
  name: "IzqBrace",
  pattern: /\{/
});

export const RBrace = createToken({
  name: "IzqBrace",
  pattern: /\}/
});

/**
 * =========================
 * SEPARATORS
 * =========================
 */
export const Comma = createToken({
  name: "Coma",
  pattern: /,/
});

export const Colon = createToken({
  name: "Colon",
  pattern: /:/
});

export const Semicolon = createToken({
  name: "Semicolon",
  pattern: /;/
});

export const Dot = createToken({
  name: "Punto",
  pattern: /\./
});

/**
 * =========================
 * EXPORT LIST
 * =========================
 */
export const PUNCTUATION = [
  LParen,
  RParen,

  LBracket,
  RBracket,

  LBrace,
  RBrace,

  Comma,
  Colon,
  Semicolon,
  Dot
];