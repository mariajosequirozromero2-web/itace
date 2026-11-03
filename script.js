// =====================================================
// ITACE DIGITAL 4.0
// JAVASCRIPT
// =====================================================


// ===============================
// MENSAJE EMERGENTE
// ===============================

function mostrarMensaje() {
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.add("activo");
    }
}

function cerrarMensaje() {
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("activo");
    }
}


// ===============================
// MODO CLARO / OSCURO
// ===============================

function cambiarTema() {
    const body = document.body;
    const botonTema = document.getElementById("temaBtn");

    body.classList.toggle("oscuro");

    if (body.classList.contains("oscuro")) {
        if (botonTema) {
            botonTema.textContent = "☀️ Claro";
        }

        localStorage.setItem("temaITACE", "oscuro");
    } else {
        if (botonTema) {
            botonTema.textContent = "🌙 Oscuro";
        }

        localStorage.setItem("temaITACE", "claro");
    }
}


// ===============================
// MUSICA DE FONDO ON / OFF
// ===============================

function controlarAudio() {
    const audio = document.getElementById("audioTema");
    const botonAudio = document.getElementById("audioBtn");

    if (!audio) {
        return;
    }

    if (audio.paused) {

        // Pausar videos y audios de los himnos
        const reproductores = document.querySelectorAll(".media-reproductor");

        reproductores.forEach(function (reproductor) {
            reproductor.pause();
        });

        audio.play()
            .then(function () {
                if (botonAudio) {
                    botonAudio.textContent = "🔊 Música: ON";
                }
            })
            .catch(function () {
                if (botonAudio) {
                    botonAudio.textContent = "🔇 Música: OFF";
                }
            });

    } else {

        audio.pause();

        if (botonAudio) {
            botonAudio.textContent = "🔇 Música: OFF";
        }
    }
}


// ===============================
// BOTON VOLVER ARRIBA
// ===============================

window.addEventListener("scroll", function () {
    const botonArriba = document.getElementById("arriba");

    if (!botonArriba) {
        return;
    }

    if (window.scrollY > 500) {
        botonArriba.style.display = "block";
    } else {
        botonArriba.style.display = "none";
    }
});


function irArriba() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// CERRAR MODAL AL DAR CLIC FUERA
// ===============================

window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");

    if (modal && event.target === modal) {
        cerrarMensaje();
    }
});


// ===============================
// CERRAR MODAL CON ESC
// ===============================

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cerrarMensaje();
    }
});


// =====================================================
// VIDEOS Y AUDIOS
// =====================================================

function configurarMultimedia() {
    const reproductores = document.querySelectorAll(".media-reproductor");
    const musicaFondo = document.getElementById("audioTema");
    const botonAudio = document.getElementById("audioBtn");

    reproductores.forEach(function (reproductor) {

        reproductor.addEventListener("play", function () {

            // Pausar musica de fondo
            if (musicaFondo && !musicaFondo.paused) {
                musicaFondo.pause();

                if (botonAudio) {
                    botonAudio.textContent = "🔇 Música: OFF";
                }
            }

            // Pausar los otros videos o audios
            reproductores.forEach(function (otro) {
                if (otro !== reproductor && !otro.paused) {
                    otro.pause();
                }
            });

        });

    });
}


// =====================================================
// BUSCADOR DEL DIRECTORIO DOCENTE
// =====================================================

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function filtrarDocentes() {
    const buscador = document.getElementById("buscarDocente");
    const filtroArea = document.getElementById("filtroArea");
    const tarjetas = document.querySelectorAll(".docente-card");
    const mensaje = document.getElementById("sinResultados");

    if (!buscador || tarjetas.length === 0) {
        return;
    }

    const busqueda = normalizarTexto(buscador.value.trim());

    let areaSeleccionada = "";

    if (filtroArea) {
        areaSeleccionada = normalizarTexto(filtroArea.value);
    }

    let encontrados = 0;

    tarjetas.forEach(function (tarjeta) {

        const nombre = normalizarTexto(
            tarjeta.getAttribute("data-nombre") || ""
        );

        const materias = normalizarTexto(
            tarjeta.getAttribute("data-materias") || ""
        );

        const area = normalizarTexto(
            tarjeta.getAttribute("data-area") || ""
        );

        const coincideBusqueda =
            nombre.includes(busqueda) ||
            materias.includes(busqueda);

        const coincideArea =
            areaSeleccionada === "" ||
            areaSeleccionada === "todos" ||
            area === areaSeleccionada;

        if (coincideBusqueda && coincideArea) {
            tarjeta.style.display = "";
            encontrados++;
        } else {
            tarjeta.style.display = "none";
        }

    });

    if (mensaje) {
        if (encontrados === 0) {
            mensaje.style.display = "block";
        } else {
            mensaje.style.display = "none";
        }
    }
}


// ===============================
// LIMPIAR BUSQUEDA DE DOCENTES
// ===============================

function limpiarBusquedaDocentes() {
    const buscador = document.getElementById("buscarDocente");
    const filtroArea = document.getElementById("filtroArea");

    if (buscador) {
        buscador.value = "";
    }

    if (filtroArea) {
        filtroArea.value = "todos";
    }

    filtrarDocentes();
}


// =====================================================
// ANIMACIONES DE TARJETAS
// =====================================================

function configurarAnimaciones() {
    const elementosAnimados = document.querySelectorAll(
        ".plantel-card, .carrera-card, .logro-card, .instalacion-card, .club, .proyecto-card, .noticia-card, .evento-card, .docente-card"
    );

    if (!("IntersectionObserver" in window)) {
        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("visible");
        });

        return;
    }

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducirMovimiento) {
        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("visible");
        });

        return;
    }

    const observador = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elementosAnimados.forEach(function (elemento) {
        elemento.classList.add("animar");
        observador.observe(elemento);
    });
}


// =====================================================
// CARGAR PAGINA
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioTema");
    const botonAudio = document.getElementById("audioBtn");
    const botonTema = document.getElementById("temaBtn");

    


    // -------------------------------
    // RECUPERAR MODO OSCURO
    // -------------------------------

    const temaGuardado = localStorage.getItem("temaITACE");

    if (temaGuardado === "oscuro") {

        document.body.classList.add("oscuro");

        if (botonTema) {
            botonTema.textContent = "☀️ Claro";
        }

    } else {

        document.body.classList.remove("oscuro");

        if (botonTema) {
            botonTema.textContent = "🌙 Oscuro";
        }
    }


    // -------------------------------
    // CONFIGURAR VIDEOS Y AUDIOS
    // -------------------------------

    configurarMultimedia();


    // -------------------------------
    // CONFIGURAR BUSCADOR DOCENTES
    // -------------------------------

    const buscador = document.getElementById("buscarDocente");
    const filtroArea = document.getElementById("filtroArea");

    if (buscador) {
        buscador.addEventListener("input", filtrarDocentes);
    }

    if (filtroArea) {
        filtroArea.addEventListener("change", filtrarDocentes);
    }


    // -------------------------------
    // CONFIGURAR ANIMACIONES
    // -------------------------------

    configurarAnimaciones();

});

