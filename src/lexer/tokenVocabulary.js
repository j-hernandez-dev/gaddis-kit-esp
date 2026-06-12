import {
  // Keywords
  KEYWORDS,

  // Tipos de dato
  TYPES,

  // Literals
  LITERALS,

  // Operators
  OPERATORS,

  // Punctuation
  PUNCTUATION,

  // Comments
  COMMENTS,

  // Whitespace
  WHITESPACE
} from "./tokens/index.js";

/**
 * ==================================
 * TOKEN VOCABULARY
 * ==================================
 *
 * El orden es CRÍTICO en Chevrotain.
 */
export const TOKEN_VOCABULARY = [

  /**
   * Ignorados
   */
  ...WHITESPACE,
  ...COMMENTS,

  /**
   * Keywords
   *
   * Deben ir antes de Identifier.
   */
  ...KEYWORDS,

  // Tipos de dato
  ...TYPES,

  /**
   * Literales
   *
   * Scientific -> Float -> Integer
   * antes de Identifier.
   */
  ...LITERALS,

  /**
   * Operadores
   *
   * Los compuestos ya están ordenados
   * dentro de operators.js
   */
  ...OPERATORS,

  /**
   * Puntuación
   */
  ...PUNCTUATION
];