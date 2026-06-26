export const dependencies =
`
// @ts-nocheck
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { readFile, stat, writeFile, appendFile, unlink } from 'fs/promises';

`

export const endProgram =
`
process.exit(0);
} catch (error) {
console.error("╔═ Error De Runtime ══════════════════════════════════════════\\n"
      + "\\n"
      + error.name + ":"
      + "\\n"
      + error.message
      + "\\n"
      + "\\n══════════════════════════════════════════════════════════════");
process.exit(1);
}
`

export const standartLibrary =
`
try {
// ENTRADA

async function inputData() {
    const rl = createInterface({ input, output });
    const answer = await rl.question("> ");
    rl.close();
    return answer;
}


// ARCHIVOS

async function LeerArchivo(ruta) {
    try {
        return await readFile(ruta, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') {
            return "";
        }
        throw err;
    }
}

async function ExisteArchivo(ruta) {
    try {
        return (await stat(ruta)).isFile();
    } catch {
        return false;
    }
}

async function PesoArchivo(ruta) {
    try {
        return (await stat(ruta)).size;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return 0;
        }
        throw err;
    }
}

async function CrearArchivo(ruta) {
    await writeFile(ruta, "");
}

async function EscribirArchivo(ruta, contenido) {
    await appendFile(ruta, contenido, "utf8");
}

async function EliminarArchivo(ruta) {
    try {
        await unlink(ruta);
    } catch (err) {
        if (err.code !== "ENOENT") {
            throw err;
        }
    }
}

// MATH

async function Absoluto(x) {
    return Math.abs(x);
}

async function Minimo(a, b) {
    return Math.min(a, b);
}

async function Maximo(a, b) {
    return Math.max(a, b);
}

async function Redondeo(decimal) {
    return Math.round(decimal);
}

async function Piso(decimal) {
    return Math.floor(decimal);
}

async function Raiz2(x) {
    return Math.sqrt(x);
}

async function Raiz3(x) {
    return Math.cbrt(x);
}

async function Exponencial(x) {
    return Math.exp(x);
}

async function Log(x) {
    return Math.log(x);
}

async function Log10(x) {
    return Math.log10(x);
}

async function Log2(x) {
    return Math.log2(x);
}

async function Seno(x) {
    return Math.sin(x);
}

async function Coseno(x) {
    return Math.cos(x);
}

async function Tangente(x) {
    return Math.tan(x);
}

async function Arcoseno(x) {
    return Math.asin(x);
}

async function Arcocoseno(x) {
    return Math.acos(x);
}

async function ARadianes(x) {
    return x * (Math.PI / 180);
}

async function AGrados(x) {
    return x * (180 / Math.PI);
}

async function PI() {
    return Math.PI;
}

async function Euler() {
    return Math.E;
}

async function Aleatorio(min, max) {
    if (min === undefined || max === undefined) {
        return Math.random();
    }
    return Math.random() * (max - min) + min;
}

async function Promedio(x) {
    return Suma(x) / x.length;
}

async function Sumatoria(x) {
    return x.reduce((acc, val) => acc + val, 0);
}

async function Mediana(x) {
    const sorted = [...x].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

async function Varianza(x) {
    const prom = Promedio(x);
    return Promedio(x.map(v => (v - prom) ** 2));
}

// CADENAS

async function Longitud(cadena) {
    return cadena.length;
}

async function CaracterEn(cadena, posicion) {
    return cadena[posicion];
}

async function SubCadena(cadena, inicio, fin) {
    return cadena.slice(inicio, fin);
}

async function Buscar(cadena, cadenaBuscar) {
    return cadena.indexOf(cadenaBuscar);
}

async function Contiene(cadena, texto) {
    return cadena.includes(texto);
}

async function Mayusculas(cadena) {
    return cadena.toUpperCase();
}

async function Minusculas(cadena) {
    return cadena.toLowerCase();
}

async function Recortar(cadena) {
    return cadena.trim();
}

async function Reemplazar(cadena, viejo, nuevo) {
    return cadena.replaceAll(viejo, nuevo);
}

async function Dividir(cadena, separador) {
    return cadena.split(separador);
}

async function Unir(arreglo, separador) {
    return arreglo.join(separador);
}

async function EsNumero(cadena) {
    return !isNaN(cadena) && cadena.trim() !== "";
}

async function EsVacia(cadena) {
    return cadena.length === 0;
}

async function EmpiezaCon(cadena, texto) {
    return cadena.startsWith(texto);
}

async function TerminaCon(cadena, texto) {
    return cadena.endsWith(texto);
}
`