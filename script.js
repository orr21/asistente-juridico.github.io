// Lista de personas con antecedentes predefinidos
const people = {
    "Juan Pérez": "tiene antecedentes de hurto y delitos menores en 2020.",
    "María Gómez": "estuvo involucrada en fraudes fiscales entre 2018 y 2021.",
    "Carlos Rodríguez": "fue acusado de tráfico de drogas en 2019.",
    "Ana Martínez": "fue condenada por lavado de dinero en 2022."
};

// Variables para almacenar el valor actual de la sugerencia
let currentSuggestion = "";
let isNameDetected = false; // Para marcar si un nombre ha sido detectado

// Actualizar la vista previa en tiempo real
document.getElementById("documentText").addEventListener("input", function() {
    const inputText = this.value;
    document.getElementById("documentPreview").innerText = inputText;

    // Llamar a la función que detecta nombres y sugiere antecedentes
    detectNameAndSuggest(inputText);
});

// Función para detectar si hay un nombre en el texto y sugerir los antecedentes
function detectNameAndSuggest(text) {
    let lastWord = text.split(" ").slice(-2).join(" "); // Últimas dos palabras
    let suggestions = [];

    // Buscar si el nombre completo coincide con las últimas palabras escritas
    for (const [name, record] of Object.entries(people)) {
        if (name.toLowerCase() === lastWord.trim().toLowerCase()) {
            currentSuggestion = record;
            suggestions.push(record);
            isNameDetected = true;
            break;
        } else {
            isNameDetected = false;
        }
    }

    // Mostrar sugerencias si se detecta un nombre
    if (suggestions.length > 0) {
        document.getElementById("suggestionsList").innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
    } else {
        currentSuggestion = "";
        document.getElementById("suggestionsList").innerHTML = "";
    }
}

// Detectar cuando se presiona la tecla Tab para autocompletar con los antecedentes
document.getElementById("documentText").addEventListener("keydown", function(e) {
    if (e.key === "Tab" && currentSuggestion && isNameDetected) {
        e.preventDefault(); // Prevenir el comportamiento estándar de Tab
        this.value += " " + currentSuggestion; // Autocompletar con los antecedentes
        document.getElementById("documentPreview").innerText = this.value; // Actualizar la vista previa
        document.getElementById("suggestionsList").innerHTML = ""; // Limpiar sugerencias
        currentSuggestion = ""; // Limpiar la sugerencia actual
        isNameDetected = false; // Restablecer el estado de detección de nombre
    }
});

// Borrar el contenido del documento
document.getElementById("clearButton").addEventListener("click", function() {
    document.getElementById("documentText").value = "";
    document.getElementById("documentPreview").innerText = "";
    document.getElementById("suggestionsList").innerHTML = "";
});

// Descargar el documento como archivo de texto
document.getElementById("downloadButton").addEventListener("click", function() {
    let text = document.getElementById("documentText").value;
    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "documento.txt";
    link.click();
});
