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
            .then(() => console.log("Service Worker registrado"))
            .catch(error => console.error("Error registrando Service Worker:", error));
    });
}

// ============================================================
// ESTILOS GLOBALES - MOBILE FIRST
// ============================================================

style({
    elementos: [body],
    estilos: {
        height: "100dvh",
        width: "100%",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#f5f7fa",
    }
});

const parametros = new URLSearchParams(window.location.search);
const grupo = parametros.get("grupo");

const columnaPrincipal = columna({
    padre: body
});

style({
    elementos: [columnaPrincipal],
    estilos: {
        height: "100%",
        minHeight: "0",
        minWidth: "0",
        padding: "8px 12px 12px 12px",
        boxSizing: "border-box",
    }
});

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
    padre: columnaPrincipal,
    peso: "0.6f"
});

style({
    elementos: [textoTitulo],
    estilos: {
        textAlign: "center",
        fontSize: "clamp(24px, 7vw, 36px)",
        fontWeight: "700",
        margin: "8px 0",
    }
});

const filaModificarPersonas = fila({
    padre: columnaPrincipal,
    peso: "0.8f"
});

style({
    elementos: [filaModificarPersonas],
    estilos: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "8px",
        minHeight: "0",
        minWidth: "0",
        alignItems: "center",
    }
});

const modificarPersonas = input({
    padre: filaModificarPersonas,
    peso: "1f"
});

const botonAnadir = button({
    padre: filaModificarPersonas,
    peso: "0.3f",
    contenido: "Añadir",
    funcionalidad: {
        click: () => anadirLista()
    }
});

style({
    elementos: [modificarPersonas],
    estilos: {
        width: "100%",
        height: "48px",
        minHeight: "48px",
        margin: "0",
        padding: "8px 12px",
        fontSize: "18px",
        boxSizing: "border-box",
        borderRadius: "8px",
    }
});

style({
    elementos: [botonAnadir],
    estilos: {
        minHeight: "48px",
        height: "48px",
        padding: "8px 18px",
        fontSize: "17px",
        borderRadius: "8px",
        touchAction: "manipulation",
    }
});

const lista = div({
    padre: columnaPrincipal,
    peso: "5f"
});

const listaOrdenada = ol({
    padre: lista
});

style({
    elementos: [lista],
    estilos: {
        border: "2px solid black",
        borderRadius: "10px",
        margin: "10px 0",
        padding: "8px 8px 8px 14px",
        minHeight: "0",
        overflowY: "auto",
        overflowX: "hidden",
        background: "white",
        boxSizing: "border-box",
        WebkitOverflowScrolling: "touch",
    }
});

style({
    elementos: [listaOrdenada],
    estilos: {
        margin: "0",
        paddingLeft: "30px",
    }
});

const botonSalir = button({
    padre: columnaPrincipal,
    peso: "0.8f",
    contenido: "Guardar y salir",
    funcionalidad: {
        click: () => guardarYSalir()
    }
});

style({
    elementos: [botonSalir],
    estilos: {
        width: "100%",
        minHeight: "50px",
        height: "50px",
        margin: "4px 0 0 0",
        background: "#064C9C",
        color: "white",
        padding: "10px",
        fontSize: "18px",
        borderRadius: "8px",
        touchAction: "manipulation",
    }
});

function anadirLista() {
    const nombre = String(modificarPersonas.value ?? "").trim();

    if (!nombre) return;

    cargarPersona([nombre]);
    modificarPersonas.value = "";
    modificarPersonas.focus();
}

function guardarYSalir() {
    const elementosP = listaOrdenada.querySelectorAll("p");
    const nombresLista = [];

    elementosP.forEach(parrafo => {
        nombresLista.push(parrafo.textContent);
    });

    const datosAGuardar = {
        grupo: grupo,
        integrantes: nombresLista
    };

    localStorage.setItem(`lista_${grupo}`, JSON.stringify(datosAGuardar));

    window.location.href = "ajustes.html";
}

function cargarPersona(integrantes) {
    integrantes.forEach(nombre => {
        const elemento = li({
            padre: listaOrdenada
        });

        const contenido = fila({
            padre: elemento
        });

        style({
            elementos: [contenido],
            estilos: {
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "8px",
                width: "100%",
                minWidth: "0",
                alignItems: "center",
                boxSizing: "border-box",
            }
        });

        const texto = p({
            contenido: nombre,
            padre: contenido
        });

        style({
            elementos: [elemento],
            estilos: {
                fontSize: "18px",
                padding: "6px 0",
                boxSizing: "border-box",
            }
        });

        style({
            elementos: [texto],
            estilos: {
                margin: "0",
                fontSize: "18px",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                overflowWrap: "anywhere",
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
                minHeight: "42px",
                padding: "8px 12px",
                textAlign: "center",
                background: "#064C9C",
                color: "white",
                fontSize: "15px",
                borderRadius: "7px",
                touchAction: "manipulation",
            }
        });
    });
}

function cargarLista() {
    const datos = localStorage.getItem(`lista_${grupo}`);

    if (!datos) return;

    const integrantes = JSON.parse(datos).integrantes;
    cargarPersona(integrantes);
}

cargarLista();
