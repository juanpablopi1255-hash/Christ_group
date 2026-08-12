import {a, button, columna, style} from "./libreria.js";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(() => {
                console.log("Service Worker registrado");
            })
            .catch(error => {
                console.error("Error registrando Service Worker:", error);
            });

    });

}

// ============================================================
// COLUMNA PRINCIPAL
// ============================================================

const columnaPrincipal = columna({});


// ============================================================
// BOTONES DE GRUPOS
// ============================================================

const casadosA = button({
    padre: columnaPrincipal
});

const enlaceCasadosA = a({
    padre: casadosA,
    href: "editor.html?grupo=CasadosA",
    contenido: "Casados A"
});


const casadosB = button({
    padre: columnaPrincipal
});

const enlaceCasadosB = a({
    padre: casadosB,
    href: "editor.html?grupo=CasadosB",
    contenido: "Casados B"
});


const solterosA = button({
    padre: columnaPrincipal
});

const enlaceSolterosA = a({
    padre: solterosA,
    href: "editor.html?grupo=SolterosA",
    contenido: "Solteros A"
});


const solterosB = button({
    padre: columnaPrincipal
});

const enlaceSolterosB = a({
    padre: solterosB,
    href: "editor.html?grupo=SolterosB",
    contenido: "Solteros B"
});


// ============================================================
// BOTÓN CARGAR EXCEL
// ============================================================

const cargarExcel = button({
    padre: columnaPrincipal,
    contenido: "Cargar Excel",

    funcionalidad: {
        click: abrirSelectorExcel
    }
});


// ============================================================
// BOTÓN SALIR
// ============================================================

const salir = button({
    padre: columnaPrincipal,
    contenido: "salir",

    funcionalidad: {
        click: () => {
            window.location.href = "index.html";
        }
    }
});


// ============================================================
// ESTILOS
// ============================================================

style({
    elementos: [
        casadosA,
        casadosB,
        solterosA,
        solterosB,
        cargarExcel,
        salir
    ],

    estilos: {
        textAlign: "center",
        margin: "0 15px 35px 15px",
        background: "#064C9C",
        color: "white",
        paddingTop: "10px",
        paddingBottom: "10px",
        maxHeight: "50px",
        marginTop: "30px",
    }
});


style({
    elementos: [salir],

    estilos: {
        margin: "270px 30px 0 30px",
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

        const libro =
            XLSX.read(datos, {
                type: "array"
            });


        // Usamos la primera hoja del Excel
        const nombreHoja = libro.SheetNames[0];

        const hoja = libro.Sheets[nombreHoja];


        // Convertimos la hoja a objetos
        const filas =
            XLSX.utils.sheet_to_json(hoja, {
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

        const nombre = String(
            fila.NOMBRE ?? ""
        ).trim();

        const cualidad = String(
            fila.CUALIDAD ?? ""
        ).trim().toLowerCase();


        if (!nombre) return;


        // ------------------------------
        // Casados A
        // ------------------------------

        if (
            cualidad === "matrimonio a"
        ) {

            casadosA.push(nombre);

        }


            // ------------------------------
            // Casados B
        // ------------------------------

        else if (
            cualidad === "matrimonio b"
        ) {

            casadosB.push(nombre);

        }


            // ------------------------------
            // Solteros A
        // ------------------------------

        else if (
            cualidad === "soltero a"
        ) {

            solterosA.push(nombre);

        }


            // ------------------------------
            // Solteros B
        // ------------------------------

        else if (
            cualidad === "soltero b"
        ) {

            solterosB.push(nombre);

        }

    });


    // ========================================================
    // GUARDAR EN LOCAL STORAGE
    // ========================================================

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