# gaddis-kit-esp

**gaddis-kit-esp** es una extensión para Visual Studio Code orientada al soporte de un lenguaje de pseudocódigo en español, fuertemente inspirado en la sintaxis utilizada en los libros de programación de Tony Gaddis.

Su objetivo principal es ofrecer un entorno académico y accesible para la enseñanza y el aprendizaje del diseño de algoritmos, reduciendo la complejidad sintáctica propia de los lenguajes de programación tradicionales.

[![GitHub Repo](https://img.shields.io/badge/GitHub-gaddis--kit--esp-black?logo=github)](https://github.com/j-hernandez-dev/gaddis-kit-esp)

[![Wikiversity](https://img.shields.io/badge/Wikiversity-Gaddis_Pseudocode-0F67A6?logo=wikiversity&logoColor=white)](https://en.wikiversity.org/wiki/Pseudocode/Gaddis_Pseudocode)

---

## 💻 Comandos

> Extensión de archivo

.gds

> Ejecutar código

Ejecuta el código programado en Gaddis mediante la transpilación y ejecución en JavaScript.

> Construir código (JS)

Transpila el código programado en Gaddis a código de JavaScript.

---

## 📌 Propósito del proyecto

Este proyecto nace con la intención de proporcionar herramientas que permitan trabajar con pseudocódigo de forma estructurada, clara y cercana al lenguaje natural en español, facilitando así el aprendizaje de la lógica de programación sin la carga de una sintaxis compleja.

El enfoque está centrado en el diseño de algoritmos, por lo que el lenguaje está pensado para principiantes, estudiantes y contextos educativos.

---

## ⚙️ Estado actual (versión 1.2.0)

El proyecto cuenta con:

- Soporte de snippets personalizados para pseudocódigo estilo Gaddis.
- Soporte de TextMate para resaltado de sintaxis.
- Implementación de **lexer**, **parser**, **constructor AST**, **transpilador a JavaScript** y **runtime** sobre el lenguaje de JavaScript. utilizando la librería [Chevrotain](https://github.com/Chevrotain/chevrotain).

> ⚠️ Importante: en esta versión aún no se incluye análisis semántico, es una parte aún pendiente, por lo que funciona semánticamente como "superset" o encima de JavaScript.

---

## 🚀 Funcionalidades planeadas

Inicialmente, sólo se busca tener un acercamiento al pseudocódigo de Tony Gaddis.

En un posible futuro, este proyecto busca evolucionar hacia un ecosistema completo de herramientas, incluyendo:

- Analizador gramátical y semántico avanzado.
- Transpilador hacia otros lenguajes de programación además de JavaScript.
- Sistema de diagnóstico de errores más avanzado.
- Visualización de errores en edición de código.
- Soporte extendido para librería estándar del lenguaje.

---

## 📖 Filosofía del lenguaje

El lenguaje está diseñado bajo los siguientes principios:

- Sintaxis clara y cercana al español.
- Enfoque educativo y académico.
- Simplicidad para principiantes.
- Similitud con pseudocódigo utilizado por el autor Tony Gaddis.
- Separación progresiva entre aprendizaje y complejidad técnica.

---

## 🧪 Ejemplo de código

```plaintext
Declarar Entero x

x <- 10

Si x > 5 Entonces
    Escribir x
Fin Si
````

---

## 🛠️ Requisitos

- Visual Studio Code
- Node.js (para la ejecución)

---

## ⚠️ Problemas conocidos

* No hay soporte para el análisis semántico, por lo que aspectos como el tipado de datos es casi un adorno. La semántica que se maneja es la de JavaScript el cual es muy flexible.
* El manejo de errores aún puede mejorarse en cuanto a precisión de mensajes de error.
* En ocasiones es necesario ejecutar el código más de una vez debido a una transpilación de código incorrecta (asociado con el streaming escritura de archivos).

---

## 🧑‍💻 Autor

Proyecto desarrollado por **j-hernandez** como herramienta educativa abierta.

---

## 📜 Licencia (GPLv2)

Este proyecto es de código abierto. Puede ser modificado y extendido libremente, siempre que se mantenga la atribución al autor original.