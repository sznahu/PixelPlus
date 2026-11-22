/* PIXELPLUS · PORTFOLIO
   EDITÁ LOS PROYECTOS EN LA LISTA proyectos.
   imagen: ruta a una captura dentro de img/, ej. "img/royalfit.webp"
   url: enlace a la demo publicada; vacío = botón "Próximamente".
*/
var proyectos = [
  {
    nombre: "ROYALFIT",
    categoria: "Tienda de ropa",
    descripcion: "Tienda de ropa con portada de colección, tarjetas de productos y navegación por categorías.",
    etiquetas: ["Moda", "Catálogo", "Diseño adaptable"],
    url: "https://royalfit-5zn.pages.dev/",
    color: "#172554",
    imagen: ""
  },
  {
    nombre: "NovaShop",
    categoria: "Tienda online",
    descripcion: "Concepto de tienda con catálogo, carrito de compras y flujo de pagos integrado.",
    etiquetas: ["E-commerce", "Carrito", "Mercado Pago"],
    url: "https://tienda-base99.pages.dev/",
    color: "#2563eb",
    imagen: ""
  }
];

function crearTarjeta(proyecto, indice) {
  var tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta reveal";
  tarjeta.style.setProperty("--card-delay", (indice % 6) * 80 + "ms");

  var visual = document.createElement("div");
  visual.className = "vista";
  visual.style.background = proyecto.color || "linear-gradient(135deg,#2563eb,#172554)";
  if (proyecto.imagen) {
    var imagen = document.createElement("img");
    imagen.src = proyecto.imagen;
    imagen.alt = "Captura de " + proyecto.nombre;
    imagen.loading = "lazy";
    visual.appendChild(imagen);
  } else {
    var inicial = document.createElement("span");
    inicial.className = "vista-titulo";
    inicial.textContent = proyecto.nombre;
    visual.appendChild(inicial);
    var decoracion = document.createElement("span");
    decoracion.className = "vista-deco";
    decoracion.setAttribute("aria-hidden", "true");
    visual.appendChild(decoracion);
  }

  var cuerpo = document.createElement("div");
  cuerpo.className = "cuerpo";
  var categoria = document.createElement("span");
  categoria.className = "categoria";
  categoria.textContent = proyecto.categoria || "Proyecto web";
  var titulo = document.createElement("h3");
  titulo.textContent = proyecto.nombre;
  var descripcion = document.createElement("p");
  descripcion.textContent = proyecto.descripcion || "";
  var etiquetas = document.createElement("div");
  etiquetas.className = "etiquetas";
  (proyecto.etiquetas || []).forEach(function (texto) {
    var tag = document.createElement("span");
    tag.textContent = texto;
    etiquetas.appendChild(tag);
  });
  var boton = proyecto.url ? document.createElement("a") : document.createElement("span");
  boton.className = proyecto.url ? "button button-primary" : "button button-ghost proximamente";
  if (proyecto.url) {
    boton.href = proyecto.url;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
    boton.textContent = "Ver proyecto ↗";
  } else {
    boton.textContent = "Próximamente";
  }
  cuerpo.append(categoria, titulo, descripcion, etiquetas, boton);
  tarjeta.append(visual, cuerpo);
  return tarjeta;
}

/* Animaciones progresivas: si JavaScript falla, el contenido queda visible. */
document.documentElement.classList.add("reveal-preparado");

document.addEventListener("DOMContentLoaded", function () {
  var grilla = document.getElementById("grilla");
  if (grilla) {
    if (!proyectos.length) {
      var vacio = document.createElement("p");
      vacio.className = "vacio";
      vacio.textContent = "Pronto vas a ver nuestros proyectos acá.";
      grilla.appendChild(vacio);
    } else {
      proyectos.forEach(function (proyecto, indice) {
        grilla.appendChild(crearTarjeta(proyecto, indice));
      });
    }
  }

  /* Animar tanto el encabezado como las tarjetas de portfolio. */
  var elementosReveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    try {
      var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.08 });
      elementosReveal.forEach(function (el) { observador.observe(el); });
    } catch (error) {
      elementosReveal.forEach(function (el) { el.classList.add("visible"); });
    }
  } else {
    elementosReveal.forEach(function (el) { el.classList.add("visible"); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
