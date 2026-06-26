# Change Log

All notable changes to the "gaddis-kit-esp" extension will be documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Mejora en el sistema de errores del parser.
- Soporte inicial para análisis de expresiones lógicas y aritméticas.
- Soporte experimental para estructuras de arreglos en el lenguaje.

### Changed
- Refactorización del parser basado en Chevrotain.
- Reorganización de reglas de precedencia de operadores.

### Fixed
- Corrección en el reconocimiento del token `NO` (antes interpretado como identificador).
- Corrección de errores de precedencia en expresiones lógicas.

---

## [1.2.7] - 2026-06-26

- Error de no ejecución correcta de procedimientos corregido


## [1.2.6] - 2026-06-26

- Error de dependencias corregido

## [1.2.5] - 2026-06-26

- Se creó una librería estándar donde se puede hacer uso de:
- Funciones y procedimientos de matemáticas, cadenas y archivos.
- Nuevos snippets acorde a estos bloques.

## [1.2.0] - 2026-06-26

### Added
- Implementación del constructor de AST (Abstract Syntax Tree) para transformar la estructura CST generada por Chevrotain en un modelo intermedio del programa.
- Nueva arquitectura basada en nodos AST para representar:
  - Declaraciones de variables y constantes.
  - Asignaciones.
  - Expresiones aritméticas y lógicas.
  - Llamadas a funciones y procedimientos.
  - Entrada y salida de datos.
  - Estructuras de control.
- Implementación del transpilador del lenguaje Gaddis hacia JavaScript.
- Soporte para generación automática de código JavaScript ejecutable a partir del AST.
- Sistema inicial de ejecución interactiva del código generado utilizando Node.js.

### Changed
- Reestructuración completa del flujo de compilación:

- Separación de responsabilidades entre las etapas del compilador:
- Lexer encargado exclusivamente del reconocimiento de tokens.
- Parser encargado de validar la estructura gramatical.
- AST encargado de representar la semántica estructural del programa.
- Transpilador encargado de convertir el lenguaje Gaddis a JavaScript.
- Mejora en la organización interna del intérprete y ejecución de programas.
- Adaptación de la arquitectura para permitir futuras etapas de análisis semántico, optimización y generación de código.

### Fixed
- Corrección de problemas relacionados con la construcción de estructuras complejas desde el CST.
- Corrección de errores en la generación de código para expresiones anidadas.
- Corrección de problemas en la ejecución de instrucciones generadas dinámicamente.

### Known limitations
- El análisis semántico todavía se encuentra en desarrollo.
- El sistema de tipos aún no realiza validaciones completas.
- Algunas características avanzadas del lenguaje todavía no cuentan con una traducción completa a JavaScript.
- La optimización del código generado aún no está implementada.

---

## [1.0.0] - 2026-06-12

### Added
- Extensión inicial de VS Code para pseudocódigo estilo Gaddis.
- Snippets básicos del lenguaje.
- Soporte de TextMate para resaltado de sintaxis.
- Lexer y Parser inicial implementado con Chevrotain.
- Comando básico de “Ejecutar código fuente” (análisis léxico y sintáctico).

### Known limitations
- No existe análisis semántico.
- No hay interpretación ni ejecución real del lenguaje.
- Sistema de errores básico en consola.

---

## [0.1.0] - Prototype

### Added
- Primer prototipo del lexer.
- Reconocimiento básico de tokens.