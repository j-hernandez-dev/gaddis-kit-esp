import { createToken } from "chevrotain";

export const Integer = createToken({
  name: "Entero",
  pattern: /\bEntero\b/
});

export const Real = createToken({
  name: "Real",
  pattern: /\bReal\b/
});

export const String = createToken({
  name: "Cadena",
  pattern: /\bCadena\b/
});

export const Logical = createToken({
  name: "Logico",
  pattern: /\bLogico\b/
});

export const Character = createToken({
  name: "Caracter",
  pattern: /\bCaracter\b/
});

export const TYPES = [
  Integer,
  Real,
  String,
  Logical,
  Character
];