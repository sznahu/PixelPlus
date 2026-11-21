/* ==========================================================
   PixelPlus · Modo nocturno
   Se carga en el <head>: aplica el tema guardado antes de pintar
   la página, así no hay parpadeo al cargar.
   ========================================================== */

(function () {
  var CLAVE = "pixelplus-tema";
  var html = document.documentElement;

  function leerTemaGuardado() {
    try {
      return localStorage.getItem(CLAVE);
    } catch (e) {
      return null;
    }
  }

  function guardarTema(valor) {
    try {
      localStorage.setItem(CLAVE, valor);
    } catch (e) {}
  }

  function aplicarTema(nocturno) {
    html.classList.toggle("modo-nocturno", nocturno);

    // Actualiza todos los botones de modo nocturno de la página
    document.querySelectorAll("[data-alternar-tema]").forEach(function (boton) {
      boton.setAttribute("aria-pressed", String(nocturno));

      var estado = boton.querySelector("[data-tema-estado]");
      if (estado) {
        estado.textContent = nocturno ? "Activado" : "Desactivado";
      } else {
        boton.textContent = nocturno ? "Modo día" : "Modo nocturno";
      }
    });
  }

  // Aplicar el tema guardado de inmediato
  if (leerTemaGuardado() === "nocturno") {
    html.classList.add("modo-nocturno");
  }

  // Conectar los botones cuando la página esté lista
  document.addEventListener("DOMContentLoaded", function () {
    aplicarTema(html.classList.contains("modo-nocturno"));

    document.querySelectorAll("[data-alternar-tema]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        var nocturno = !html.classList.contains("modo-nocturno");
        aplicarTema(nocturno);
        guardarTema(nocturno ? "nocturno" : "diurno");
      });
    });
  });
})();
