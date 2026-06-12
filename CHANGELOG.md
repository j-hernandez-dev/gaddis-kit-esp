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