document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const searchText = params.get("text");
    const styledTextElement = document.getElementById("styledText");
  
    // Colocar el texto pasado desde index.html en el contenteditable
    if (searchText) {
      styledTextElement.textContent = searchText;
    } else {
      styledTextElement.textContent = ""; // Dejarlo vacío si no hay texto, pero siempre editable
    }
  
    let currentRange;
  
    // Mostrar el menú cuando haya texto seleccionado
    styledTextElement.addEventListener("mouseup", showMenu);
    styledTextElement.addEventListener("keyup", showMenu); // También para cuando se usa el teclado
  
    function showMenu(event) {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        const menu = document.getElementById("styleMenu");
        menu.style.display = "block";
        menu.style.top = event.pageY + "px";
        menu.style.left = event.pageX + "px";
  
        // Mantener el rango de selección
        currentRange = selection.getRangeAt(0);
  
        // Verificar si el texto está en cursiva y cambiar el botón de cursiva
        const isItalic = document.queryCommandState("italic");
        const italicButton = document.querySelector("#italicButton");
        if (isItalic) {
          italicButton.classList.add("active");
        } else {
          italicButton.classList.remove("active");
        }
      } else {
        hideMenu();
      }
    }
  
    function hideMenu() {
      const selection = window.getSelection();
      if (selection.toString().length === 0) {
        document.getElementById("styleMenu").style.display = "none";
      }
    }
  
    window.applyStyle = function(style) {
      // Aplicar o quitar estilos usando document.execCommand
      document.execCommand(style);
      updateButtonState(style);
    };
  
    function updateButtonState(style) {
      // Cambiar el estado del botón basado en si el estilo está aplicado o no
      const commandState = document.queryCommandState(style);
      const button = document.getElementById(`${style}Button`);
      if (commandState) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }
  
    // Reemplazar texto con el contenido del área de texto sin perder la selección
    window.replaceText = function() {
      const textarea = document.getElementById("editText");
      const newText = textarea.value;
  
      if (!currentRange) return;
  
      currentRange.deleteContents(); // Borra el contenido seleccionado
  
      // Insertar el nuevo texto
      const textNode = document.createTextNode(newText);
      currentRange.insertNode(textNode);
  
      // Mantener la selección activa
      const selection = window.getSelection();
      selection.removeAllRanges(); // Elimina cualquier selección previa
      selection.addRange(currentRange); // Restaura el rango anterior
  
      textarea.value = ""; // Limpiar el área de texto después del reemplazo
    };
  
    // Ocultar el menú si no hay texto seleccionado
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#styleMenu") && !e.target.closest("#styledText")) {
        hideMenu();
      }
    });
  });
  