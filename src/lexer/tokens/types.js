// types.js

import { createToken } from "chevrotain";

/**
 * =========================
 * TIPOS
 * =========================
 */

export const Integer = createToken({
  name: "Integer",
  pattern: /\bEntero\b/,
  label: "Entero"
});

export const Real = createToken({
  name: "Real",
  pattern: /\bReal\b/,
  label: "Real"
});

export const String = createToken({
  name: "String",
  pattern: /\bCadena\b/,
  label: "Cadena"
});

export const Logical = createToken({
  name: "Logical",
  pattern: /\bLogico\b/,
  label: "Logico"
});

export const Character = createToken({
  name: "Character",
  pattern: /\bCaracter\b/,
  label: "Caracter"
});

export const TYPES = [
  Integer,
  Real,
  String,
  Logical,
  Character
];