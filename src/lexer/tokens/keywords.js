import { createToken } from "chevrotain";

/**
 * =========================
 * CONTROL FLOW
 * =========================
 */
export const End = createToken({
  name: "Fin",
  pattern: /\bFin\b/
});

export const If = createToken({
  name: "Si",
  pattern: /\bSi\b/
});

export const Then = createToken({
  name: "Entonces",
  pattern: /\bEntonces\b/
});

export const Else = createToken({
  name: "Sino",
  pattern: /\bSino\b/
});

export const Do = createToken({
  name: "Hacer",
  pattern: /\bHacer\b/
});

export const While = createToken({
  name: "Mientras",
  pattern: /\bMientras\b/
});

export const For = createToken({
  name: "Para",
  pattern: /\bPara\b/
});

export const To = createToken({
  name: "Hasta",
  pattern: /\bHasta\b/
});

export const Step = createToken({
  name: "Paso",
  pattern: /\bPaso\b/
});

/**
 * =========================
 * SWITCH / SELECT
 * =========================
 */
export const Switch = createToken({
  name: "Seleccionar",
  pattern: /\bSeleccionar\b/
});

export const Case = createToken({
  name: "Caso",
  pattern: /\bCaso\b/
});

export const Default = createToken({
  name: "Defecto",
  pattern: /\bDefecto\b/
});

/**
 * =========================
 * SUBPROGRAMS
 * =========================
 */
export const Function = createToken({
  name: "Funcion",
  pattern: /\bFuncion\b/
});

export const Procedure = createToken({
  name: "Procedimiento",
  pattern: /\bProcedimiento\b/
});

export const Return = createToken({
  name: "Retornar",
  pattern: /\bRetornar\b/
});

export const Call = createToken({
  name: "Llamar",
  pattern: /\bLlamar\b/
});

/**
 * =========================
 * DECLARATIONS
 * =========================
 */
export const Declare = createToken({
  name: "Declarar",
  pattern: /\bDeclarar\b/
});

export const Constant = createToken({
  name: "Constante",
  pattern: /\bConstante\b/
});

export const As = createToken({
  name: "Como",
  pattern: /\bComo\b/
});

/**
 * =========================
 * IO
 * =========================
 */
export const Input = createToken({
  name: "Leer",
  pattern: /\bLeer\b/
});

export const Display = createToken({
  name: "Escribir",
  pattern: /\bEscribir\b/
});

/**
 * =========================
 * WORD OPERATORS
 * =========================
 */
export const And = createToken({
  name: "Y",
  pattern: /\bY\b/
});

export const Or = createToken({
  name: "O",
  pattern: /\bO\b/
});

export const Not = createToken({
  name: "NO",
  pattern: /\bNO\b/
});

export const Mod = createToken({
  name: "MOD",
  pattern: /\bMOD\b/
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
  As,

  Input,
  Display,

  And,
  Or,
  Not,
  Mod
];