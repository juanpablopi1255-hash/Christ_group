import {
    a,
    body,
    button,
    columna,
    crearEstado,
    div,
    fila,
    li,
    mod,
    ol,
    p,
    style,
    ul
} from "./libreria.js";


// ============================================================
// 1. ESTILOS GLOBALES
// ============================================================

style({
    elementos: [body],
    estilos: {
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        overflow: "hidden",
    }
});


// ============================================================
// 2. ESTRUCTURA
// ============================================================

const columnaBody = columna({
    padre: body
});

const titulo = div({
    padre: columnaBody,
    peso: "1f"
});

const listas = div({
    padre: columnaBody,
    peso: "4f"
});

const botones = div({
    padre: columnaBody,
    peso: "2f"
});

style({
    elementos: [columnaBody, listas, botones],
    estilos: {
        minHeight: "0",
    }
});


// ============================================================
// 3. TÍTULO
// ============================================================

const textoTitulo = p({
    padre: titulo,
    contenido: "Christ group"
});

style({
    elementos: [textoTitulo],
    estilos: {
        textAlign: "center",
        fontSize: "40px",
    }
});


// ============================================================
// 4. ZONA PRINCIPAL
// ============================================================

const filaListas = fila({
    padre: listas
});

const botonesLista = columna({
    padre: filaListas,
    peso: "1f"
});

const lista = columna({
    padre: filaListas,
    peso: "1f"
});

style({
    elementos: [filaListas, botonesLista, lista],
    estilos: {
        minHeight: "0",
    }
});


// ============================================================
// 5. LISTA DE GRUPOS
// ============================================================

const listaGrupos = ul({
    padre: lista
});

style({
    elementos: [listaGrupos],
    estilos: {
        listStyleType: "none",
        margin: "10px 0 0 0",
        padding: "0",
    }
});


// ============================================================
// 6. CUADRO DE LA LISTA + SCROLL
// ============================================================

style({
    elementos: [lista],
    estilos: {
        textAlign: "left",
        marginLeft: "10px",
        marginRight: "10px",
        border: "4px solid black",
        width: "100%",
        height: "100%",
        background: "white",
        boxSizing: "border-box",
        minHeight: "0",
        overflowY: "auto",
        overflowX: "hidden",
    }
});


// ============================================================
// 7. BOTONES DE LOS GRUPOS
// ============================================================

const botonCasadosA = button({
    padre: botonesLista,
    contenido: "Casados A: 0",
    funcionalidad: {
        click: () => {
            anadirALaLista(casadosA);
        }
    }
});

const botonCasadosB = button({
    padre: botonesLista,
    contenido: "Casados B: 0",
    funcionalidad: {
        click: () => {
            anadirALaLista(casadosB);
        }
    }
});

const botonSolterosA = button({
    padre: botonesLista,
    contenido: "Solteros A: 0",
    funcionalidad: {
        click: () => {
            anadirALaLista(solterosA);
        }
    }
});

const botonSolterosB = button({
    padre: botonesLista,
    contenido: "Solteros B: 0",
    funcionalidad: {
        click: () => {
            anadirALaLista(solterosB);
        }
    }
});


// ============================================================
// 8. LOCAL STORAGE
// ============================================================

const datosCasadosA =
    localStorage.getItem("lista_CasadosA");

const datosCasadosB =
    localStorage.getItem("lista_CasadosB");

const datosSolterosA =
    localStorage.getItem("lista_SolterosA");

const datosSolterosB =
    localStorage.getItem("lista_SolterosB");


// ============================================================
// 9. LISTAS ORIGINALES
// ============================================================

const originalesCasadosA = datosCasadosA
    ? [...JSON.parse(datosCasadosA).integrantes]
    : [];

const originalesCasadosB = datosCasadosB
    ? [...JSON.parse(datosCasadosB).integrantes]
    : [];

const originalesSolterosA = datosSolterosA
    ? [...JSON.parse(datosSolterosA).integrantes]
    : [];

const originalesSolterosB = datosSolterosB
    ? [...JSON.parse(datosSolterosB).integrantes]
    : [];


// ============================================================
// 10. ESTADOS
// ============================================================

let casadosA = crearEstado({
    valorInicial: [...originalesCasadosA],

    funcionDeActualizacion: (nuevoValor) => {
        mod({
            elemento: botonCasadosA,
            contenido: `Casados A: ${nuevoValor.length}`
        });
    }
});

let casadosB = crearEstado({
    valorInicial: [...originalesCasadosB],

    funcionDeActualizacion: (nuevoValor) => {
        mod({
            elemento: botonCasadosB,
            contenido: `Casados B: ${nuevoValor.length}`
        });
    }
});

let solterosA = crearEstado({
    valorInicial: [...originalesSolterosA],

    funcionDeActualizacion: (nuevoValor) => {
        mod({
            elemento: botonSolterosA,
            contenido: `Solteros A: ${nuevoValor.length}`
        });
    }
});

let solterosB = crearEstado({
    valorInicial: [...originalesSolterosB],

    funcionDeActualizacion: (nuevoValor) => {
        mod({
            elemento: botonSolterosB,
            contenido: `Solteros B: ${nuevoValor.length}`
        });
    }
});


// ============================================================
// 11. GRUPO ACTUAL
// ============================================================

let grupo_actual = 1;

let grupoActualElemento;
let listaActual;


// ============================================================
// 12. HISTORIAL
// ============================================================

const historial = [];


// ============================================================
// 13. CREAR GRUPO
// ============================================================

function crearGrupo(numero) {

    const contenedorGrupo = li({
        padre: listaGrupos
    });

    style({
        elementos: [contenedorGrupo],
        estilos: {
            listStyleType: "none",
            margin: "0",
            padding: "0",
        }
    });

    const tituloGrupo = p({
        padre: contenedorGrupo,
        contenido: `Grupo ${numero}`
    });

    style({
        elementos: [tituloGrupo],
        estilos: {
            fontSize: "25px",
            color: "#064C9C",
            margin: "0 0 5px 0",
        }
    });

    const nuevaLista = ol({
        padre: contenedorGrupo
    });

    style({
        elementos: [nuevaLista],
        estilos: {
            fontSize: "20px",
        }
    });

    return {
        contenedor: contenedorGrupo,
        lista: nuevaLista
    };
}


// ============================================================
// 14. GRUPO 1
// ============================================================

const primerGrupo = crearGrupo(1);

grupoActualElemento = primerGrupo.contenedor;
listaActual = primerGrupo.lista;


// ============================================================
// 15. CAMBIAR DE GRUPO
// ============================================================

function cambiarDeGrupo() {

    grupo_actual++;

    const nuevoGrupo = crearGrupo(grupo_actual);

    grupoActualElemento = nuevoGrupo.contenedor;
    listaActual = nuevoGrupo.lista;

    // Guardamos que se creó un grupo
    historial.push({
        tipo: "grupo",
        elemento: nuevoGrupo.contenedor,
        grupoAnterior: grupo_actual - 1
    });
}


// ============================================================
// 16. AÑADIR PERSONA
// ============================================================

function anadirALaLista(grupo) {

    if (grupo.valor.length === 0) return;

    const indice =
        Math.floor(Math.random() * grupo.valor.length);

    const miembro =
        grupo.valor[indice];

    const elemento = li({
        padre: listaActual,
        contenido: miembro
    });

    style({
        elementos: [elemento],
        estilos: {
            fontSize: "20px",
        }
    });

    historial.push({
        tipo: "miembro",
        grupo: grupo,
        miembro: miembro,
        indice: indice,
        elemento: elemento
    });

    grupo.valor =
        grupo.valor.filter((_, i) => i !== indice);
}


// ============================================================
// 17. DESHACER
// ============================================================

function deshacer() {

    if (historial.length === 0) return;

    const ultimaAccion = historial.pop();


    // --------------------------------------------------------
    // DESHACER MIEMBRO
    // --------------------------------------------------------

    if (ultimaAccion.tipo === "miembro") {

        const grupo = ultimaAccion.grupo;
        const miembro = ultimaAccion.miembro;
        const indice = ultimaAccion.indice;

        grupo.valor = [
            ...grupo.valor.slice(0, indice),
            miembro,
            ...grupo.valor.slice(indice)
        ];

        ultimaAccion.elemento.remove();

        return;
    }


    // --------------------------------------------------------
    // DESHACER GRUPO
    // --------------------------------------------------------

    if (ultimaAccion.tipo === "grupo") {

        ultimaAccion.elemento.remove();

        grupo_actual--;

        const grupos =
            [...listaGrupos.children];

        if (grupos.length > 0) {

            const ultimoGrupo =
                grupos[grupos.length - 1];

            grupoActualElemento = ultimoGrupo;

            listaActual =
                ultimoGrupo.querySelector("ol");

        }
    }
}


// ============================================================
// 18. REINICIAR
// ============================================================

function reiniciar() {

    listaGrupos.innerHTML = "";

    casadosA.valor = [...originalesCasadosA];
    casadosB.valor = [...originalesCasadosB];
    solterosA.valor = [...originalesSolterosA];
    solterosB.valor = [...originalesSolterosB];

    historial.length = 0;

    grupo_actual = 1;

    const primerGrupo = crearGrupo(1);

    grupoActualElemento = primerGrupo.contenedor;
    listaActual = primerGrupo.lista;
}


// ============================================================
// 19. OBTENER TEXTO DEL GRUPO
// ============================================================

function obtenerTextoGrupo(grupoElemento) {

    const tituloGrupo =
        grupoElemento.querySelector("p");

    const integrantes =
        [...grupoElemento.querySelectorAll("ol li")];

    let texto =
        `${tituloGrupo.textContent}\n\n`;

    integrantes.forEach((elemento, indice) => {

        texto +=
            `${indice + 1}. ${elemento.textContent}\n`;

    });

    return texto.trim();
}


// ============================================================
// 20. ABRIR WHATSAPP
// ============================================================

function compartirEnWhatsApp(texto) {

    const mensaje =
        encodeURIComponent(texto);

    const esMovil =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );

    if (esMovil) {

        window.location.href =
            `whatsapp://send?text=${mensaje}`;

    } else {

        window.location.href =
            `https://web.whatsapp.com/send?text=${mensaje}`;

    }
}


// ============================================================
// 21. SELECCIONAR GRUPO PARA COMPARTIR
// ============================================================

function compartirGrupo() {

    const grupos =
        [...listaGrupos.children];

    if (grupos.length === 0) return;


    const fondo = div({
        padre: body
    });

    style({
        elementos: [fondo],
        estilos: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: "999",
        }
    });


    const ventana = div({
        padre: fondo
    });

    style({
        elementos: [ventana],
        estilos: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            background: "white",
            border: "3px solid #064C9C",
            padding: "20px",
            boxSizing: "border-box",
            borderRadius: "10px",
            textAlign: "center",
        }
    });


    const tituloVentana = p({
        padre: ventana,
        contenido: "¿Qué grupo quieres compartir?"
    });

    style({
        elementos: [tituloVentana],
        estilos: {
            fontSize: "22px",
            margin: "0 0 20px 0",
        }
    });


    grupos.forEach((grupoElemento, indice) => {

        const botonGrupo = button({
            padre: ventana,
            contenido: `Grupo ${indice + 1}`,

            funcionalidad: {
                click: () => {

                    const texto =
                        obtenerTextoGrupo(
                            grupoElemento
                        );

                    fondo.remove();

                    compartirEnWhatsApp(texto);
                }
            }
        });

        style({
            elementos: [botonGrupo],
            estilos: {
                display: "block",
                width: "100%",
                margin: "10px 0",
                padding: "10px",
                background: "#064C9C",
                color: "white",
                fontSize: "18px",
            }
        });
    });


    const botonCancelar = button({
        padre: ventana,
        contenido: "Cancelar",

        funcionalidad: {
            click: () => {
                fondo.remove();
            }
        }
    });

    style({
        elementos: [botonCancelar],
        estilos: {
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            background: "#777",
            color: "white",
            fontSize: "18px",
        }
    });
}


// ============================================================
// 22. BOTONES INFERIORES
// ============================================================

const columna_principal_botones = columna({
    padre: botones
});

const fila1 = fila({
    padre: columna_principal_botones,
    peso: "1f"
});

const fila2 = fila({
    padre: columna_principal_botones,
    peso: "1f"
});


// ============================================================
// 23. FILA 1
// ============================================================

const pasarDeGrupoBoton = button({
    contenido: "siguiente grupo",
    padre: fila1,
    peso: "2f",

    funcionalidad: {
        click: cambiarDeGrupo
    }
});

const compartirBoton = button({
    contenido: "compartir",
    padre: fila1,
    peso: "1f",

    funcionalidad: {
        click: compartirGrupo
    }
});


// ============================================================
// 24. FILA 2
// ============================================================

const botonDeshacer = button({
    contenido: "Deshacer",
    padre: fila2,
    peso: "1f",

    funcionalidad: {
        click: deshacer
    }
});

const botonReiniciar = button({
    contenido: "Reiniciar",
    padre: fila2,
    peso: "1f",

    funcionalidad: {
        click: reiniciar
    }
});

const botonAjustes = button({
    padre: fila2,
    peso: "1f"
});

const enlace = a({
    padre: botonAjustes,
    href: "ajustes.html",
    contenido: "ajustes"
});


// ============================================================
// 25. ESTILOS DE LOS BOTONES
// ============================================================

style({
    elementos: [enlace],
    estilos: {
        color: "white",
        textDecoration: "none",
    }
});

style({
    elementos: [
        botonCasadosA,
        botonCasadosB,
        botonSolterosA,
        botonSolterosB,
        pasarDeGrupoBoton,
        compartirBoton,
        botonAjustes,
        botonDeshacer,
        botonReiniciar
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