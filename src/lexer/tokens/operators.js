import { createToken } from "chevrotain";

/**
 * =========================
 * ASIGNACIÓN
 * =========================
 */
export const Assignment = createToken({
  name: "Asignacion",
  pattern: /<-/,
  label: "<-"
});

/**
 * =========================
 * ARITMÉTICOS
 * =========================
 */
export const Plus = createToken({ name: "Mas", pattern: /\+/ });
export const Minus = createToken({ name: "Menos", pattern: /-/ });
export const Multiply = createToken({ name: "Multiplicar", pattern: /\*/ });
export const Divide = createToken({ name: "Dividir", pattern: /\// });
export const Power = createToken({ name: "Potencia", pattern: /\^/ });

/**
 * =========================
 * RELACIONALES
 * =========================
 */
export const Equal = createToken({ name: "Igual", pattern: /=/ });
export const NotEqual = createToken({ name: "Diferente", pattern: /<>/ });
export const LessThan = createToken({ name: "MenorQue", pattern: /</ });
export const GreaterThan = createToken({ name: "MayorQue", pattern: />/ });
export const LessOrEqual = createToken({ name: "MenorOIgual", pattern: /<=/ });
export const GreaterOrEqual = createToken({ name: "MayorOIgual", pattern: />=/ });

/**
 * =========================
 * EXPORT AGRUPADO
 * =========================
 */
export const OPERATORS = [
  Assignment,

  Plus,
  Minus,
  Multiply,
  Divide,
  Power,
  
  LessOrEqual,
  GreaterOrEqual,
  NotEqual,
  LessThan,
  GreaterThan,
  Equal,
];