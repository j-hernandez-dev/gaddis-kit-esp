// literals.js

import { createToken } from "chevrotain";

/**
 * =========================
 * IDENTIFICADORES
 * =========================
 * variables, funciones, etc.
 */
export const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
  label: "Identificador"
});

/**
 * =========================
 * NÚMEROS ENTEROS
 * =========================
 */
export const IntegerLiteral = createToken({
  name: "IntegerLiteral",
  pattern: /\d+/,
  label: "EnteroLiteral"
});

/**
 * =========================
 * NÚMEROS DECIMALES
 * =========================
 */
export const FloatLiteral = createToken({
  name: "FloatLiteral",
  pattern: /\d+\.\d+/,
  label: "FlotanteLiteral"
});

/**
 * =========================
 * NOTACIÓN CIENTÍFICA
 * =========================
 */
export const ScientificLiteral = createToken({
  name: "ScientificLiteral",
  pattern: /\d+(\.\d+)?[eE][+-]?\d+/,
  label: "CientificoLiteral"
});

/**
 * =========================
 * STRINGS
 * =========================
 */
export const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"([^"\\]|\\.)*"/,
  label: "CadenaLiteral"
});

/**
 * =========================
 * BOOLEAN
 * =========================
 */
export const TrueLiteral =
createToken({
  name: "TrueLiteral",
  pattern: /Verdadero/,
  label: "Verdadero"
});

export const FalseLiteral =
createToken({
  name: "FalseLiteral",
  pattern: /Falso/,
  label: "Falso"
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

  Identifier
];