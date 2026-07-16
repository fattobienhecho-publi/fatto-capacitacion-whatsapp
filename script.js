const toast = document.querySelector("#toast");
const scoreNumber = document.querySelector("#scoreNumber");
const scoreBar = document.querySelector("#scoreBar");
const sellerTest = document.querySelector("#sellerTest");
const quizResult = document.querySelector("#quizResult");
const chatThread = document.querySelector("#chatThread");
const answerOptions = document.querySelector("#answerOptions");
const gameFeedback = document.querySelector("#gameFeedback");
const gameScore = document.querySelector("#gameScore");
const nextScenario = document.querySelector("#nextScenario");
const moduleProgress = document.querySelector("#moduleProgress");
const moduleToggle = document.querySelector("#moduleToggle");
const moduleMap = document.querySelector("#moduleMap");
const closeModuleMap = document.querySelector("#closeModuleMap");
const exampleImages = document.querySelector("#exampleImages");
const exampleType = document.querySelector("#exampleType");
const exampleNote = document.querySelector("#exampleNote");
const exampleSlide = document.querySelector("#exampleSlide");
const exampleCounter = document.querySelector("#exampleCounter");
const prevExample = document.querySelector("#prevExample");
const nextExample = document.querySelector("#nextExample");
const removeExample = document.querySelector("#removeExample");
const resetTest = document.querySelector("#resetTest");

const moduleIds = [
  "agenda",
  "errores",
  "metodo",
  "ofertas",
  "fuera-oferta",
  "diseno",
  "envio",
  "role-plays",
  "checklist",
  "test",
];

const roleScenarios = [
  {
    client: "¿Cuánto valen los stickers?",
    followup: "Listo, los necesito para marcar unos productos.",
    options: [
      {
        text: "Los 200 stickers están en 35.000. ¿Para qué los necesitas?",
        correct: true,
        feedback: "Correcto: respondes precio y haces una sola pregunta útil.",
      },
      {
        text: "¿Qué diseño necesitas?",
        correct: false,
        feedback: "No responde lo que el cliente preguntó. Primero va el precio.",
      },
      {
        text: "Manejamos varios materiales y depende de lo que quieras.",
        correct: false,
        feedback: "Da vueltas. La respuesta debe ser directa y corta.",
      },
    ],
  },
  {
    client: "¿Hacen pendones?",
    followup: "Quiero que la gente vea mi negocio desde la calle.",
    options: [
      {
        text: "Sí, claro. ¿Qué quieres lograr con el pendón? ¿Mostrar tus productos, atraer clientes o verte más profesional?",
        correct: true,
        feedback: "Correcto: confirma directo y diagnostica intención.",
      },
      {
        text: "Sí, manejamos medidas, materiales, estructuras y diferentes tipos de impresión.",
        correct: false,
        feedback: "Explica de más antes de entender lo que busca el cliente.",
      },
      {
        text: "¿Lo quieres bonito o sencillo?",
        correct: false,
        feedback: "La pregunta no guía la venta. Usa intención, no gusto visual.",
      },
    ],
  },
  {
    client: "¿Me puedes mostrar cómo quedaría?",
    followup: "Sí, se entiende claro.",
    options: [
      {
        text: "Aquí tienes el diseño. Lo trabajamos para que se vea claro, legible y alineado a lo que quieres lograr.",
        correct: true,
        feedback: "Correcto: presenta el diseño con autoridad y contexto.",
      },
      {
        text: "Te envío el diseño.",
        correct: false,
        feedback: "Queda frío y sin guía. La frase oficial evita comentarios innecesarios.",
      },
      {
        text: "Míralo y dime qué te parece.",
        correct: false,
        feedback: "Muy abierto. Puede generar cambios sin dirección.",
      },
    ],
  },
  {
    client: "Quiero cambiar algo, que se vea más bonito.",
    followup: "Cambiemos la foto principal por esta otra.",
    options: [
      {
        text: "Super, para hacerlo bien, ¿me confirmas qué parte específica quieres que ajustemos?",
        correct: true,
        feedback: "Correcto: obligas a concretar el cambio.",
      },
      {
        text: "Listo, le digo al diseñador que lo ponga más bonito.",
        correct: false,
        feedback: "No sirve porque el cambio no es específico.",
      },
      {
        text: "¿Qué colores, tipografía y estilo quieres?",
        correct: false,
        feedback: "Eso está prohibido: lo define el diseñador.",
      },
    ],
  },
  {
    client: "Ya me gustó el diseño.",
    followup: "Perfecto, quedo pendiente del envío.",
    options: [
      {
        text: "Perfecto, entonces lo enviamos a impresión.",
        correct: true,
        feedback: "Correcto: si ya aprobó, se cierra y se pasa a envío y pago.",
      },
      {
        text: "Perfecto, si quieres te hago otra versión.",
        correct: false,
        feedback: "No abras más debate cuando el cliente ya aprobó.",
      },
      {
        text: "Bueno, cualquier cosa me avisas.",
        correct: false,
        feedback: "Pierde el cierre. Hay que avanzar.",
      },
    ],
  },
  {
    client: "¿Cuánto queda con envío?",
    followup: "Estoy en el norte.",
    options: [
      {
        text: "Perfecto, son _____. ¿En qué zona estás para confirmarte el envío?",
        correct: true,
        feedback: "Correcto: precio, zona y luego opciones de pago.",
      },
      {
        text: "El envío depende de tu zona, luego miramos.",
        correct: false,
        feedback: "Falta guiar con una pregunta concreta.",
      },
      {
        text: "Me pasas nombre, dirección y número.",
        correct: false,
        feedback: "Los datos se piden solo después de elegir cómo pagar.",
      },
    ],
  },
];

const quizExplanations = [
  "Primero se responde la pregunta concreta del cliente.",
  "El diagnóstico debe ser una sola pregunta corta.",
  "Para diseño solo se pide logo, foto o referencia e información mínima.",
  "El vendedor no debe pedir tipografías; eso lo define el diseñador.",
  "En volantes se envían las 3 medidas y luego se recomienda.",
  "En avisos se pide foto del lugar, medida e interior/exterior.",
  "La frase oficial da contexto y autoridad al diseño.",
  "Cuando el cambio es ambiguo, se pide precisión.",
  "Si el cliente aprueba, se cierra para impresión.",
  "Nombre, dirección y número se piden después de que el cliente elige cómo pagar.",
];

let currentScenario = 0;
let roleGameScore = 0;
let examples = getSavedImages("fatto-example-carousel");
let currentExample = 0;

document.querySelectorAll(".agenda-pill").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToModule(button.dataset.target);
  });
});

document.querySelectorAll(".module-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToModule(link.getAttribute("href").replace("#", ""));
    closeProgressPanel();
  });
});

moduleToggle?.addEventListener("click", () => {
  const isOpen = moduleMap?.classList.toggle("open");
  moduleToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  moduleMap?.setAttribute("aria-hidden", String(!isOpen));
});

closeModuleMap?.addEventListener("click", closeProgressPanel);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProgressPanel();
});

document.addEventListener("click", (event) => {
  if (!moduleMap?.classList.contains("open")) return;
  const target = event.target;
  if (moduleMap.contains(target) || moduleToggle?.contains(target)) return;
  closeProgressPanel();
});

document.addEventListener("click", async (event) => {
  const copyButton = event.target.closest(".copy-button");
  if (!copyButton || !copyButton.dataset.copy) return;

  await copyText(copyButton.dataset.copy);
  showToast("Respuesta copiada");
});

document.querySelectorAll("[data-edit-key]").forEach((field) => {
  const saved = localStorage.getItem(`fatto-tool-${field.dataset.editKey}`);
  if (saved) field.innerText = saved;

  field.addEventListener("input", () => {
    localStorage.setItem(`fatto-tool-${field.dataset.editKey}`, field.innerText.trim());
  });

  field.addEventListener("blur", () => {
    showToast("Cambio guardado");
  });
});

document.addEventListener("click", async (event) => {
  const copyTargetButton = event.target.closest("[data-copy-target]");
  if (!copyTargetButton) return;

  const field = document.querySelector(`[data-edit-key="${copyTargetButton.dataset.copyTarget}"]`);
  const text = field?.innerText.trim();
  if (!text) {
    showToast("No hay texto para copiar");
    return;
  }

  await copyText(text);
  showToast("Prompt copiado");
});

document.addEventListener("click", (event) => {
  const openTargetButton = event.target.closest("[data-open-target]");
  if (!openTargetButton) return;

  const field = document.querySelector(`[data-edit-key="${openTargetButton.dataset.openTarget}"]`);
  const url = field?.innerText.trim();
  if (!url || !/^https?:\/\//i.test(url)) {
    showToast("Pega primero un link que empiece por http");
    return;
  }

  window.open(url, "_blank", "noopener");
});

document.querySelectorAll(".product-upload input").forEach((input) => {
  input.addEventListener("change", () => {
    const card = input.closest(".product-guide-card");
    const image = card.querySelector(".product-image");
    const file = input.files?.[0];

    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      image.src = reader.result;
      image.alt = "Foto del producto cargada";
      setSavedImages(`producto-${card.dataset.productId}`, [reader.result]);
      showToast("Foto del producto actualizada");
    });
    reader.readAsDataURL(file);
    input.value = "";
  });
});

exampleImages?.addEventListener("change", () => {
  const files = [...exampleImages.files].filter((file) => file.type.startsWith("image/"));
  if (!files.length) return;

  let loaded = 0;
  files.forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      examples.push({
        src: reader.result,
        type: exampleType.value,
        note: exampleNote.value.trim() || "Analizar qué respondió el vendedor y cómo debería corregirse.",
        date: new Date().toLocaleDateString("es-CO"),
      });
      loaded += 1;

      if (loaded === files.length) {
        currentExample = examples.length - 1;
        saveExampleCarousel();
        renderExampleCarousel();
        showToast("Ejemplos agregados al carrusel");
      }
    });
    reader.readAsDataURL(file);
  });

  exampleImages.value = "";
});

prevExample?.addEventListener("click", () => {
  if (!examples.length) return;
  currentExample = (currentExample - 1 + examples.length) % examples.length;
  renderExampleCarousel();
});

nextExample?.addEventListener("click", () => {
  if (!examples.length) return;
  currentExample = (currentExample + 1) % examples.length;
  renderExampleCarousel();
});

removeExample?.addEventListener("click", () => {
  if (!examples.length) return;
  examples.splice(currentExample, 1);
  currentExample = Math.max(0, currentExample - 1);
  saveExampleCarousel();
  renderExampleCarousel();
  showToast("Ejemplo quitado");
});

document.querySelectorAll(".checklist input").forEach((checkbox) => {
  checkbox.addEventListener("change", updateScore);
});

sellerTest?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(sellerTest);
  const totalQuestions = 10;
  let score = 0;
  const missed = [];

  sellerTest.querySelectorAll("fieldset").forEach((fieldset) => {
    fieldset.classList.remove("answered-ok", "answered-bad");
  });

  for (let index = 1; index <= totalQuestions; index += 1) {
    const value = Number(data.get(`q${index}`) || 0);
    score += value;
    const fieldset = sellerTest.querySelector(`[name="q${index}"]`)?.closest("fieldset");
    fieldset?.classList.add(value ? "answered-ok" : "answered-bad");
    if (!value) missed.push({ index, explanation: quizExplanations[index - 1] });
  }

  const sellerName = String(data.get("sellerName") || "Vendedor").trim();
  const written = String(data.get("written") || "").toLowerCase();
  const hasGoodWritten =
    written.includes("perfecto") &&
    written.includes("zona") &&
    written.includes("envío") &&
    (written.includes("opciones") || written.includes("contra entrega") || written.includes("anticipado"));

  const percentage = Math.round((score / totalQuestions) * 100);
  const status = percentage >= 80 ? "Aprobado" : percentage >= 60 ? "Debe reforzar" : "Repetir capacitación";
  const missedHtml = missed.length
    ? `<ul>${missed.map((item) => `<li>Pregunta ${item.index}: ${item.explanation}</li>`).join("")}</ul>`
    : "<p>Sin preguntas por repasar.</p>";

  quizResult.innerHTML = `
    <strong>${sellerName}: ${status}</strong>
    <p>Resultado: ${score}/${totalQuestions} respuestas correctas (${percentage}%).</p>
    <p><strong>Respuesta escrita:</strong> ${
      hasGoodWritten
        ? "Incluye señales correctas de la frase oficial de envío."
        : "Revisar: debe incluir precio, zona, envío y opciones de pago."
    }</p>
    <p><strong>Qué debe repasar:</strong></p>
    ${missedHtml}
  `;
});

resetTest?.addEventListener("click", () => {
  sellerTest?.reset();
  quizResult.innerHTML = "";
  sellerTest?.querySelectorAll("fieldset").forEach((fieldset) => {
    fieldset.classList.remove("answered-ok", "answered-bad");
  });
});

nextScenario?.addEventListener("click", () => {
  currentScenario = (currentScenario + 1) % roleScenarios.length;
  renderScenario();
});

function scrollToModule(id) {
  const target = document.querySelector(`#${id}`);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  setActiveModule(id);
}

function setActiveModule(id) {
  document.querySelectorAll(".agenda-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.target === id);
  });

  document.querySelectorAll(".module-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });

  const index = moduleIds.indexOf(id);
  if (moduleProgress && index >= 0) moduleProgress.textContent = `${index + 1}/${moduleIds.length}`;
}

function closeProgressPanel() {
  moduleMap?.classList.remove("open");
  moduleToggle?.setAttribute("aria-expanded", "false");
  moduleMap?.setAttribute("aria-hidden", "true");
}

function observeSections() {
  const sections = moduleIds.map((id) => document.querySelector(`#${id}`)).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveModule(visible.target.id);
    },
    { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] },
  );

  sections.forEach((section) => observer.observe(section));
}

function updateScore() {
  const checks = [...document.querySelectorAll(".checklist input")];
  const completed = checks.filter((check) => check.checked).length;
  const total = checks.length;

  scoreNumber.textContent = `${completed}/${total}`;
  scoreBar.style.width = `${(completed / total) * 100}%`;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("show"), 1700);
}

function renderScenario() {
  if (!chatThread || !answerOptions || !gameFeedback) return;

  const scenario = roleScenarios[currentScenario];
  chatThread.innerHTML = "";
  addChatBubble("customer", scenario.client);
  answerOptions.innerHTML = "";
  gameFeedback.textContent = "Elige la mejor respuesta del vendedor.";
  nextScenario.disabled = true;

  scenario.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => chooseAnswer(button, option, scenario));
    answerOptions.appendChild(button);
  });
}

function chooseAnswer(selectedButton, selectedOption, scenario) {
  const buttons = [...answerOptions.querySelectorAll(".answer-option")];
  buttons.forEach((button) => {
    button.disabled = true;
    const option = scenario.options.find((item) => item.text === button.textContent);
    if (option?.correct) button.classList.add("correct");
  });

  addChatBubble("seller", selectedOption.text);
  addChatBubble("customer", selectedOption.correct ? scenario.followup : "No entiendo bien. ¿Me confirmas?");

  if (selectedOption.correct) {
    roleGameScore += 1;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  gameScore.textContent = roleGameScore;
  gameFeedback.textContent = selectedOption.feedback;
  nextScenario.disabled = false;
}

function addChatBubble(type, text) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${type}`;
  bubble.innerHTML = `<span>${type === "customer" ? "Cliente" : "Vendedor"}</span>${escapeHtml(text)}`;
  chatThread.appendChild(bubble);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function renderExampleCarousel() {
  if (!exampleSlide || !exampleCounter) return;

  if (!examples.length) {
    exampleSlide.innerHTML = `
      <div class="empty-slide">
        <strong>Aún no hay ejemplos cargados.</strong>
        <span>Sube capturas para crear el carrusel de análisis.</span>
      </div>
    `;
    exampleCounter.textContent = "0/0";
    removeExample.disabled = true;
    return;
  }

  const example = examples[currentExample];
  exampleSlide.innerHTML = `
    <img src="${example.src}" alt="Ejemplo real de conversación" />
    <figcaption>
      <strong>${escapeHtml(example.type)}</strong>
      <span>${escapeHtml(example.note)}</span>
      <small>Cargado: ${escapeHtml(example.date)}</small>
    </figcaption>
  `;
  exampleCounter.textContent = `${currentExample + 1}/${examples.length}`;
  removeExample.disabled = false;
}

function saveExampleCarousel() {
  setSavedImages("fatto-example-carousel", examples);
}

function loadProductImages() {
  document.querySelectorAll(".product-guide-card").forEach((card) => {
    const saved = getSavedImages(`producto-${card.dataset.productId}`);
    const image = card.querySelector(".product-image");
    if (saved[0] && image) {
      image.src = saved[0];
      image.alt = "Foto del producto cargada";
    }
  });
}

function getSavedImages(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setSavedImages(key, images) {
  try {
    localStorage.setItem(key, JSON.stringify(images));
  } catch {
    showToast("La imagen es muy pesada para guardarse en este navegador");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

observeSections();
loadProductImages();
renderExampleCarousel();
renderScenario();
