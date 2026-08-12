import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";

import {
    a,
    body,
    button,
    columna,
    div,
    input,
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
        overflow: "auto",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#f5f7fa",
    }
});

// ============================================================
// COLUMNA PRINCIPAL
// ============================================================

const columnaPrincipal = columna({
    padre: body
});

style({
    elementos: [columnaPrincipal],
    estilos: {
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px 18px 12px",
    }
});

// ============================================================
// BOTONES DE GRUPOS
// ============================================================

const casadosA = button({ padre: columnaPrincipal });
const enlaceCasadosA = a({
    padre: casadosA,
    href: "editor.html?grupo=CasadosA",
    contenido: "Casados A"
});

const casadosB = button({ padre: columnaPrincipal });
const enlaceCasadosB = a({
    padre: casadosB,
    href: "editor.html?grupo=CasadosB",
    contenido: "Casados B"
});

const solterosA = button({ padre: columnaPrincipal });
const enlaceSolterosA = a({
    padre: solterosA,
    href: "editor.html?grupo=SolterosA",
    contenido: "Solteros A"
});

const solterosB = button({ padre: columnaPrincipal });
const enlaceSolterosB = a({
    padre: solterosB,
    href: "editor.html?grupo=SolterosB",
    contenido: "Solteros B"
});

// ============================================================
// CARGAR EXCEL
// ============================================================

const cargarExcel = button({
    padre: columnaPrincipal,
    contenido: "Cargar Excel",
    funcionalidad: {
        click: abrirSelectorExcel
    }
});

// ============================================================
// SALIR
// ============================================================

const salir = button({
    padre: columnaPrincipal,
    contenido: "Salir",
    funcionalidad: {
        click: () => {
            window.location.href = "index.html";
        }
    }
});

// ============================================================
// ESTILOS RESPONSIVE
// ============================================================

style({
    elementos: [
        casadosA,
        casadosB,
        solterosA,
        solterosB
    ],
    estilos: {
        width: "100%",
        minHeight: "52px",
        margin: "8px 0",
        background: "#064C9C",
        color: "white",
        padding: "10px",
        fontSize: "18px",
        borderRadius: "8px",
        boxSizing: "border-box",
        touchAction: "manipulation",
    }
});

style({
    elementos: [cargarExcel],
    estilos: {
        width: "100%",
        minHeight: "52px",
        margin: "16px 0 8px 0",
        background: "#064C9C",
        color: "white",
        padding: "10px",
        fontSize: "18px",
        borderRadius: "8px",
        boxSizing: "border-box",
        touchAction: "manipulation",
    }
});

style({
    elementos: [salir],
    estilos: {
        width: "100%",
        minHeight: "52px",
        margin: "8px 0",
        background: "#555",
        color: "white",
        padding: "10px",
        fontSize: "18px",
        borderRadius: "8px",
        boxSizing: "border-box",
        touchAction: "manipulation",
    }
});

style({
    elementos: [
        enlaceCasadosA,
        enlaceCasadosB,
        enlaceSolterosA,
        enlaceSolterosB
    ],
    estilos: {
        color: "white",
        textDecoration: "none",
        display: "flex",
        width: "100%",
        minHeight: "30px",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    }
});

// ============================================================
// SELECTOR DE ARCHIVO
// ============================================================

function abrirSelectorExcel() {
    const inputArchivo = document.createElement("input");

    inputArchivo.type = "file";
    inputArchivo.accept = ".xlsx,.xls";

    inputArchivo.addEventListener("change", cargarExcelArchivo);

    inputArchivo.click();
}

// ============================================================
// LEER EXCEL
// ============================================================

function cargarExcelArchivo(evento) {
    const archivo = evento.target.files[0];

    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = function(e) {
        const datos = new Uint8Array(e.target.result);

        const libro = XLSX.read(datos, {
            type: "array"
        });

        const nombreHoja = libro.SheetNames[0];
        const hoja = libro.Sheets[nombreHoja];

        const filas = XLSX.utils.sheet_to_json(hoja, {
            defval: ""
        });

        cargarPersonas(filas);
    };

    lector.readAsArrayBuffer(archivo);
}

// ============================================================
// SEPARAR PERSONAS POR GRUPO
// ============================================================

function cargarPersonas(filas) {
    const casadosA = [];
    const casadosB = [];
    const solterosA = [];
    const solterosB = [];

    filas.forEach(fila => {
        const nombre = String(fila.NOMBRE ?? "").trim();
        const cualidad = String(fila.CUALIDAD ?? "").trim().toLowerCase();

        if (!nombre) return;

        if (cualidad === "matrimonio a") {
            casadosA.push(nombre);
        } else if (cualidad === "matrimonio b") {
            casadosB.push(nombre);
        } else if (cualidad === "soltero a") {
            solterosA.push(nombre);
        } else if (cualidad === "soltero b") {
            solterosB.push(nombre);
        }
    });

    localStorage.setItem(
        "lista_CasadosA",
        JSON.stringify({
            grupo: "CasadosA",
            integrantes: casadosA
        })
    );

    localStorage.setItem(
        "lista_CasadosB",
        JSON.stringify({
            grupo: "CasadosB",
            integrantes: casadosB
        })
    );

    localStorage.setItem(
        "lista_SolterosA",
        JSON.stringify({
            grupo: "SolterosA",
            integrantes: solterosA
        })
    );

    localStorage.setItem(
        "lista_SolterosB",
        JSON.stringify({
            grupo: "SolterosB",
            integrantes: solterosB
        })
    );

    alert(
        `Excel cargado correctamente.\n\n` +
        `Casados A: ${casadosA.length}\n` +
        `Casados B: ${casadosB.length}\n` +
        `Solteros A: ${solterosA.length}\n` +
        `Solteros B: ${solterosB.length}`
    );
}
