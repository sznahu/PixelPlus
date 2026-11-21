
/* PIXELPLUS · INTERACCIONES DE LA PÁGINA PRINCIPAL */
document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("formulario-contacto");
  var mensajeOk = document.getElementById("mensaje-ok");

  if (formulario && mensajeOk) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      mensajeOk.style.display = "block";
      formulario.reset();
    });
  }

  /* PLAN ELEGIDO -> ETIQUETA Y MENSAJE */
  var botonesPlan = document.querySelectorAll("[data-plan]");
  var etiquetaPlan = document.getElementById("plan-seleccionado");
  var nombrePlan = document.getElementById("nombre-plan-seleccionado");
  var campoMensaje = formulario
    ? formulario.querySelector('textarea[name="mensaje"]')
    : null;

  botonesPlan.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var plan = boton.getAttribute("data-plan");

      if (etiquetaPlan && nombrePlan) {
        nombrePlan.textContent = plan;
        etiquetaPlan.hidden = false;
      }

      if (campoMensaje) {
        campoMensaje.value =
          "Hola, me interesa el plan " + plan +
          " de Pixel Plus. Quisiera recibir más información.";
      }
    });
  });

  /* MENÚ LATERAL */
  var barra = document.getElementById("barra-lateral");
  var velo = document.getElementById("velo");
  var abrirMenu = document.getElementById("abrir-menu");

  if (barra && velo && abrirMenu) {
    var cerrarMenu = barra.querySelector(".menu-close") ||
      barra.querySelector("button[aria-label='Cerrar menú']");

    function setMenu(abierto) {
      barra.classList.toggle("abierta", abierto);
      velo.classList.toggle("visible", abierto);
      abrirMenu.setAttribute("aria-expanded", String(abierto));
      document.body.classList.toggle("menu-abierto", abierto);
    }

    abrirMenu.addEventListener("click", function () {
      setMenu(true);
    });

    if (cerrarMenu) {
      cerrarMenu.addEventListener("click", function () {
        setMenu(false);
      });
    }

    velo.addEventListener("click", function () {
      setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });

    barra.querySelectorAll(".menu-links a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  /* REVEAL: animar elementos cuando entran en pantalla */
  var elementos = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementos.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    elementos.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* AÑO AUTOMÁTICO */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

