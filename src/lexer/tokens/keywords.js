// keywords.js

import { createToken } from "chevrotain";

/**
 * =========================
 * CONTROL FLOW
 * =========================
 */
export const End = createToken({
  name: "End",
  pattern: /\bFin\b/,
  label: "Fin"
});

export const If = createToken({
  name: "If",
  pattern: /\bSi\b/,
  label: "Si"
});

export const Then = createToken({
  name: "Then",
  pattern: /\bEntonces\b/,
  label: "Entonces"
});

export const Else = createToken({
  name: "Else",
  pattern: /\bSino\b/,
  label: "Sino"
});

export const Do = createToken({
  name: "Do",
  pattern: /\bHacer\b/,
  label: "Hacer"
});

export const While = createToken({
  name: "While",
  pattern: /\bMientras\b/,
  label: "Mientras"
});

export const For = createToken({
  name: "For",
  pattern: /\bPara\b/,
  label: "Para"
});

export const To = createToken({
  name: "To",
  pattern: /\bHasta\b/,
  label: "Hasta"
});

export const Step = createToken({
  name: "Step",
  pattern: /\bPaso\b/,
  label: "Paso"
});

/**
 * =========================
 * SWITCH / SELECT
 * =========================
 */
export const Switch = createToken({
  name: "Switch",
  pattern: /\bSeleccionar\b/,
  label: "Seleccionar"
});

export const Case = createToken({
  name: "Case",
  pattern: /\bCaso\b/,
  label: "Caso"
});

export const Default = createToken({
  name: "Default",
  pattern: /\bDefecto\b/,
  label: "Defecto"
});

/**
 * =========================
 * SUBPROGRAMS
 * =========================
 */
export const Function = createToken({
  name: "Function",
  pattern: /\bFuncion\b/,
  label: "Funcion"
});

export const Procedure = createToken({
  name: "Procedure",
  pattern: /\bProcedimiento\b/,
  label: "Procedimiento"
});

export const Return = createToken({
  name: "Return",
  pattern: /\bRetornar\b/,
  label: "Retornar"
});

export const Call = createToken({
  name: "Call",
  pattern: /\bLlamar\b/,
  label: "Llamar"
});

/**
 * =========================
 * DECLARATIONS
 * =========================
 */
export const Declare = createToken({
  name: "Declare",
  pattern: /\bDeclarar\b/,
  label: "Declarar"
});

export const Constant = createToken({
  name: "Constant",
  pattern: /\bConstante\b/,
  label: "Constante"
});

/**
 * =========================
 * IO
 * =========================
 */
export const Input = createToken({
  name: "Input",
  pattern: /\bLeer\b/,
  label: "Leer"
});

export const Display = createToken({
  name: "Display",
  pattern: /\bEscribir\b/,
  label: "Escribir"
});

/**
 * =========================
 * WORD OPERATORS
 * =========================
 */
export const And = createToken({
  name: "And",
  pattern: /\bY\b/,
  label: "Y"
});

export const Or = createToken({
  name: "Or",
  pattern: /\bO\b/,
  label: "O"
});

export const Not = createToken({
  name: "Not",
  pattern: /\bNO\b/,
  label: "NO"
});

export const Mod = createToken({
  name: "Mod",
  pattern: /\bMOD\b/,
  label: "MOD"
});

/**
 * =========================
 * EXPORT LIST
 * =========================
 */
export const KEYWORDS = [
  End,
  If,
  Then,
  Else,

  While,
  Do,

  For,
  To,
  Step,

  Switch,
  Case,
  Default,

  Function,
  Procedure,
  Return,
  Call,

  Declare,
  Constant,

  Input,
  Display,

  And,
  Or,
  Not,
  Mod
];