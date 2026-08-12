import {
    body,
    button,
    columna,
    del,
    div,
    fila,
    input,
    li,
    ol,
    p,
    style
} from "./libreria.js";

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(() =>
                console.log("Service Worker registrado")
            )
            .catch(error =>
                console.error(
                    "Error registrando Service Worker:",
                    error
                )
            );

    });
}

// ============================================================
// ESTILOS GLOBALES
// ============================================================

style({
    elementos: [body],
    estilos: {
        width: "100%",
        height: "100dvh",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        boxSizing: "border-box",
    }
});

// ============================================================
// PARÁMETROS
// ============================================================

const parametros =
    new URLSearchParams(
        window.location.search
    );

const grupo =
    parametros.get("grupo");

// ============================================================
// COLUMNA PRINCIPAL
// ============================================================

const columnaPrincipal = columna({
    padre: body
});

style({
    elementos: [columnaPrincipal],
    estilos: {
        width: "100%",
        height: "100%",
        minHeight: "0",
        padding: "10px 12px 12px 12px",
        boxSizing: "border-box",
    }
});

// ============================================================
// TÍTULO
// ============================================================

let tituloTexto;

switch (grupo) {

    case "CasadosA":
        tituloTexto = "Casados A";
        break;

    case "CasadosB":
        tituloTexto = "Casados B";
        break;

    case "SolterosA":
        tituloTexto = "Solteros A";
        break;

    case "SolterosB":
        tituloTexto = "Solteros B";
        break;

    default:
        tituloTexto = "Grupo";
}

const textoTitulo = p({
    contenido: `Editar ${tituloTexto}`,
    padre: columnaPrincipal
});

style({
    elementos: [textoTitulo],
    estilos: {
        textAlign: "center",
        fontSize: "32px",
        margin: "8px 0 14px 0",
    }
});

// ============================================================
// FILA AÑADIR PERSONA
// ============================================================

const filaModificarPersonas = fila({
    padre: columnaPrincipal
});

style({
    elementos: [filaModificarPersonas],
    estilos: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: "8px",
        alignItems: "center",
        minWidth: "0",
        boxSizing: "border-box",
    }
});

// ============================================================
// INPUT
// ============================================================

const modificarPersonas = input({
    padre: filaModificarPersonas
});

style({
    elementos: [modificarPersonas],
    estilos: {
        width: "100%",
        height: "50px",
        minHeight: "50px",
        margin: "0",
        padding: "10px 12px",
        fontSize: "18px",
        boxSizing: "border-box",
        borderRadius: "8px",
    }
});

// ============================================================
// BOTÓN AÑADIR
// ============================================================

const botonAnadir = button({
    padre: filaModificarPersonas,
    contenido: "Añadir",
    funcionalidad: {
        click: () => anadirLista()
    }
});

style({
    elementos: [botonAnadir],
    estilos: {
        height: "50px",
        minHeight: "50px",
        padding: "10px 16px",
        fontSize: "17px",
        borderRadius: "8px",
        background: "#064C9C",
        color: "white",
        boxSizing: "border-box",
        touchAction: "manipulation",
    }
});

// ============================================================
// LISTA
// ============================================================

const lista = div({
    padre: columnaPrincipal
});

style({
    elementos: [lista],
    estilos: {
        width: "100%",
        flex: "1 1 auto",
        minHeight: "0",
        margin: "12px 0",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "8px",
        overflowY: "auto",
        overflowX: "hidden",
        background: "white",
        boxSizing: "border-box",
        WebkitOverflowScrolling: "touch",
    }
});

const listaOrdenada = ol({
    padre: lista
});

style({
    elementos: [listaOrdenada],
    estilos: {
        margin: "0",
        paddingLeft: "28px",
        boxSizing: "border-box",
    }
});

// ============================================================
// GUARDAR Y SALIR
// ============================================================

const botonSalir = button({
    padre: columnaPrincipal,
    contenido: "Guardar y salir",
    funcionalidad: {
        click: () => guardarYSalir()
    }
});

style({
    elementos: [botonSalir],
    estilos: {
        width: "100%",
        height: "52px",
        minHeight: "52px",
        margin: "0",
        background: "#064C9C",
        color: "white",
        padding: "10px",
        fontSize: "18px",
        borderRadius: "8px",
        boxSizing: "border-box",
        touchAction: "manipulation",
    }
});

// ============================================================
// AÑADIR
// ============================================================

function anadirLista() {

    const nombre =
        String(
            modificarPersonas.value ?? ""
        ).trim();

    if (!nombre) return;

    cargarPersona([nombre]);

    modificarPersonas.value = "";

    modificarPersonas.focus();
}

// ============================================================
// GUARDAR
// ============================================================

function guardarYSalir() {

    const elementosP =
        listaOrdenada.querySelectorAll("p");

    const nombresLista = [];

    elementosP.forEach(parrafo => {

        nombresLista.push(
            parrafo.textContent
        );

    });

    const datosAGuardar = {

        grupo: grupo,

        integrantes:
        nombresLista
    };

    localStorage.setItem(
        `lista_${grupo}`,
        JSON.stringify(datosAGuardar)
    );

    window.location.href =
        "ajustes.html";
}

// ============================================================
// CARGAR PERSONA
// ============================================================

function cargarPersona(integrantes) {

    integrantes.forEach(nombre => {

        const elemento = li({
            padre: listaOrdenada
        });

        style({
            elementos: [elemento],
            estilos: {
                width: "100%",
                fontSize: "18px",
                padding: "7px 0",
                boxSizing: "border-box",
            }
        });

        const contenido = fila({
            padre: elemento
        });

        style({
            elementos: [contenido],
            estilos: {
                width: "100%",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: "8px",
                alignItems: "center",
                minWidth: "0",
                boxSizing: "border-box",
            }
        });

        const texto = p({
            contenido: nombre,
            padre: contenido
        });

        style({
            elementos: [texto],
            estilos: {
                margin: "0",
                fontSize: "18px",
                overflowWrap: "anywhere",
                minWidth: "0",
            }
        });

        const boton = button({
            contenido: "Eliminar",
            padre: contenido,
            funcionalidad: {
                click: () => del(elemento)
            }
        });

        style({
            elementos: [boton],
            estilos: {
                minWidth: "82px",
                minHeight: "44px",
                padding: "8px 10px",
                background: "#064C9C",
                color: "white",
                fontSize: "16px",
                borderRadius: "8px",
                boxSizing: "border-box",
                touchAction: "manipulation",
            }
        });
    });
}

// ============================================================
// CARGAR LISTA
// ============================================================

function cargarLista() {

    const datos =
        localStorage.getItem(
            `lista_${grupo}`
        );

    if (!datos) return;

    const integrantes =
        JSON.parse(datos).integrantes;

    cargarPersona(integrantes);
}

cargarLista();