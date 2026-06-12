import { createToken } from "chevrotain";

/**
 * =========================
 * IDENTIFICADORES
 * =========================
 * variables, funciones, etc.
 */
export const Identifier = createToken({
  name: "Identificador",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/
});

/**
 * =========================
 * NÚMEROS ENTEROS
 * =========================
 */
export const IntegerLiteral = createToken({
  name: "EnteroLiteral",
  pattern: /\d+/
});

/**
 * =========================
 * NÚMEROS DECIMALES
 * =========================
 */
export const FloatLiteral = createToken({
  name: "FlotanteLiteral",
  pattern: /\d+\.\d+/
});

/**
 * =========================
 * NOTACIÓN CIENTÍFICA
 * =========================
 */
export const ScientificLiteral = createToken({
  name: "CientificoLiteral",
  pattern: /\d+(\.\d+)?[eE][+-]?\d+/
});

/**
 * =========================
 * STRINGS
 * =========================
 */
export const StringLiteral = createToken({
  name: "CadenaLiteral",
  pattern: /"([^"\\]|\\.)*"/
});

/**
 * =========================
 * BOOLEAN / NULL LITERALS
 * =========================
 */
export const TrueLiteral =
createToken({
  name: "VerdaderoLiteral",
  pattern: /Verdadero/ });

export const FalseLiteral =
createToken({
  name: "FalsoLiteral",
  pattern: /Falso/ });

export const NullLiteral =
createToken({
  name: "NuloLiteral",
  pattern: /Nulo/
});

/**
 * =========================
 * AGRUPACIÓN
 * =========================
 */
export const LITERALS = [
  ScientificLiteral,
  FloatLiteral,
  IntegerLiteral,

  StringLiteral,

  TrueLiteral,
  FalseLiteral,
  NullLiteral,

  Identifier
];