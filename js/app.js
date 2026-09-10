/**
 * ACTIVIDAD 14: CÓDIGOS QR Y ACCESIBILIDAD - PWD 7° 2° GRUPO B
 * Escuela de Educación Secundaria Técnica N.º 1 "Eduardo Ader" - Vicente López
 * Alumno / Integrante: Gadiel Siles
 * Profesor: Mansilla Muñoz York Elías
 * Ciclo Lectivo: 2026 - 2° Cuatrimestre
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de subsistemas
  initAccessibilityToolbar();
  initDynamicQrGenerator();
  initHeroQrPreview();
  initManualsModule();
  initQrScanner();
  initWcagContrastTool();
  initTextToSpeechSystem();
});

/* ==========================================================================
   1. SUITE DE ACCESIBILIDAD WEB (A11Y CONTROLLER)
   ========================================================================== */
function initAccessibilityToolbar() {
  const toggleBtn = document.getElementById('a11y-toggle-btn');
  const panel = document.getElementById('a11y-panel');
  const closeBtn = document.getElementById('a11y-close-btn');

  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }

  // Controles de Tema / Contraste
  const btnThemeDefault = document.getElementById('btn-theme-default');
  const btnThemeContrast = document.getElementById('btn-theme-contrast');
  const btnThemeLight = document.getElementById('btn-theme-light');

  const setTheme = (mode) => {
    document.body.classList.remove('high-contrast', 'light-theme');
    [btnThemeDefault, btnThemeContrast, btnThemeLight].forEach(b => b && b.classList.remove('active'));

    if (mode === 'contrast') {
      document.body.classList.add('high-contrast');
      btnThemeContrast && btnThemeContrast.classList.add('active');
    } else if (mode === 'light') {
      document.body.classList.add('light-theme');
      btnThemeLight && btnThemeLight.classList.add('active');
    } else {
      btnThemeDefault && btnThemeDefault.classList.add('active');
    }
    localStorage.setItem('a11y-theme', mode);
  };

  btnThemeDefault?.addEventListener('click', () => setTheme('default'));
  btnThemeContrast?.addEventListener('click', () => setTheme('contrast'));
  btnThemeLight?.addEventListener('click', () => setTheme('light'));

  // Cargar preferencia guardada
  const savedTheme = localStorage.getItem('a11y-theme');
  if (savedTheme) setTheme(savedTheme);

  // Controles de Tamaño de Texto
  const btnTextMd = document.getElementById('btn-text-md');
  const btnTextLg = document.getElementById('btn-text-lg');
  const btnTextXl = document.getElementById('btn-text-xl');

  const setTextSize = (size) => {
    document.body.classList.remove('text-size-lg', 'text-size-xl');
    [btnTextMd, btnTextLg, btnTextXl].forEach(b => b && b.classList.remove('active'));

    if (size === 'lg') {
      document.body.classList.add('text-size-lg');
      btnTextLg && btnTextLg.classList.add('active');
    } else if (size === 'xl') {
      document.body.classList.add('text-size-xl');
      btnTextXl && btnTextXl.classList.add('active');
    } else {
      btnTextMd && btnTextMd.classList.add('active');
    }
  };

  btnTextMd?.addEventListener('click', () => setTextSize('md'));
  btnTextLg?.addEventListener('click', () => setTextSize('lg'));
  btnTextXl?.addEventListener('click', () => setTextSize('xl'));

  // Modo Dislexia
  const btnDyslexia = document.getElementById('btn-dyslexia');
  btnDyslexia?.addEventListener('click', () => {
    const active = document.body.classList.toggle('dyslexia-font');
    btnDyslexia.classList.toggle('active', active);
  });

  // Resaltar Enlaces
  const btnHighlightLinks = document.getElementById('btn-highlight-links');
  btnHighlightLinks?.addEventListener('click', () => {
    const active = document.body.classList.toggle('highlight-links');
    btnHighlightLinks.classList.toggle('active', active);
  });
}

/* ==========================================================================
   2. GENERADOR DINÁMICO DE QR PARA LA EXPO TÉCNICA (EL DESAFÍO)
   ========================================================================== */
let mainQrInstance = null;

function initDynamicQrGenerator() {
  const qrContainer = document.getElementById('qrcode-container');
  const qrTextInput = document.getElementById('qr-text-input');
  const qrSizeInput = document.getElementById('qr-size-input');
  const qrSizeLabel = document.getElementById('qr-size-label');
  const qrColorDark = document.getElementById('qr-color-dark');
  const qrColorLight = document.getElementById('qr-color-light');
  const qrCorrection = document.getElementById('qr-correction');
  const qrCaption = document.getElementById('qr-caption');
  const qrContrastNotice = document.getElementById('qr-contrast-notice');
  const btnDownloadPng = document.getElementById('btn-download-png');
  const btnCopyClipboard = document.getElementById('btn-copy-clipboard');
  const btnPrintCard = document.getElementById('btn-print-card');

  if (!qrContainer || !qrTextInput) return;

  // Función constructora con la API oficial qrcode.js indicada en el PDF
  function renderQr() {
    const text = qrTextInput.value.trim() || "https://github.com/gadyproductions";
    const size = parseInt(qrSizeInput?.value || 200, 10);
    const colorDark = qrColorDark?.value || "#000000";
    const colorLight = qrColorLight?.value || "#ffffff";
    const correctLevel = QRCode.CorrectLevel[qrCorrection?.value || 'H'] || QRCode.CorrectLevel.H;

    // Actualizar etiqueta de tamaño
    if (qrSizeLabel) qrSizeLabel.textContent = `${size}px`;

    // Limpiar contenedor previo
    qrContainer.innerHTML = '';

    try {
      // Implementación idéntica al ejemplo pedagógico de la consigna del PDF
      mainQrInstance = new QRCode(qrContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: correctLevel
      });

      // Actualizar texto debajo
      if (qrCaption) {
        qrCaption.textContent = text;
        qrCaption.title = text;
      }

      // Evaluar contraste entre el color de primer plano y fondo para advertir legibilidad
      evaluateQrContrast(colorDark, colorLight, qrContrastNotice);

    } catch (err) {
      console.error("Error al generar código QR:", err);
      qrContainer.innerHTML = `<p style="color:red;">Error al generar QR: ${err.message}</p>`;
    }
  }

  // Escuchadores de eventos en tiempo real
  qrTextInput.addEventListener('input', renderQr);
  qrSizeInput?.addEventListener('input', renderQr);
  qrColorDark?.addEventListener('input', renderQr);
  qrColorLight?.addEventListener('input', renderQr);
  qrCorrection?.addEventListener('change', renderQr);

  // Preajustes rápidos para la Expo Técnica
  const presetButtons = document.querySelectorAll('[data-preset-text]');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetUrl = btn.getAttribute('data-preset-text');
      qrTextInput.value = presetUrl;
      renderQr();
      qrTextInput.focus();
    });
  });

  // Descarga como imagen PNG
  btnDownloadPng?.addEventListener('click', () => {
    const imgOrCanvas = qrContainer.querySelector('canvas') || qrContainer.querySelector('img');
    if (!imgOrCanvas) return;

    let dataUrl = "";
    if (imgOrCanvas.tagName.toLowerCase() === 'canvas') {
      dataUrl = imgOrCanvas.toDataURL("image/png");
    } else {
      dataUrl = imgOrCanvas.src;
    }

    const downloadLink = document.createElement('a');
    downloadLink.download = `QR-ExpoTecnica-GadielSiles-${Date.now()}.png`;
    downloadLink.href = dataUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  // Copiar imagen al portapapeles
  btnCopyClipboard?.addEventListener('click', async () => {
    const canvas = qrContainer.querySelector('canvas');
    if (!canvas) {
      alert("Copia no soportada en este formato. Por favor usa 'Descargar PNG'.");
      return;
    }
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        const originalText = btnCopyClipboard.innerHTML;
        btnCopyClipboard.innerHTML = `<span>✓ ¡Copiado!</span>`;
        setTimeout(() => btnCopyClipboard.innerHTML = originalText, 2200);
      });
    } catch (e) {
      console.warn("Clipboard API no disponible:", e);
      alert("Copiado al portapapeles no permitido por el navegador. Usa 'Descargar PNG'.");
    }
  });

  // Imprimir ficha de la Expo
  btnPrintCard?.addEventListener('click', () => {
    window.print();
  });

  // Generación inicial
  renderQr();
}

/**
 * Evalúa el ratio de contraste entre los colores del QR para asegurar su legibilidad
 */
function evaluateQrContrast(colorDark, colorLight, targetElement) {
  if (!targetElement) return;
  const ratio = calculateContrastRatio(colorDark, colorLight);
  if (ratio >= 4.5) {
    targetElement.className = 'qr-contrast-badge good';
    targetElement.innerHTML = `✓ Ratio de contraste: <strong>${ratio.toFixed(2)}:1</strong> (Excelente legibilidad para cámaras y lectores)`;
  } else {
    targetElement.className = 'qr-contrast-badge bad';
    targetElement.innerHTML = `⚠️ Contraste insuficiente: <strong>${ratio.toFixed(2)}:1</strong> (Puede fallar al ser escaneado)`;
  }
}

/* ==========================================================================
   3. VISTA PREVIA DEL HERO
   ========================================================================== */
function initHeroQrPreview() {
  const container = document.getElementById('hero-qr-container');
  if (!container) return;

  try {
    new QRCode(container, {
      text: "https://github.com/gadyproductions/ACTIVIDAD-14-C-DIGOS-QR-Y-ACCESIBILIDAD---PWD-7-2-Grupo-B-",
      width: 130,
      height: 130,
      colorDark: "#0b0f19",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch (e) {
    console.warn("Hero QR error:", e);
  }
}

/* ==========================================================================
   4. ARTICULACIÓN CON EL PROYECTO ANUAL: MANUALES TÉCNICOS CON QR DINÁMICO
   ========================================================================== */
function initManualsModule() {
  const tabButtons = document.querySelectorAll('.tab-btn[data-target-manual]');
  const manualSections = document.querySelectorAll('.manual-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target-manual');
      tabButtons.forEach(b => b.classList.remove('active'));
      manualSections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Generación del código QR obligatorio en la última página del Manual de Usuario
  // Consigna del PDF: "En la última página, incluyan un código QR generado por código que lleve directamente a la encuesta de satisfacción o al repositorio GitHub del código fuente."
  const qrUserManual = document.getElementById('qr-user-manual-lastpage');
  if (qrUserManual) {
    qrUserManual.innerHTML = '';
    new QRCode(qrUserManual, {
      text: "https://forms.gle/expo-tecnica-satisfaccion-pwd-7-2-grupo-b",
      width: 140,
      height: 140,
      colorDark: "#0b0f19",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // Generación del código QR obligatorio en la última página del Manual de Programador
  const qrDevManual = document.getElementById('qr-dev-manual-lastpage');
  if (qrDevManual) {
    qrDevManual.innerHTML = '';
    new QRCode(qrDevManual, {
      text: "https://github.com/gadyproductions/ACTIVIDAD-14-C-DIGOS-QR-Y-ACCESIBILIDAD---PWD-7-2-Grupo-B-",
      width: 140,
      height: 140,
      colorDark: "#0b0f19",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
}

/* ==========================================================================
   5. VALIDADOR / ESCÁNER DE CÓDIGOS QR (CLIENT-SIDE)
   ========================================================================== */
function initQrScanner() {
  const dropzone = document.getElementById('qr-dropzone');
  const fileInput = document.getElementById('qr-file-input');
  const scanResultWrapper = document.getElementById('scan-result-card');
  const scanResultText = document.getElementById('scan-result-text');
  const scanResultLink = document.getElementById('scan-result-link');
  const btnToggleCamera = document.getElementById('btn-toggle-camera');
  const videoElem = document.getElementById('camera-video');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileQr(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileQr(e.target.files[0]);
    }
  });

  function handleFileQr(file) {
    if (!file.type.startsWith('image/')) {
      alert("Por favor selecciona una imagen válida (PNG, JPG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Intentar decodificar con jsQR si está presente
        if (typeof jsQR !== 'undefined') {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            displayScanResult(code.data);
          } else {
            displayScanResult(null, "No se detectó un código QR nítido en la imagen. Prueba con otra.");
          }
        } else {
          displayScanResult(null, "Biblioteca de decodificación jsQR cargándose. Intenta en unos segundos.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function displayScanResult(text, errorMsg = "") {
    if (!scanResultWrapper) return;
    scanResultWrapper.style.display = 'flex';

    if (errorMsg) {
      scanResultText.textContent = errorMsg;
      scanResultText.style.color = '#ef4444';
      if (scanResultLink) scanResultLink.style.display = 'none';
      return;
    }

    scanResultText.style.color = 'var(--accent-primary)';
    scanResultText.textContent = text;

    if (scanResultLink) {
      if (text.startsWith('http://') || text.startsWith('https://')) {
        scanResultLink.style.display = 'inline-flex';
        scanResultLink.href = text;
        scanResultLink.target = '_blank';
        scanResultLink.textContent = "Abrir Enlace ↗";
      } else {
        scanResultLink.style.display = 'none';
      }
    }
  }

  // Cámara Web en Tiempo Real
  let videoStream = null;
  let isScanningCamera = false;

  btnToggleCamera?.addEventListener('click', async () => {
    if (isScanningCamera) {
      stopCamera();
    } else {
      startCamera();
    }
  });

  async function startCamera() {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      videoElem.srcObject = videoStream;
      videoElem.setAttribute("playsinline", true);
      videoElem.style.display = 'block';
      await videoElem.play();
      isScanningCamera = true;
      btnToggleCamera.innerHTML = `<span>⏹ Detener Cámara</span>`;
      btnToggleCamera.classList.add('active');
      requestAnimationFrame(scanCameraFrame);
    } catch (err) {
      alert("No se pudo acceder a la cámara: " + err.message);
    }
  }

  function stopCamera() {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
    }
    videoElem.style.display = 'none';
    isScanningCamera = false;
    btnToggleCamera.innerHTML = `<span>📷 Escanear con Cámara Web</span>`;
    btnToggleCamera.classList.remove('active');
  }

  function scanCameraFrame() {
    if (!isScanningCamera) return;
    if (videoElem.readyState === videoElem.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElem.videoWidth;
      canvas.height = videoElem.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (typeof jsQR !== 'undefined') {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          displayScanResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    requestAnimationFrame(scanCameraFrame);
  }
}

/* ==========================================================================
   6. CALCULADORA DE CONTRASTE WCAG 2.1 (ALGORITMO OFICIAL W3C)
   ========================================================================== */
function initWcagContrastTool() {
  const fgInput = document.getElementById('calc-fg-color');
  const bgInput = document.getElementById('calc-bg-color');
  const ratioDisplay = document.getElementById('calc-ratio-value');
  const badgeAa = document.getElementById('calc-badge-aa');
  const badgeAaa = document.getElementById('calc-badge-aaa');
  const previewBox = document.getElementById('calc-preview-box');

  if (!fgInput || !bgInput) return;

  function update() {
    const fg = fgInput.value;
    const bg = bgInput.value;
    const ratio = calculateContrastRatio(fg, bg);

    if (previewBox) {
      previewBox.style.color = fg;
      previewBox.style.backgroundColor = bg;
    }

    if (ratioDisplay) {
      ratioDisplay.textContent = `${ratio.toFixed(2)}:1`;
    }

    // Criterio WCAG Normal Text: AA >= 4.5, AAA >= 7.0
    if (badgeAa) {
      const passesAa = ratio >= 4.5;
      badgeAa.className = `badge-wcag ${passesAa ? 'pass' : 'fail'}`;
      badgeAa.textContent = passesAa ? 'Nivel AA: Cumple' : 'Nivel AA: Falla';
    }

    if (badgeAaa) {
      const passesAaa = ratio >= 7.0;
      badgeAaa.className = `badge-wcag ${passesAaa ? 'pass' : 'fail'}`;
      badgeAaa.textContent = passesAaa ? 'Nivel AAA: Cumple' : 'Nivel AAA: Falla';
    }
  }

  fgInput.addEventListener('input', update);
  bgInput.addEventListener('input', update);
  update();
}

/**
 * Calcula el ratio de contraste entre dos colores HEX según la fórmula oficial de la W3C (WCAG 2.1)
 */
function calculateContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/* ==========================================================================
   7. LECTOR POR VOZ (TEXT-TO-SPEECH - WEB SPEECH API)
   ========================================================================== */
function initTextToSpeechSystem() {
  const hasSpeech = 'speechSynthesis' in window;
  const speakButtons = document.querySelectorAll('[data-read-target]');

  if (!hasSpeech) {
    speakButtons.forEach(btn => btn.style.display = 'none');
    return;
  }

  speakButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-read-target');
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        document.querySelectorAll('.tts-speaking').forEach(el => el.classList.remove('tts-speaking'));
        btn.classList.remove('active');
        return;
      }

      const text = targetElement.innerText || targetElement.textContent;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-AR';
      utterance.rate = 1.0;

      // Buscar voz en español si está disponible
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) utterance.voice = spanishVoice;

      targetElement.classList.add('tts-speaking');
      btn.classList.add('active');

      utterance.onend = () => {
        targetElement.classList.remove('tts-speaking');
        btn.classList.remove('active');
      };

      utterance.onerror = () => {
        targetElement.classList.remove('tts-speaking');
        btn.classList.remove('active');
      };

      window.speechSynthesis.speak(utterance);
    });
  });
}
