// run.js

import { tokenize } from "../lexer/lexer.js";
import { parser } from "../parser/parser.js";

/**
 * @param {string} sourceCode
 * @returns {string}
 */
export function run(sourceCode) {

  const tokens = tokenize(sourceCode);

  parser.input = tokens;

  const cst = (/** @type any */ (parser)).program();

  const report = [];

  /**
   * ==========================
   * ERRORES
   * ==========================
   */
  if (parser.errors.length > 0) {

    report.push("ANALYSIS WITH ERRORS\n");

    parser.errors.forEach((error, i) => {

      const token = error.token;

      let msg = `[ERROR ${i + 1}] ${error.name}\n`;
      msg += `${error.message}\n`;

      if (token) {
        msg += `Location: Line ${token.startLine}, Column ${token.startColumn}\n`;
        msg += `Found: "${token.image}"\n`;
      }

      if (error.resyncedTokens?.length) {
        msg += `Recovered by skipping: ${error.resyncedTokens.map(t => t.image).join(" ")}\n`;
      }

      report.push("Analysis completed with error(s).\n");
      report.push(msg);
    });

    return report.join("\n");
  }

  /**
   * ==========================
   * ÉXITO
   * ==========================
   */

  const nodeCount = countNodes(cst);

  report.push("ANALYSIS SUCCESSFULLY\n");

  report.push("Analysis completed successfully.\n");

  report.push(`Nodes CST: ${nodeCount}`);
  report.push(`Tokens: ${tokens.length}`);
  report.push(`Errors: ${parser.errors.length}`);

  return report.join("\n");

  /**
   * ==========================
   * UTILIDAD
   * ==========================
   */

  /**
   * @param {{ [x: string]: any; }} node
   */
  function countNodes(node) {
    if (!node || typeof node !== "object") return 0;

    let count = 1;

    for (const key in node) {
      const value = node[key];

      if (Array.isArray(value)) {
        value.forEach(v => count += countNodes(v));
      } else if (typeof value === "object") {
        count += countNodes(value);
      }
    }

    return count;
  }
}