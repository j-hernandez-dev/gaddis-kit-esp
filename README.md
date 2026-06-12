# gaddis-kit-esp

**gaddis-kit-esp** es una extensión para Visual Studio Code orientada al soporte de un lenguaje de pseudocódigo en español, fuertemente inspirado en la sintaxis utilizada en los libros de programación de Tony Gaddis.

Su objetivo principal es ofrecer un entorno académico y accesible para la enseñanza y el aprendizaje del diseño de algoritmos, reduciendo la complejidad sintáctica propia de los lenguajes de programación tradicionales.

---

## 📌 Propósito del proyecto

Este proyecto nace con la intención de proporcionar herramientas que permitan trabajar con pseudocódigo de forma estructurada, clara y cercana al lenguaje natural en español, facilitando así el aprendizaje de la lógica de programación sin la carga de una sintaxis compleja.

El enfoque está centrado en el diseño de algoritmos, por lo que el lenguaje está pensado para principiantes, estudiantes y contextos educativos.

---

## ⚙️ Estado actual (versión 1.0.0)

En su versión inicial, el proyecto cuenta con:

- Soporte de snippets personalizados para pseudocódigo estilo Gaddis.
- Soporte de TextMate para resaltado de sintaxis.
- Definición básica del lenguaje dentro de VS Code.
- Implementación de un **lexer** y **parser** utilizando la librería [Chevrotain](https://github.com/Chevrotain/chevrotain).
- Comando de “Ejecutar código fuente”, el cual actualmente realiza un **análisis léxico y sintáctico básico** del código.

> ⚠️ Importante: en esta versión aún no se incluye análisis semántico, interpretación ni ejecución real del lenguaje.

---

## 🚀 Funcionalidades planeadas

A futuro, este proyecto busca evolucionar hacia un ecosistema completo de herramientas, incluyendo:

- Analizador semántico.
- Transpilador hacia otros lenguajes de programación.
- Sistema de diagnóstico de errores más avanzado.
- Posible generación de AST y herramientas de visualización.
- Soporte extendido para estructuras avanzadas del lenguaje.

---

## 📖 Filosofía del lenguaje

El lenguaje está diseñado bajo los siguientes principios:

- Sintaxis clara y cercana al español.
- Enfoque educativo y académico.
- Simplicidad para principiantes.
- Similitud con pseudocódigo utilizado en libros de texto.
- Separación progresiva entre aprendizaje y complejidad técnica.

---

## 🧪 Ejemplo de código

```plaintext
Declarar x Como Entero

x <- 10

Si x > 5 Entonces
    Escribir x
Fin Si
````

---

## 🛠️ Requisitos

Actualmente no se requieren dependencias externas adicionales para usar la extensión más allá de Visual Studio Code.

---

## ⚠️ Problemas conocidos

* El comando de ejecución (Ejecutar Código Fuente) actualmente solo realiza análisis léxico y sintáctico.
* No existe aún ejecución real del código.
* El manejo de errores aún puede mejorarse en cuanto a precisión y recuperación.

---

## 🧑‍💻 Autor

Proyecto desarrollado por **j-hernandez** como herramienta educativa abierta.

---

## 📜 Licencia

Este proyecto es de código abierto. Puede ser modificado y extendido libremente, siempre que se mantenga la atribución al autor original.

---

## 📌 Notas finales

Este proyecto representa una primera versión funcional de un entorno de pseudocódigo educativo. Su evolución está orientada a convertirse en una herramienta completa para el aprendizaje de algoritmos y estructuras de programación desde un enfoque simple, claro y progresivo.