import { spawn } from 'node:child_process';
import { Transpiler } from './Transpiler.js';

/**
 * @param {Transpiler} transpiler
 */
export function executeCodeInteractive(transpiler) {
  console.log('--- Iniciando ejecución interactiva ---\n');

  // Lanzamos el proceso heredando los canales de entrada y salida estándar ('inherit')
  const proceso = spawn('node', [transpiler.JSFile], {
    stdio: 'inherit'
  });

  // Cuando el archivo temporal termine, volvemos a tomar el control aquí
  // @ts-ignore
  
  proceso.on('close', (/** @type {any} */ code) => {
    console.log(`\n--- La ejecución interactiva finalizó (Código de salida: ${code}) ---`);
    transpiler.deleteFile(transpiler.JSFile);
  });

  // @ts-ignore
  proceso.on('error', (error) => {
    console.error('Error al intentar lanzar el script:', error.message);
  });
}