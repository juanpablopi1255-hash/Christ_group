import {body, button, columna, del, div, fila, input, li, ol, p, style} from "./libreria.js";
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
style({
    elementos: [body], estilos: {
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
    }
});

const parametros = new URLSearchParams(window.location.search);

const grupo = parametros.get("grupo");

const columnaPrincipal = columna({})

let tituloTexto;
switch(grupo) {
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
}
const textoTitulo=p({contenido:`Editar ${tituloTexto}`, padre:columnaPrincipal, peso: "0.3f"})
style({
    elementos: [textoTitulo], estilos: {
        textAlign: 'center',
        fontSize: '40px',
    }
});
const filaModificarPersonas= fila({padre:columnaPrincipal, peso:"0.5"});
const modificarPersonas = input({padre: filaModificarPersonas, peso:"0.7f"})
const botonAnadir = button({padre:filaModificarPersonas, peso:"0.3f", contenido:"Añadir", funcionalidad: {'click': () => {
    anadirLista()
}}})
const lista= div({padre: columnaPrincipal, peso:"4f"})
const listaOrdenada = ol({padre:lista})
cargarLista();
const botonSalir = button({padre: columnaPrincipal, peso: "0.5f", contenido:"Guardar y salir", funcionalidad: {'click': () => {
    guardarYSalir()
        }}})

style({
    elementos: [botonSalir, botonAnadir], estilos: {
        textAlign: 'center',
        margin: "0 15px 35px 15px",
        background: "#064C9C",
        color: "white",
        paddingTop: "10px",
        paddingBottom: "10px",
        maxHeight: "50px",
        marginTop: "30px",
        fontSize: "20px",
    }
});

style({elementos: [modificarPersonas], estilos: {
        maxHeight: "50px",
        marginTop: "30px",
        margin: "30px 15px 35px 15px",
        fontSize: "20px",
        fontStyle: 'Times New Roman',

    }})

style({elementos:[lista], estilos: {
    border: "3px solid black",
    margin: "0 15px 0 15px",

    }})

function anadirLista(){
    cargarPersona([modificarPersonas.value])
    modificarPersonas.value=""
}


function guardarYSalir() {
    const elementosP = listaOrdenada.querySelectorAll('p');
    const nombresLista = [];
    elementosP.forEach(parrafo => {
        nombresLista.push(parrafo.textContent);
    });
    const datosAGuardar = {
        grupo: grupo,
        integrantes: nombresLista
    };

    localStorage.setItem(`lista_${grupo}`, JSON.stringify(datosAGuardar));

    window.location.href = 'ajustes.html';
}
function cargarPersona(integrantes) {
    integrantes.forEach(nombre => {
        const elemento = li({ padre: listaOrdenada });
        const contenido = fila({ padre: elemento });

        const texto = p({
            contenido: nombre,
            padre: contenido
        });

        const boton = button({
            contenido: "eliminar",
            padre: contenido,
            funcionalidad: {
                click: () => {
                    del(elemento);
                }
            }
        });

        style({
            elementos: [elemento],
            estilos: {
                fontSize: "20px",
                fontFamily: "Times New Roman"
            }
        });

        style({
            elementos: [boton],
            estilos: {
                textAlign: "center",
                background: "#064C9C",
                color: "white",
                paddingTop: "10px",
                paddingBottom: "10px",
                maxHeight: "50px",
                marginTop: "30px",
                fontSize: "20px"
            }
        });

        style({
            elementos: [contenido],
            estilos: {
                width: "calc(100% - 15px)",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between"
            }
        });

        style({
            elementos: [texto],
            estilos: {
                margin: "0",
                fontSize: "20px"
            }
        });
    });
}
function cargarLista(){
    const datos = localStorage.getItem(`lista_${grupo}`);

    if (!datos) return;

    const integrantes = JSON.parse(datos).integrantes;
    cargarPersona(integrantes);
}





