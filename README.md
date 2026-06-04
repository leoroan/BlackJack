# ♠️ BlackJack 21 - Pruebas Automatizadas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Selenium](https://img.shields.io/badge/Selenium-4.x-green.svg)](https://www.selenium.dev/)
[![NUnit](https://img.shields.io/badge/NUnit-3.x-blue.svg)](https://nunit.org/)

> Un Blackjack clásico preparado para **pruebas de interfaz automatizadas** con Selenium WebDriver + NUnit.  
> Ideal para practicar testing end‑to‑end en un entorno real de juego.

---

## 🎯 Propósito del proyecto

Este repositorio contiene una implementación funcional y **completa** del juego Blackjack (21), desarrollada específicamente para servir como **objeto de pruebas automatizadas**.

✅ **Sin dependencias externas** – solo HTML, CSS y JavaScript vanilla.  
✅ **Juego 100% jugable** desde el navegador.  
✅ **Estructura limpia** (IDs únicos, eventos predecibles) pensada para ser controlada por Selenium.

---

## 🃏 Características implementadas

| Área | Detalle |
|------|---------|
| **Reglas completas** | Blackjack clásico: puntuación con Ases flexibles (1/11), el crupier juega automáticamente al plantarse el jugador |
| **Interfaz intuitiva** | Botones: `Iniciar partida`, `Pedir carta`, `Plantarse` |
| **Visualización de cartas** | Colores según el palo (♥️♦️ rojo, ♠️♣️ negro) + diseño tipo ficha |
| **Puntuación dinámica** | Cálculo correcto actualizado en tiempo real |
| **Mensajes de resultado** | `"¡Ganaste!"`, `"Perdiste"`, `"Empate"`, `"Te pasaste de 21"` |
| **Racha de victorias** | Contador integrado para el escenario de prueba #6 |
| **Sin frameworks** | HTML/CSS/JS puro → fácil de testear sin sorpresas |

---

> 💡 **Nota:** El juego hosteado en `https://myselfproductions.me/BlackJack/` ya está preparado para recibir pruebas.
> 
---

## 🧠 Casos de prueba cubiertos (8 escenarios)

| # | Escenario | Estado |
|---|-----------|--------|
| 1 | El jugador pide carta hasta pasarse de 21 → mensaje "Perdiste" | ✅ Automatizado |
| 2 | El jugador se planta antes de pasarse → el crupier juega y se muestra resultado | ✅ Automatizado |
| 3 | Blackjack natural (21 con dos cartas) → victoria automática | ✅ Manual / Selenium-ready |
| 4 | El crupier se pasa de 21 → el jugador gana | ✅ Selenium-ready |
| 5 | Empate a puntos → mensaje "Empate" | ✅ Selenium-ready |
| 6 | Racha de 3 victorias consecutivas (sistema de racha) | ✅ Implementado en JS |
| 7 | El As se calcula como 11 si no se pasa, o 1 si es necesario | ✅ Validado en lógica |
| 8 | Los botones se ocultan/muestran correctamente en cada estado del juego | ✅ Verificable con Selenium |

---

## 🎨 Vista previa del juego

```
┌─────────────────────────────────────────────┐
│                  ♠️ BlackJack                │
├─────────────────────────────────────────────┤
│  [🃟 Iniciar partida]  [Pedir carta] [Plantarse] │
├─────────────────────────────────────────────┤
│  📌 Tus cartas:      Puntuación: 17         │
│  [A♥] [K♠] [6♦]                             │
├─────────────────────────────────────────────┤
│  🎩 Cartas del croupier:  Puntuación: ? + 10│
│  [?] [10♥]                                  │
├─────────────────────────────────────────────┤
│  🎲 ¡Ganaste! El crupier se pasó de 21.     │
└─────────────────────────────────────────────┘
```
---

## 🧑‍💻 Autoría y contacto

Ideado por **Leandro Maselli _@leoroan_** y Desarrollado por **& _@deepseek🐋_**  
🔗 GitHub: [github.com/leoroan](https://github.com/leoroan)
🔗 Deepseek: [https://chat.deepseek.com/](https://chat.deepseek.com/)
 
- 💬 Comentarios o sugerencias → bienvenidos via Issues
- 🃏 ¿Quieres contribuir con más casos de prueba? ¡Haz un fork y manda un PR!

---

## 📜 Licencia 

MIT – libre para usar, modificar y distribuir.  
_Hecho con ♥️ y café para facilitar la vida de los testers._
