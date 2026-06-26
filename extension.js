import * as vscode from 'vscode';
import { build } from "./src/interpreter/Runtime.js";
import path from 'path';
import * as fs from 'node:fs';
/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {

    console.log('Gaddis Kit actived successfully');

    const runCode = vscode.commands.registerCommand('gaddis.runCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        await editor.document.save();
        const actualFilePath = editor.document.fileName;

        const interpreterPath = path.join(context.extensionPath, 'src', 'interpreter', 'VSCodeRun.js');

        let terminal = vscode.window.terminals.find(t => t.name === 'Gaddis');
        if (!terminal) {
            terminal = vscode.window.createTerminal('Gaddis');
        }

        terminal.show();

        terminal.sendText(`node "${interpreterPath}" "${actualFilePath}"`);
    });

    context.subscriptions.push(runCode);

    const buildCode = vscode.commands.registerCommand('gaddis.buildCode', () => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const code = editor.document.getText();

        vscode.window.showInformationMessage("Construyendo código");

        const actualFilePath = editor.document.uri.fsPath;
        const cleanName = path.parse(actualFilePath).name;

        const workspaceFolders = vscode.workspace.workspaceFolders;
        const projecRootPath = workspaceFolders ? workspaceFolders[0].uri.fsPath : undefined;

        // @ts-ignore
        build(code, path.join(projecRootPath, cleanName) + ".js");

        const terminal = vscode.window.createOutputChannel("Gaddis");

        // 2. Limpiamos la consola previa y la mostramos en pantalla
        terminal.clear();
        terminal.show(true);

        // 3. Escribimos los mensajes de texto puro que quieras
        terminal.appendLine(`El código se generó en: ${projecRootPath}\\build\\${cleanName}.js`);
    });

    context.subscriptions.push(buildCode);
}

export function deactivate() { }