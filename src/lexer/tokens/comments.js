import { createToken, Lexer } from "chevrotain";

/**
 * =========================
 * COMENTARIOS DE LÍNEA
 * =========================
 * // comentario
 */
export const LineComment = createToken({
  name: "LineaComentario",
  pattern: /\/\/[^\n\r]*/,
  group: Lexer.SKIPPED
});

/**
 * =========================
 * COMENTARIOS DE BLOQUE
 * =========================
 * /* comentario *\/
 */
export const BlockComment = createToken({
  name: "BloqueComentario",
  pattern: /\/\*[\s\S]*?\*\//,
  group: Lexer.SKIPPED
});

/**
 * =========================
 * EXPORT LIST
 * =========================
 */
export const COMMENTS = [
  LineComment,
  BlockComment
];