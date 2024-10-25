let savedRange = null; // Variable para guardar el rango de selección

// Muestra el menú de estilos cuando hay texto seleccionado
document.addEventListener("mouseup", function (event) {
  const selection = window.getSelection();
  const styleMenu = document.getElementById("styleMenu");
  const askAssistant = document.getElementById("askAssistant");

  // Verificar si el click está dentro de "styleMenu" o "askAssistant"
  if (
    !styleMenu.contains(event.target) &&
    !askAssistant.contains(event.target)
  ) {
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      savedRange = selection.getRangeAt(0).cloneRange(); // Clonar el rango seleccionado
      const rect = savedRange.getBoundingClientRect();

      // Posicionar el menú flotante cerca de la selección
      styleMenu.style.top = `${rect.top + window.scrollY - 30}px`;
      styleMenu.style.left = `${rect.right + window.scrollX + 10}px`;
      styleMenu.style.display = "block";
    } else {
      styleMenu.style.display = "none";
      askAssistant.style.display = "none"; // Ocultar el cuadro de pregunta si no hay selección
    }
  }
});

// Aplica el estilo al texto seleccionado
function applyStyle(style) {
  document.execCommand(style, false, null);
}

// Activa el cuadro de pregunta sin perder la selección
function toggleAskAssistant() {
  const askAssistant = document.getElementById("askAssistant");

  if (askAssistant.style.display === "none") {
    askAssistant.style.display = "block";

    // Restaurar el rango de selección después de un breve retraso
    setTimeout(() => {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }, 0);
  } else {
    askAssistant.style.display = "none";
  }
}

// Enviar pregunta al "asistente" y restaurar el menú
function submitQuestion() {
  const questionText = document.getElementById("assistantQuestion").value;

  // Simulación de envío al asistente
  console.log("Pregunta enviada al asistente:", questionText);

  // Limpiar la pregunta y restaurar el menú
  document.getElementById("assistantQuestion").value = ""; // Limpiar el área de texto
  document.getElementById("askAssistant").style.display = "none"; // Ocultar la sección de pregunta
}
