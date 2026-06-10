const toast = document.querySelector("#toast");
const scoreNumber = document.querySelector("#scoreNumber");
const scoreBar = document.querySelector("#scoreBar");
const sellerTest = document.querySelector("#sellerTest");
const quizResult = document.querySelector("#quizResult");
const clientMessage = document.querySelector("#clientMessage");
const answerOptions = document.querySelector("#answerOptions");
const gameFeedback = document.querySelector("#gameFeedback");
const gameScore = document.querySelector("#gameScore");
const nextScenario = document.querySelector("#nextScenario");

const roleScenarios = [
  {
    client: "Hola, ¿cuánto valen los stickers?",
    options: [
      {
        text: "Los 200 stickers están en 35.000. ¿Para qué los necesitas? Así te recomiendo el material.",
        correct: true,
        feedback: "Correcto: responde directo el precio y luego diagnostica con una pregunta útil.",
      },
      {
        text: "Cuéntame qué tipo de stickers necesitas y miramos.",
        correct: false,
        feedback: "No es la mejor: el cliente preguntó precio y todavía no recibió respuesta.",
      },
      {
        text: "Manejamos vinilo, mate, brillante y varios tamaños.",
        correct: false,
        feedback: "Da demasiadas vueltas. Primero responde directo.",
      },
    ],
  },
  {
    client: "¿Hacen volantes?",
    options: [
      {
        text: "Sí, los hacemos. ¿Para qué campaña los necesitas?",
        correct: true,
        feedback: "Correcto: confirma que sí se hace y diagnostica sin enredar.",
      },
      {
        text: "Sí, manejamos varios gramajes, tamaños y papel couché.",
        correct: false,
        feedback: "Todavía no preguntaste para qué los necesita. Es explicar sin diagnosticar.",
      },
      {
        text: "Depende, mándame todo lo que tengas.",
        correct: false,
        feedback: "Muy abierto. El vendedor debe guiar con una pregunta corta.",
      },
    ],
  },
  {
    client: "Me gusta el diseño.",
    options: [
      {
        text: "Si te gusta esta versión, preparo la orden.",
        correct: true,
        feedback: "Correcto: convierte aprobación en cierre.",
      },
      {
        text: "Perfecto, cualquier cosa me avisas.",
        correct: false,
        feedback: "Se pierde el cierre. Hay que avanzar a la orden.",
      },
      {
        text: "Bueno, entonces te mando más opciones.",
        correct: false,
        feedback: "Si ya le gusta, no abras más vueltas: cierra.",
      },
    ],
  },
  {
    client: "El envío está caro.",
    options: [
      {
        text: "Sí, en productos económicos pasa mucho. Si lo haces anticipado, te queda más económico porque no te cobran el recaudo.",
        correct: true,
        feedback: "Correcto: valida la objeción y muestra una opción concreta.",
      },
      {
        text: "Ese es el precio del envío, no puedo hacer nada.",
        correct: false,
        feedback: "Corta la venta. El método propone explicar y dar opciones.",
      },
      {
        text: "Entonces mejor compra más cosas.",
        correct: false,
        feedback: "La idea puede ser completar envío gratis, pero debe decirse con cuidado y con opción.",
      },
    ],
  },
  {
    client: "Listo, lo hago anticipado.",
    options: [
      {
        text: "Perfecto, para procesarlo necesito: nombre, dirección y número de contacto.",
        correct: true,
        feedback: "Correcto: ya eligió, ahora sí pides datos.",
      },
      {
        text: "¿Estás seguro? También existe contra entrega.",
        correct: false,
        feedback: "Ya decidió. No vuelvas a abrir la conversación.",
      },
      {
        text: "Bueno, espera te confirmo si se puede.",
        correct: false,
        feedback: "Pierde seguridad. El siguiente paso es procesar la orden.",
      },
    ],
  },
];

let currentScenario = 0;
let roleGameScore = 0;

const updatedRoleScenarios = [
  {
    client: "¿Cuánto valen los stickers?",
    options: [
      {
        text: "Los 200 stickers están en 35.000. ¿Para qué los necesitas?",
        correct: true,
        feedback: "Correcto: responde exactamente lo que pregunta y diagnostica con una sola pregunta.",
      },
      {
        text: "¿Qué diseño necesitas?",
        correct: false,
        feedback: "No responde la pregunta concreta. Eso genera desconfianza inmediata.",
      },
      {
        text: "Manejamos muchos materiales y tamaños, depende de lo que quieras.",
        correct: false,
        feedback: "Da vueltas. Primero va el precio, luego una pregunta corta.",
      },
    ],
  },
  {
    client: "¿Hacen pendones?",
    options: [
      {
        text: "Sí, claro. ¿Qué quieres lograr con el pendón? ¿Mostrar tus productos, atraer clientes o verte más profesional?",
        correct: true,
        feedback: "Correcto: confirma directo y usa pregunta de intención del producto.",
      },
      {
        text: "Sí, manejamos varias medidas, materiales, estructuras y tipos de impresión.",
        correct: false,
        feedback: "Demasiada explicación. El cliente todavía no pidió detalles técnicos.",
      },
      {
        text: "¿Lo quieres bonito o sencillo?",
        correct: false,
        feedback: "Abre una conversación confusa. La pregunta debe guiar intención.",
      },
    ],
  },
  {
    client: "¿Me puedes mostrar cómo quedaría?",
    options: [
      {
        text: "Aquí tienes el diseño. Lo trabajamos para que se vea claro, legible y alineado a lo que quieres lograr.",
        correct: true,
        feedback: "Correcto: envía el diseño con contexto, autoridad y claridad.",
      },
      {
        text: "Te envío el diseño.",
        correct: false,
        feedback: "Queda corto. La frase oficial da contexto y evita comentarios innecesarios.",
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
    options: [
      {
        text: "Super, para hacerlo bien, ¿me confirmas qué parte específica quieres que ajustemos?",
        correct: true,
        feedback: "Correcto: obliga a concretar y evita cambios ambiguos.",
      },
      {
        text: "Listo, le digo al diseñador que lo ponga más bonito.",
        correct: false,
        feedback: "No sirve: el cambio no es claro y puede abrir caos.",
      },
      {
        text: "¿Qué colores, tipografía y estilo quieres?",
        correct: false,
        feedback: "Prohibido. Eso lo define el diseñador, no el vendedor.",
      },
    ],
  },
  {
    client: "Ya me gustó el diseño.",
    options: [
      {
        text: "Perfecto, entonces lo enviamos a impresión.",
        correct: true,
        feedback: "Correcto: cuando está aprobado, se cierra y se pasa a envío y pago.",
      },
      {
        text: "Perfecto, si quieres te hago otra versión.",
        correct: false,
        feedback: "No abras más debate cuando el cliente ya aprobó.",
      },
      {
        text: "Bueno, cualquier cosa me avisas.",
        correct: false,
        feedback: "Pierde el cierre. Hay que avanzar a impresión.",
      },
    ],
  },
  {
    client: "Necesito volantes para mi negocio.",
    options: [
      {
        text: "¿Qué quieres lograr con los volantes: dar a conocer tu negocio, mostrar precios u ofertas o entregar información rápida?",
        correct: true,
        feedback: "Correcto: en volantes se pregunta intención y luego se envían las 3 medidas con precios.",
      },
      {
        text: "¿Qué gramaje quieres y qué tamaño exacto necesitas?",
        correct: false,
        feedback: "No es lo recomendado. En volantes la parte técnica se envía con las 3 medidas.",
      },
      {
        text: "Mándame el diseño exacto y los colores que quieres.",
        correct: false,
        feedback: "No pidas colores ni diseño exacto. Eso lo define el diseñador.",
      },
    ],
  },
  {
    client: "Quiero un menú para mi restaurante.",
    options: [
      {
        text: "¿Qué quieres lograr con tu menú: actualizar precios, hacerlo más claro o cambiar el estilo? ¿Lo quieres en papel o plastificado/rígido?",
        correct: true,
        feedback: "Correcto: pregunta intención y una pregunta técnica que el cliente sí entiende.",
      },
      {
        text: "¿Qué tipografía y estilo visual quieres para el menú?",
        correct: false,
        feedback: "Eso no lo debe pedir el vendedor. Lo define el diseñador.",
      },
      {
        text: "Los menús pueden tener muchos acabados, gramajes y opciones de laminado.",
        correct: false,
        feedback: "Explica de más antes de entender la necesidad.",
      },
    ],
  },
  {
    client: "Necesito un aviso grande para mi local.",
    options: [
      {
        text: "¿Tienes una foto del lugar donde lo quieres poner? ¿Qué medida lo necesitas? ¿Es para interior o exterior?",
        correct: true,
        feedback: "Correcto: en avisos se piden datos clave; la foto ayuda a definir interior/exterior.",
      },
      {
        text: "¿Qué objetivo quieres lograr con el aviso?",
        correct: false,
        feedback: "En avisos no se pregunta objetivo porque todos buscan que los vean y entiendan.",
      },
      {
        text: "¿Qué colores, borde y sombra quieres?",
        correct: false,
        feedback: "Prohibido: esos criterios los define el diseñador.",
      },
    ],
  },
  {
    client: "Necesito tarjetas o plegables.",
    options: [
      {
        text: "¿Qué medida lo necesitas? ¿Tienes el arte o quieres que lo preparemos? ¿Tienes una foto o referencia de lo que buscas?",
        correct: true,
        feedback: "Correcto: en litografía la medida es clave para dar precio exacto.",
      },
      {
        text: "¿Quieres que te haga una propuesta?",
        correct: false,
        feedback: "Esa pregunta está prohibida. El vendedor pide lo mínimo y el diseñador define.",
      },
      {
        text: "Primero dime qué tipografía te gusta.",
        correct: false,
        feedback: "No se debe pedir tipografía. Eso lo define el diseñador.",
      },
    ],
  },
  {
    client: "¿Cuánto queda con envío?",
    options: [
      {
        text: "Perfecto, son _____. ¿En qué zona estás para confirmarte el envío?",
        correct: true,
        feedback: "Correcto: primero precio, luego zona para confirmar envío.",
      },
      {
        text: "El envío depende de tu zona, luego miramos.",
        correct: false,
        feedback: "Falta ordenar la conversación y avanzar con una pregunta concreta.",
      },
      {
        text: "Me pasas nombre, dirección y número.",
        correct: false,
        feedback: "Todavía no eligió cómo pagar. Los datos se piden después.",
      },
    ],
  },
  {
    client: "Estoy en el norte.",
    options: [
      {
        text: "Listo, el envío te queda en ____. Tengo dos opciones de pago: contra entrega: producto + envío. Pago anticipado: el envío queda más económico porque no te cobran el recaudo. Si superas los 100.000, el envío queda gratis. ¿Cuál prefieres?",
        correct: true,
        feedback: "Correcto: confirma envío, da dos opciones y pregunta cuál prefiere.",
      },
      {
        text: "Perfecto, entonces te cobro contra entrega.",
        correct: false,
        feedback: "No debes imponer una opción. Presenta las dos opciones de pago.",
      },
      {
        text: "Entonces mándame los datos.",
        correct: false,
        feedback: "Aún falta que el cliente elija cómo pagar.",
      },
    ],
  },
  {
    client: "El envío está caro.",
    options: [
      {
        text: "Entiendo, en productos económicos pasa mucho. Si lo haces anticipado, el envío queda más económico porque no te cobran el recaudo.",
        correct: true,
        feedback: "Correcto: valida la objeción y explica la opción anticipada.",
      },
      {
        text: "Ese es el precio, no puedo hacer nada.",
        correct: false,
        feedback: "Corta la venta. El método propone explicar con calma.",
      },
      {
        text: "Entonces compra más para que sea gratis.",
        correct: false,
        feedback: "Puede sonar forzado. Además hay restricciones internas para roll up y araña.",
      },
    ],
  },
  {
    client: "Listo, pago anticipado.",
    options: [
      {
        text: "Perfecto. Necesito: nombre, dirección y número.",
        correct: true,
        feedback: "Correcto: solo después de que el cliente elige cómo pagar se piden datos.",
      },
      {
        text: "¿Seguro? También puedes pagar contra entrega.",
        correct: false,
        feedback: "Ya eligió. No vuelvas a abrir la decisión.",
      },
      {
        text: "Primero dime qué colores quieres para el diseño.",
        correct: false,
        feedback: "No corresponde y además colores es algo que define el diseñador.",
      },
    ],
  },
];

document.querySelectorAll(".agenda-pill").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`#${button.dataset.target}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });

    document.querySelectorAll(".agenda-pill").forEach((pill) => pill.classList.remove("active"));
    button.classList.add("active");
  });
});

document.addEventListener("click", async (event) => {
  const copyButton = event.target.closest(".copy-button");
  if (!copyButton) return;

  await copyText(copyButton.dataset.copy);
  showToast("Respuesta copiada");
});

document.querySelectorAll(".upload-box input").forEach((input) => {
  input.addEventListener("change", () => {
    const card = input.closest(".error-card");
    const grid = card.querySelector(".preview-grid");

    [...input.files].forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        addPreview(grid, reader.result);
        saveImages(card);
      });
      reader.readAsDataURL(file);
    });

    input.value = "";
  });
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

document.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-image");
  if (!removeButton) return;

  const card = removeButton.closest(".error-card");
  removeButton.closest(".preview").remove();
  saveImages(card);
});

document.querySelectorAll(".checklist input").forEach((checkbox) => {
  checkbox.addEventListener("change", updateScore);
});

sellerTest?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(sellerTest);
  const totalQuestions = 10;
  let score = 0;

  for (let index = 1; index <= totalQuestions; index += 1) {
    score += Number(data.get(`q${index}`) || 0);
  }

  const written = String(data.get("written") || "").toLowerCase();
  const hasGoodWritten =
    written.includes("perfecto") &&
    written.includes("zona") &&
    written.includes("envío") &&
    (written.includes("opciones") || written.includes("contra entrega") || written.includes("anticipado"));

  const percentage = Math.round((score / totalQuestions) * 100);
  const message =
    percentage >= 80
      ? "Muy bien. Maneja el método y puede aplicarlo en WhatsApp."
      : percentage >= 60
        ? "Va bien, pero debe repasar el cierre con envío y las preguntas clave."
        : "Debe reforzar el Método Núcleo antes de atender conversaciones reales.";

  quizResult.innerHTML = `
    <strong>Resultado: ${score}/${totalQuestions} respuestas correctas (${percentage}%).</strong>
    <p>${message}</p>
    <p><strong>Revisión de la respuesta escrita:</strong> ${
      hasGoodWritten
        ? "Incluye señales correctas de la frase oficial de envío."
        : "Revisa que incluya precio, zona, envío y opciones de pago."
    }</p>
  `;
});

nextScenario?.addEventListener("click", () => {
  currentScenario = (currentScenario + 1) % updatedRoleScenarios.length;
  renderScenario();
});

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
  if (!clientMessage || !answerOptions || !gameFeedback) return;

  const scenario = updatedRoleScenarios[currentScenario];
  clientMessage.textContent = `Cliente: ${scenario.client}`;
  answerOptions.innerHTML = "";
  gameFeedback.textContent = "Elige la mejor respuesta del vendedor.";

  scenario.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => chooseAnswer(button, option));
    answerOptions.appendChild(button);
  });
}

function chooseAnswer(selectedButton, selectedOption) {
  const buttons = [...answerOptions.querySelectorAll(".answer-option")];
  buttons.forEach((button) => {
    button.disabled = true;
    const option = updatedRoleScenarios[currentScenario].options.find((item) => item.text === button.textContent);
    if (option?.correct) button.classList.add("correct");
  });

  if (selectedOption.correct) {
    roleGameScore += 1;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  gameScore.textContent = roleGameScore;
  gameFeedback.textContent = selectedOption.feedback;
}

function addPreview(grid, src) {
  const preview = document.createElement("figure");
  preview.className = "preview";
  preview.innerHTML = `
    <img src="${src}" alt="Ejemplo real cargado" />
    <button class="remove-image" type="button" aria-label="Quitar imagen">x</button>
  `;
  grid.appendChild(preview);
}

function saveImages(card) {
  const images = [...card.querySelectorAll(".preview img")].map((image) => image.src);
  setSavedImages(`fatto-${card.dataset.errorId}`, images);
}

function loadImages() {
  document.querySelectorAll(".error-card").forEach((card) => {
    const saved = getSavedImages(`fatto-${card.dataset.errorId}`);
    const grid = card.querySelector(".preview-grid");
    saved.forEach((src) => addPreview(grid, src));
  });
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
    showToast("Imagen cargada para esta sesión");
  }
}

loadImages();
loadProductImages();
renderScenario();
