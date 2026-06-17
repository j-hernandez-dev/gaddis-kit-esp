import * as vscode from 'vscode';
import { run } from "./src/interpreter/run.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {

    console.log('Gaddis Kit actived successfully');

    const runAnalysis = vscode.commands.registerCommand('gaddis.runAnalysis', () => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const code = editor.document.getText();

        vscode.window.showInformationMessage("Ejecutando análisis...");

        const channel = vscode.window.createOutputChannel("Gaddis");

        const text = run(code);
        channel.appendLine(text);
        channel.show();
        
    });

    context.subscriptions.push(runAnalysis);
}

export function deactivate() {}