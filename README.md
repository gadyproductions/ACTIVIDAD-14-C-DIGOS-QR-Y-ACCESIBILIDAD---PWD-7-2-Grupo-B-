# 📋 Actividad 14: Códigos QR y Accesibilidad Web (a11y)

> **Materia:** Proyecto de Implementación de Sitios web Dinámicos (PWD)  
> **Institución:** EEST N.º 1 "Eduardo Ader" — Vicente López  
> **Curso:** 7° año 2° división Grupo B (Miércoles de 17:35 a 21:45 hs) — 2° Cuatrimestre 2026  
> **Profesor:** Mansilla Muñoz York Elías (`@docentedeclasesdeapoyo`)  
> **Integrante / Estudiante:** **Gadiel Siles** (`@gadyproductions`)

---

## 🎯 Descripción del Proyecto

Este proyecto interactivo da respuesta integral a la consigna de la **Actividad 14**, combinando las mejores prácticas de **Accesibilidad Web (a11y)** con el desarrollo de un **Generador Dinámico de Códigos QR** pensado para la **Expo Técnica**, articulado con los **Manuales Técnicos de Usuario y Programador** del proyecto integrador anual.

---

## 🧠 Marco Teórico: Accesibilidad Web (a11y)

### 1. ¿Qué es la Accesibilidad Web?
La accesibilidad web asegura que personas con diversas capacidades (ceguera, visión reducida, daltonismo, dificultades motrices, sordera o dislexia) puedan acceder a la información e interactuar en igualdad de condiciones.

### 2. Marco Legal
- **Estados Unidos:** La ley **ADA (Americans with Disabilities Act - Título III)** y la **Sección 508** exigen que las plataformas web comerciales e institucionales cumplan con estándares de accesibilidad para evitar discriminación.
- **Argentina:** Rige la **Ley Nacional N.º 26.653** de *Accesibilidad de la Información en las Páginas Web*, estableciendo la obligatoriedad de pautas WCAG en sitios del sector público y empresas prestatarias de servicios públicos.

### 3. Principios POUR (WCAG 2.1)
1. **Perceptible:** Contraste mínimo de 4.5:1, etiquetas alternativas (`alt`) y textos legibles.
2. **Operable:** Navegación fluida 100% mediante teclado (`Tab`, `Shift+Tab`, `Enter`).
3. **Comprensible:** Redacción clara, lenguaje predecible y mensajes de ayuda contextuada.
4. **Robusto:** Código HTML5 semántico compatible con lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack).

### 4. ¿Por qué los Códigos QR deben ser Accesibles?
Al exhibir un QR en la **Expo Técnica**:
- El sitio de destino debe ser **Responsive** (diseño adaptable que se visualice perfecto en celulares de cualquier resolución).
- El código QR debe tener suficiente contraste óptico entre el color oscuro (`colorDark`) y el fondo claro (`colorLight`) para ser captado con rapidez por las cámaras.
- Siempre debe proveerse el enlace escrito en texto legible debajo del QR para personas con impedimentos visuales.

---

## 🛠️ Módulos Implementados

### 1. ♿ Suite de Accesibilidad en Vivo (Toolbar)
- **Modos de Contraste:** Tema oscuro predeterminado, Modo Alto Contraste (Amarillo y Negro - WCAG AAA) y Tema Claro.
- **Escala Tipográfica:** Normal, A+ y A++ para facilitar la lectura.
- **Modo Dislexia:** Tipografía y espaciado de renglón optimizado para lectura fluida.
- **Lector por Voz Integrado:** Motor Text-to-Speech nativo (`window.speechSynthesis`) que lee las secciones en voz alta en español argentino, resaltando visualmente el texto activo.

### 2. ⚡ Generador Dinámico de Códigos QR (El Desafío)
Implementado con la biblioteca JavaScript `qrcode.js`:
- Generación reactiva e instantánea al escribir URLs o texto.
- Selector de color de código (`colorDark`) y fondo (`colorLight`) con auditoría de contraste en tiempo real.
- Niveles de corrección de errores ajustables (L, M, Q, H).
- **Accesos rápidos con un clic para la Expo Técnica:**
  - Repositorio GitHub de Gadiel Siles.
  - Encuesta de Satisfacción de la Expo.
  - Manual de Usuario del Proyecto Integrador.
  - Manual de Programador del Proyecto Integrador.
  - Demostración online del Sistema SIMC.
- Descarga directa en **formato PNG**, copia al portapapeles e impresión de tarjetas para el stand.

### 3. 📷 Validador y Escáner de Códigos QR
- Carga y arrastre de imágenes de códigos QR (PNG, JPG, WebP) con decodificación mediante `jsQR`.
- Soporte para escanear en tiempo real mediante la **cámara web** del dispositivo.

### 4. 📚 Articulación con el Proyecto Anual: Manuales Técnicos con QR
- **Manual de Usuario:** Guía de uso del sistema anual y pasos para visitantes de la Expo Técnica.
- **Manual de Programador:** Arquitectura técnica, APIs y buenas prácticas a11y.
- **Requisito Obligatorio del PDF Cumplido:** En la última página de cada manual se incluye dinámicamente un **código QR generado por código** que conduce a la encuesta de satisfacción y al código fuente en GitHub.
- Diseño optimizado con `@media print` para exportar a papel o PDF.

### 5. 🔬 Calculadora de Contraste de Color WCAG 2.1
- Herramienta interactiva para calcular el ratio de contraste exacto entre dos colores con la fórmula oficial del W3C, indicando si cumple los niveles AA y AAA.

---

## 🚀 Frase Alentadora Argenta

> *"Su código es su tarjeta de presentación; hagan que sea fácil de encontrar con un escaneo para causar sensación. 🚀📱"*  
> — **Profesor Mansilla Muñoz York Elías**

---

## 📂 Estructura de Archivos

```
ACTIVIDAD-14-C-DIGOS-QR-Y-ACCESIBILIDAD---PWD-7-2-Grupo-B/
│
├── index.html              # Aplicación web completa y accesible (HTML5/A11y)
├── index.php               # Entrada compatible para servidores PHP/Apache
├── README.md               # Documentación pedagógica y técnica
│
├── css/
│   └── styles.css          # Sistema de diseño, variables CSS, temas y print stylesheet
│
└── js/
    ├── qrcode.min.js       # Librería autónoma de generación de QR en Canvas/DOM
    ├── jsQR.min.js         # Librería para decodificación y escaneo de QR
    └── app.js              # Controlador interactivo, a11y, generador y visor de manuales
```

---

## 💻 Instrucciones de Uso y Ejecución

### Opción 1: Abrir directamente en el navegador
Puedes abrir `index.html` haciendo doble clic en el archivo o arrastrándolo a cualquier navegador web (Chrome, Firefox, Edge).

### Opción 2: Servidor local con Node.js
```bash
npx serve .
```

### Opción 3: Servidor local con PHP
```bash
php -S localhost:8000
```
Luego accede a `http://localhost:8000`.

---

## 👨‍💻 Autor y Créditos
- **Alumno:** Gadiel Siles
- **División:** 7° 2° Grupo B
- **Profesor:** Mansilla Muñoz York Elías
- **Institución:** Escuela de Educación Secundaria Técnica N.º 1 "Eduardo Ader" — Vicente López (2026)