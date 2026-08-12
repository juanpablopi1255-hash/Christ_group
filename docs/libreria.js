//base

export const body = document.querySelector('body');
export function put({
                        etiqueta = "",
                        contenido,
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        desarrollador = false,
                        peso = "",
                    }) {
    const elementoNuevo = document.createElement(etiqueta);
    return mod({
        elemento: elementoNuevo,
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso,
    });
}

export function mod({
                        elemento,
                        contenido,
                        padre = null,
                        atributos = {},
                        funcionalidad = {},
                        desarrollador = false,
                        peso = "",
                    }) {
    for (const [clave, valor] of Object.entries(atributos)) {
        elemento.setAttribute(clave, valor);
    }
    if (peso !== "") {
        const valorFlex = typeof peso === 'string' ? peso.replace('f', '').trim() : peso;
        elemento.style.flex = `${valorFlex} ${valorFlex} 0%`;
    }

    if (contenido) {
        if (Array.isArray(contenido)) {
            contenido.forEach(hijo => {
                if (hijo) elemento.appendChild(hijo);
            });
        } else if (contenido instanceof HTMLElement) {
            elemento.appendChild(contenido);
        } else {
            if (desarrollador === true) {
                elemento.innerHTML = contenido;
            } else {
                elemento.textContent = contenido;
            }
        }
    }

    for (const [clave, valor] of Object.entries(funcionalidad)) {
        if (typeof valor === 'function') {
            elemento.addEventListener(clave, valor);
        }
    }

    if (padre != null) {
        padre.appendChild(elemento);
    }

    return elemento;
}

export function del(elemento) {
    elemento.remove();
}

export function clear(elemento) {
    elemento.innerHTML = '';
    return elemento;
}

export function style({ elementos = [], estilos = {} } = {}) {
    elementos.forEach((elemento, indice) => {
        Object.assign(elemento.style, estilos);
    });
    return elementos;
}


export function crearEstado({ valorInicial, funcionDeActualizacion }) {
    const caja = { valor: valorInicial };
    funcionDeActualizacion(valorInicial);

    return new Proxy(caja, {
        set(target, propiedad, nuevoValor) {
            if (propiedad === 'valor') {
                target[propiedad] = nuevoValor;
                funcionDeActualizacion(nuevoValor);
            }
            return true;
        }
    });
}


export function columna({ padre = document.body, peso=""}) {
    const contenedor = put({ etiqueta: "div", padre});
    contenedor.style.display = 'flex';
    contenedor.style.flexDirection = 'column';
    contenedor.style.width = '100%';
    contenedor.style.height = '100%';
    if (peso !== "") {
        const valorFlex = typeof peso === 'string' ? peso.replace('f', '').trim() : peso;
        contenedor.style.flex = `${valorFlex} ${valorFlex} 0%`;
    }
    return contenedor;
}

export function fila({ padre = document.body, peso=""}) {
    const contenedor = put({ etiqueta: "div", padre});
    contenedor.style.display = 'flex';
    contenedor.style.flexDirection = 'row';
    contenedor.style.width = '100%';
    contenedor.style.height = '100%';
    if (peso !== "") {
        const valorFlex = typeof peso === 'string' ? peso.replace('f', '').trim() : peso;
        contenedor.style.flex = `${valorFlex} ${valorFlex} 0%`;
    }
    return contenedor;
}



///helpers
export function button({
                           contenido = "",
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = "",
                       }) {
    return put({
        etiqueta: "button",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function input({
                           contenido = "",
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = "",
                       }) {
    return put({
        etiqueta: "input",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function textarea({
                             contenido = "",
                             padre = document.body,
                             atributos = {},
                             funcionalidad = {},
                             desarrollador = false,
                             peso = ""
                         } = {}) {
    return put({
        etiqueta: "textarea",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function label({
                          texto = "",
                          para = "", // Mapea a 'for' (htmlFor)
                          contenido = null,
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          desarrollador = false,
                          peso = ""
                      } = {}) {
    const misAtributos = { ...atributos };
    if (para) misAtributos.for = para;

    return put({
        etiqueta: "label",
        contenido: contenido || texto,
        padre,
        atributos: misAtributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function form({
                         contenido = [],
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         desarrollador = false,
                         peso = ""
                     } = {}) {
    return put({
        etiqueta: "form",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function option({
                           valor = "",
                           texto = "",
                           padre = null,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = ""
                       } = {}) {
    const misAtributos = { value: valor, ...atributos };

    return put({
        etiqueta: "option",
        contenido: texto || valor,
        padre,
        atributos: misAtributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function select({
                           opciones = [],
                           contenido = null,
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = ""
                       } = {}) {
    const sel = put({
        etiqueta: "select",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });

    if (Array.isArray(opciones) && opciones.length > 0) {
        opciones.forEach(opt => {
            if (typeof opt === 'object' && opt !== null) {
                option({
                    valor: opt.valor ?? opt.value ?? "",
                    texto: opt.texto ?? opt.label ?? opt.valor ?? "",
                    padre: sel,
                    atributos: opt.atributos || {}
                });
            } else {
                option({
                    valor: String(opt),
                    texto: String(opt),
                    padre: sel
                });
            }
        });
    }

    return sel;
}


export function checkbox({
                             marcado = false,
                             padre = document.body,
                             atributos = {},
                             funcionalidad = {},
                             peso = ""
                         } = {}) {
    const misAtributos = { type: "checkbox", ...atributos };
    if (marcado) misAtributos.checked = "true";

    return put({
        etiqueta: "input",
        padre,
        atributos: misAtributos,
        funcionalidad,
        peso
    });
}

export function radio({
                          nombre = "",
                          valor = "",
                          marcado = false,
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          peso = ""
                      } = {}) {
    const misAtributos = { type: "radio", ...atributos };
    if (nombre) misAtributos.name = nombre;
    if (valor) misAtributos.value = valor;
    if (marcado) misAtributos.checked = "true";

    return put({
        etiqueta: "input",
        padre,
        atributos: misAtributos,
        funcionalidad,
        peso
    });
}

// ==========================================
// 1. ESTRUCTURA Y CONTENEDORES
// ==========================================

export function div({
                        contenido = "",
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        desarrollador = false,
                        peso = ""
                    } = {}) {
    return put({ etiqueta: "div", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function span({
                         contenido = "",
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         desarrollador = false,
                         peso = ""
                     } = {}) {
    return put({ etiqueta: "span", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function section({
                            contenido = "",
                            padre = document.body,
                            atributos = {},
                            funcionalidad = {},
                            desarrollador = false,
                            peso = ""
                        } = {}) {
    return put({ etiqueta: "section", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function article({
                            contenido = "",
                            padre = document.body,
                            atributos = {},
                            funcionalidad = {},
                            desarrollador = false,
                            peso = ""
                        } = {}) {
    return put({ etiqueta: "article", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function header({
                           contenido = "",
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = ""
                       } = {}) {
    return put({ etiqueta: "header", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function footer({
                           contenido = "",
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = ""
                       } = {}) {
    return put({ etiqueta: "footer", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function main({
                         contenido = "",
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         desarrollador = false,
                         peso = ""
                     } = {}) {
    return put({ etiqueta: "main", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function nav({
                        contenido = "",
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        desarrollador = false,
                        peso = ""
                    } = {}) {
    return put({ etiqueta: "nav", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function aside({
                          contenido = "",
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          desarrollador = false,
                          peso = ""
                      } = {}) {
    return put({ etiqueta: "aside", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}


// ==========================================
// 2. TIPOGRAFÍA Y TEXTO
// ==========================================

// Encabezados (h1 a h6) mediante una función generadora para no repetir código
function crearEncabezado(nivel) {
    return function ({
                         texto = "",
                         contenido = null,
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         desarrollador = false,
                         peso = ""
                     } = {}) {
        return put({
            etiqueta: `h${nivel}`,
            contenido: contenido || texto,
            padre,
            atributos,
            funcionalidad,
            desarrollador,
            peso
        });
    };
}

export const h1 = crearEncabezado(1);
export const h2 = crearEncabezado(2);
export const h3 = crearEncabezado(3);
export const h4 = crearEncabezado(4);
export const h5 = crearEncabezado(5);
export const h6 = crearEncabezado(6);

export function p({
                      texto = "",
                      contenido = null,
                      padre = document.body,
                      atributos = {},
                      funcionalidad = {},
                      desarrollador = false,
                      peso = ""
                  } = {}) {
    return put({
        etiqueta: "p",
        contenido: contenido || texto,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function a({
                      href = "#",
                      texto = "",
                      contenido = null,
                      target = "_self",
                      padre = document.body,
                      atributos = {},
                      funcionalidad = {},
                      desarrollador = false,
                      peso = ""
                  } = {}) {
    const misAtributos = { href, target, ...atributos };

    return put({
        etiqueta: "a",
        contenido: contenido || texto || href,
        padre,
        atributos: misAtributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

// Alias para 'a' por si prefieres llamarlo link()
export const link = a;

export function strong({
                           texto = "",
                           contenido = null,
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           desarrollador = false,
                           peso = ""
                       } = {}) {
    return put({
        etiqueta: "strong",
        contenido: contenido || texto,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}

export function em({
                       texto = "",
                       contenido = null,
                       padre = document.body,
                       atributos = {},
                       funcionalidad = {},
                       desarrollador = false,
                       peso = ""
                   } = {}) {
    return put({
        etiqueta: "em",
        contenido: contenido || texto,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}
export function code({
                         codigo = "",
                         contenido = null,
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         desarrollador = false,
                         peso = ""
                     } = {}) {
    return put({
        etiqueta: "code",
        contenido: contenido || codigo,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}
export function blockquote({
                               texto = "",
                               cita = "",
                               contenido = null,
                               padre = document.body,
                               atributos = {},
                               funcionalidad = {},
                               desarrollador = false,
                               peso = ""
                           } = {}) {
    const misAtributos = { ...atributos };
    if (cita) misAtributos.cite = cita;

    return put({
        etiqueta: "blockquote",
        contenido: contenido || texto,
        padre,
        atributos: misAtributos,
        funcionalidad,
        desarrollador,
        peso
    });
}
// ==========================================
// 1. LISTAS Y ÍTEMS
// ==========================================

export function li({
                       contenido = "",
                       padre = null,
                       atributos = {},
                       funcionalidad = {},
                       desarrollador = false,
                       peso = ""
                   } = {}) {
    return put({
        etiqueta: "li",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}


export function ol({
                       contenido = "",
                       padre = null,
                       atributos = {},
                       funcionalidad = {},
                       desarrollador = false,
                       peso = ""
                   } = {}) {
    return put({
        etiqueta: "ol",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}


export function ul({
                       contenido = "",
                       padre = null,
                       atributos = {},
                       funcionalidad = {},
                       desarrollador = false,
                       peso = ""
                   } = {}) {
    return put({
        etiqueta: "ul",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso
    });
}



// ==========================================
// 2. TABLAS Y COMPONENTES
// ==========================================

export function th({ contenido = "", padre = null, atributos = {}, funcionalidad = {}, desarrollador = false, peso = "" } = {}) {
    return put({ etiqueta: "th", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function td({ contenido = "", padre = null, atributos = {}, funcionalidad = {}, desarrollador = false, peso = "" } = {}) {
    return put({ etiqueta: "td", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function tr({ contenido = [], padre = null, atributos = {}, funcionalidad = {}, desarrollador = false, peso = "" } = {}) {
    return put({ etiqueta: "tr", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function thead({ contenido = null, padre = null, atributos = {}, funcionalidad = {}, desarrollador = false, peso = "" } = {}) {
    return put({ etiqueta: "thead", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function tbody({ contenido = null, padre = null, atributos = {}, funcionalidad = {}, desarrollador = false, peso = "" } = {}) {
    return put({ etiqueta: "tbody", contenido, padre, atributos, funcionalidad, desarrollador, peso });
}

export function table({
                          encabezados = [], // Array de títulos ["ID", "Nombre", "Rol"]
                          filas = [],       // Array de arrays [ [1, "Juan", "Dev"], [2, "Ana", "Design"] ]
                          contenido = null,
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          desarrollador = false,
                          peso = ""
                      } = {}) {
    const tabla = put({ etiqueta: "table", contenido, padre, atributos, funcionalidad, desarrollador, peso });

    // Renderizar thead automáticamente si hay encabezados
    if (Array.isArray(encabezados) && encabezados.length > 0) {
        const tHead = thead({ padre: tabla });
        const filaHead = tr({ padre: tHead });
        encabezados.forEach(headText => {
            th({ contenido: headText, padre: filaHead });
        });
    }

    // Renderizar tbody automáticamente si hay filas
    if (Array.isArray(filas) && filas.length > 0) {
        const tBody = tbody({ padre: tabla });
        filas.forEach(rowData => {
            const filaBody = tr({ padre: tBody });
            if (Array.isArray(rowData)) {
                rowData.forEach(cellData => {
                    td({ contenido: cellData, padre: filaBody });
                });
            }
        });
    }

    return tabla;
}
// ==========================================
// 3. MULTIMEDIA
// ==========================================

export function img({
                        src = "",
                        alt = "",
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        peso = ""
                    } = {}) {
    const misAtributos = { src, alt, ...atributos };
    return put({ etiqueta: "img", padre, atributos: misAtributos, funcionalidad, peso });
}

export function svg({
                        pathData = "", // String de path o array de paths
                        viewBox = "0 0 24 24",
                        ancho = "24",
                        alto = "24",
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        peso = ""
                    } = {}) {
    const elSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    elSvg.setAttribute("viewBox", viewBox);
    elSvg.setAttribute("width", ancho);
    elSvg.setAttribute("height", alto);
    elSvg.setAttribute("fill", "currentColor");

    const paths = Array.isArray(pathData) ? pathData : [pathData];
    paths.forEach(d => {
        if (d) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            elSvg.appendChild(path);
        }
    });

    return mod({
        elemento: elSvg,
        padre,
        atributos,
        funcionalidad,
        peso
    });
}

export function icon({
                         nombre = "", // Ej: "fa-user", "lucide-check", o clase CSS
                         svgData = "",
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         peso = ""
                     } = {}) {
    if (svgData) {
        return svg({ pathData: svgData, padre, atributos, funcionalidad, peso });
    }

    const claseExistente = atributos.class ? `${atributos.class} ${nombre}` : nombre;
    return put({
        etiqueta: "i",
        padre,
        atributos: { ...atributos, class: claseExistente.trim() },
        funcionalidad,
        peso
    });
}

export function avatar({
                           src = "",
                           nombre = "",
                           tamano = "40px",
                           padre = document.body,
                           atributos = {},
                           funcionalidad = {},
                           peso = ""
                       } = {}) {
    const contenedor = put({
        etiqueta: "div",
        padre,
        peso,
        atributos: {
            ...atributos,
            style: `width: ${tamano}; height: ${tamano}; border-radius: 50%; overflow: hidden;
                    display: inline-flex; align-items: center; justify-content: center;
                    background-color: #6c757d; color: white; font-weight: bold;
                    font-size: calc(${tamano} / 2.2); user-select: none; ${atributos.style || ''}`
        },
        funcionalidad
    });

    if (src) {
        const imagen = img({
            src,
            alt: nombre,
            padre: contenedor,
            atributos: { style: "width: 100%; height: 100%; object-fit: cover;" }
        });

        // Fallback a iniciales si la imagen falla al cargar
        imagen.addEventListener("error", () => {
            imagen.remove();
            renderIniciales();
        });
    } else {
        renderIniciales();
    }

    function renderIniciales() {
        contenedor.textContent = nombre
            ? nombre.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
            : "?";
    }

    return contenedor;
}
// ==========================================
// LAYOUTS Y ESTRUCTURA ESPACIAL
// ==========================================

export function flex({
                         direccion = "row", // "row" | "column" | "row-reverse" | "column-reverse"
                         gap = "10px",
                         alinear = "stretch", // align-items
                         justificar = "flex-start", // justify-content
                         wrap = "nowrap",
                         contenido = [],
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         peso = ""
                     } = {}) {
    const contenedor = put({
        etiqueta: "div",
        contenido,
        padre,
        atributos,
        funcionalidad,
        peso
    });

    style({
        elemento: contenedor,
        estilos: {
            display: "flex",
            flexDirection: direccion,
            gap,
            alignItems: alinear,
            justifyContent: justificar,
            flexWrap: wrap
        }
    });

    return contenedor;
}

export function grid({
                         columnas = "repeat(auto-fit, minmax(250px, 1fr))", // Acepta números (ej: 3) o cadenas CSS
                         gap = "15px",
                         contenido = [],
                         padre = document.body,
                         atributos = {},
                         funcionalidad = {},
                         peso = ""
                     } = {}) {
    const templateCols = typeof columnas === "number" ? `repeat(${columnas}, 1fr)` : columnas;

    const contenedor = put({
        etiqueta: "div",
        contenido,
        padre,
        atributos,
        funcionalidad,
        peso
    });

    style({
        elemento: contenedor,
        estilos: {
            display: "grid",
            gridTemplateColumns: templateCols,
            gap
        }
    });

    return contenedor;
}

export function row({
                        gap = "15px",
                        contenido = [],
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        peso = ""
                    } = {}) {
    return flex({
        direccion: "row",
        gap,
        wrap: "wrap",
        contenido,
        padre,
        atributos,
        funcionalidad,
        peso
    });
}

export function col({
                        span = "1f", // Integrado con tu sistema de 'peso' (ej: "1f", "2f" o porcentaje "50%")
                        contenido = [],
                        padre = document.body,
                        atributos = {},
                        funcionalidad = {},
                        desarrollador = false
                    } = {}) {
    const columnaEl = put({
        etiqueta: "div",
        contenido,
        padre,
        atributos,
        funcionalidad,
        desarrollador,
        peso: typeof span === "number" ? `${span}f` : span
    });

    style({
        elemento: columnaEl,
        estilos: {
            boxSizing: "border-box"
        }
    });

    return columnaEl;
}

export function stack({
                          gap = "10px",
                          alinear = "stretch",
                          contenido = [],
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          peso = ""
                      } = {}) {
    return flex({
        direccion: "column",
        gap,
        alinear,
        contenido,
        padre,
        atributos,
        funcionalidad,
        peso
    });
}

export function spacer({
                           tamano = "15px",
                           padre = document.body,
                           atributos = {}
                       } = {}) {
    const el = put({
        etiqueta: "div",
        padre,
        atributos
    });

    style({
        elemento: el,
        estilos: {
            width: tamano,
            height: tamano,
            flexShrink: "0"
        }
    });

    return el;
}

export function container({
                              maxWidth = "1200px",
                              contenido = [],
                              padre = document.body,
                              atributos = {},
                              funcionalidad = {},
                              peso = ""
                          } = {}) {
    const contenedor = put({
        etiqueta: "div",
        contenido,
        padre,
        atributos,
        funcionalidad,
        peso
    });

    style({
        elemento: contenedor,
        estilos: {
            width: "100%",
            maxWidth,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "15px",
            paddingRight: "15px",
            boxSizing: "border-box"
        }
    });

    return contenedor;
}

export function divider({
                            orientacion = "horizontal", // "horizontal" | "vertical"
                            color = "#e0e0e0",
                            grosor = "1px",
                            padre = document.body,
                            atributos = {}
                        } = {}) {
    const esHoriz = orientacion === "horizontal";
    const el = put({
        etiqueta: "hr",
        padre,
        atributos
    });

    style({
        elemento: el,
        estilos: {
            border: "none",
            backgroundColor: color,
            margin: "10px 0",
            width: esHoriz ? "100%" : grosor,
            height: esHoriz ? grosor : "100%",
            alignSelf: "stretch"
        }
    });

    return el;
}
// ==========================================
// NOTIFICACIONES Y FEEDBACK
// ==========================================

// Contenedor global para los toasts (se crea bajo demanda)
let contenedorToasts = null;

export function toast({
                          mensaje = "",
                          duracion = 3000,
                          tipo = "info", // "info" | "exito" | "error" | "advertencia"
                          posicion = "top-right" // "top-right" | "top-left" | "bottom-right" | "bottom-left"
                      } = {}) {
    if (!contenedorToasts) {
        contenedorToasts = put({
            etiqueta: "div",
            padre: document.body
        });

        const esTop = posicion.includes("top");
        const esLeft = posicion.includes("left");

        style({
            elemento: contenedorToasts,
            estilos: {
                position: "fixed",
                top: esTop ? "20px" : "auto",
                bottom: esTop ? "auto" : "20px",
                left: esLeft ? "20px" : "auto",
                right: esLeft ? "auto" : "20px",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pointerEvents: "none"
            }
        });
    }

    const colores = {
        info: { bg: "#2196F3", texto: "#FFF" },
        exito: { bg: "#4CAF50", texto: "#FFF" },
        error: { bg: "#F44336", texto: "#FFF" },
        advertencia: { bg: "#FF9800", texto: "#FFF" }
    };

    const configuracion = colores[tipo] || colores.info;

    const notificacion = put({
        etiqueta: "div",
        contenido: mensaje,
        padre: contenedorToasts
    });

    style({
        elemento: notificacion,
        estilos: {
            backgroundColor: configuracion.bg,
            color: configuracion.texto,
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            fontSize: "14px",
            fontFamily: "sans-serif",
            opacity: "0",
            transform: "translateY(-10px)",
            transition: "all 0.3s ease",
            pointerEvents: "auto"
        }
    });

    // Animar entrada
    requestAnimationFrame(() => {
        style({
            elemento: notificacion,
            estilos: {
                opacity: "1",
                transform: "translateY(0)"
            }
        });
    });

    // Salida y destrucción
    setTimeout(() => {
        style({
            elemento: notificacion,
            estilos: {
                opacity: "0",
                transform: "translateY(-10px)"
            }
        });
        setTimeout(() => del(notificacion), 300);
    }, duracion);

    return notificacion;
}

export function badge({
                          texto = "",
                          variante = "primario", // "primario" | "secundario" | "exito" | "peligro"
                          padre = document.body,
                          atributos = {},
                          funcionalidad = {},
                          peso = ""
                      } = {}) {
    const colores = {
        primario: { bg: "#007bff", color: "#fff" },
        secundario: { bg: "#6c757d", color: "#fff" },
        exito: { bg: "#28a745", color: "#fff" },
        peligro: { bg: "#dc3545", color: "#fff" }
    };

    const estiloAplicar = colores[variante] || colores.primario;

    const el = put({
        etiqueta: "span",
        contenido: texto,
        padre,
        atributos,
        funcionalidad,
        peso
    });

    style({
        elemento: el,
        estilos: {
            display: "inline-block",
            padding: "0.25em 0.6em",
            fontSize: "75%",
            fontWeight: "700",
            lineHeight: "1",
            textAlign: "center",
            whiteSpace: "nowrap",
            verticalAlign: "baseline",
            borderRadius: "10px",
            backgroundColor: estiloAplicar.bg,
            color: estiloAplicar.color
        }
    });

    return el;
}

export function spinner({
                            tamano = "24px",
                            color = "#007bff",
                            padre = document.body,
                            atributos = {},
                            peso = ""
                        } = {}) {
    const el = put({
        etiqueta: "div",
        padre,
        atributos,
        peso
    });

    style({
        elemento: el,
        estilos: {
            width: tamano,
            height: tamano,
            border: `3px solid rgba(0,0,0,0.1)`,
            borderTopColor: color,
            borderRadius: "50%",
            animation: "libreria-spin 0.8s linear infinite",
            display: "inline-block"
        }
    });

    // Asegurar animación keyframes global
    if (!document.getElementById("libreria-spin-style")) {
        const styleSheet = put({
            etiqueta: "style",
            padre: document.head,
            atributos: { id: "libreria-spin-style" }
        });
        styleSheet.textContent = `@keyframes libreria-spin { to { transform: rotate(360deg); } }`;
    }

    return el;
}

// Alias para spinner
export const loader = spinner;

export function progress({
                             valor = 0,
                             maximo = 100,
                             padre = document.body,
                             atributos = {},
                             funcionalidad = {},
                             peso = ""
                         } = {}) {
    const misAtributos = { value: valor, max: maximo, ...atributos };

    const el = put({
        etiqueta: "progress",
        padre,
        atributos: misAtributos,
        funcionalidad,
        peso
    });

    style({
        elemento: el,
        estilos: {
            width: "100%",
            height: "12px"
        }
    });

    return el;
}
// ==========================================
// NAVEGACIÓN Y COMPONENTES COMPLEJOS
// ==========================================

export function card({
                         header = null,
                         body = null,
                         footer = null,
                         padre = document.body,
                         atributos = {},
                         peso = ""
                     } = {}) {
    const tarjeta = put({ etiqueta: "div", padre, atributos, peso });

    style({
        elemento: tarjeta,
        estilos: {
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#fff",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
        }
    });

    if (header) {
        const h = put({ etiqueta: "div", contenido: header, padre: tarjeta });
        style({ elemento: h, estilos: { padding: "15px", borderBottom: "1px solid #f0f0f0", fontWeight: "bold" } });
    }
    if (body) {
        const b = put({ etiqueta: "div", contenido: body, padre: tarjeta });
        style({ elemento: b, estilos: { padding: "15px" } });
    }
    if (footer) {
        const f = put({ etiqueta: "div", contenido: footer, padre: tarjeta });
        style({ elemento: f, estilos: { padding: "10px 15px", borderTop: "1px solid #f0f0f0", backgroundColor: "#fafafa" } });
    }

    return tarjeta;
}

export function navbar({
                           brand = "",
                           links = [], // Array de objetos { texto, href, onClick }
                           acciones = [], // Botones a la derecha
                           padre = document.body
                       } = {}) {
    const nav = put({ etiqueta: "nav", padre });

    style({
        elemento: nav,
        estilos: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #eaeaea"
        }
    });

    // Brand / Logo
    put({ etiqueta: "div", contenido: brand, padre: nav });

    // Links centrales
    const contenedorLinks = put({ etiqueta: "div", padre: nav });
    style({ elemento: contenedorLinks, estilos: { display: "flex", gap: "15px" } });

    links.forEach(l => {
        put({
            etiqueta: "a",
            contenido: l.texto,
            padre: contenedorLinks,
            atributos: { href: l.href || "#" },
            funcionalidad: l.onClick ? { click: l.onClick } : {}
        });
    });

    // Acciones secundarias
    if (acciones.length > 0) {
        const contenedorAcciones = put({ etiqueta: "div", contenido: acciones, padre: nav });
        style({ elemento: contenedorAcciones, estilos: { display: "flex", gap: "10px" } });
    }

    return nav;
}

export function sidebar({
                            items = [], // Array de { texto, icono, onClick }
                            padre = document.body
                        } = {}) {
    const aside = put({ etiqueta: "aside", padre });

    style({
        elemento: aside,
        estilos: {
            width: "240px",
            height: "100vh",
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }
    });

    items.forEach(item => {
        const btn = put({
            etiqueta: "div",
            contenido: item.texto,
            padre: aside,
            funcionalidad: item.onClick ? { click: item.onClick } : {}
        });

        style({
            elemento: btn,
            estilos: {
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s"
            }
        });

        btn.addEventListener("mouseenter", () => style({ elemento: btn, estilos: { backgroundColor: "#334155" } }));
        btn.addEventListener("mouseleave", () => style({ elemento: btn, estilos: { backgroundColor: "transparent" } }));
    });

    return aside;
}

export function tabs({
                         tabList = [], // Array de { titulo, contenido }
                         activeTab = 0,
                         padre = document.body
                     } = {}) {
    const contenedor = put({ etiqueta: "div", padre });
    const cabecera = put({ etiqueta: "div", padre: contenedor });
    const cuerpo = put({ etiqueta: "div", padre: contenedor });

    style({ elemento: cabecera, estilos: { display: "flex", borderBottom: "2px solid #e2e8f0" } });
    style({ elemento: cuerpo, estilos: { padding: "15px" } });

    let pestanaActiva = activeTab;

    const render = () => {
        clear(cabecera);
        clear(cuerpo);

        tabList.forEach((tab, index) => {
            const esActiva = index === pestanaActiva;
            const btn = put({
                etiqueta: "button",
                contenido: tab.titulo,
                padre: cabecera,
                funcionalidad: {
                    click: () => {
                        pestanaActiva = index;
                        render();
                    }
                }
            });

            style({
                elemento: btn,
                estilos: {
                    padding: "10px 20px",
                    border: "none",
                    background: "none",
                    borderBottom: esActiva ? "2px solid #007bff" : "none",
                    fontWeight: esActiva ? "bold" : "normal",
                    cursor: "pointer"
                }
            });

            if (esActiva) {
                mod({ elemento: cuerpo, contenido: tab.contenido });
            }
        });
    };

    render();
    return contenedor;
}

export function accordion({
                              secciones = [], // Array de { titulo, contenido }
                              padre = document.body
                          } = {}) {
    const contenedor = put({ etiqueta: "div", padre });

    secciones.forEach(sec => {
        const item = put({ etiqueta: "div", padre: contenedor });
        style({ elemento: item, estilos: { borderBottom: "1px solid #ccc" } });

        const header = put({
            etiqueta: "div",
            contenido: sec.titulo,
            padre: item
        });
        style({ elemento: header, estilos: { padding: "12px", cursor: "pointer", fontWeight: "bold", backgroundColor: "#f8f9fa" } });

        const body = put({
            etiqueta: "div",
            contenido: sec.contenido,
            padre: item
        });
        style({ elemento: body, estilos: { padding: "12px", display: "none" } });

        header.addEventListener("click", () => {
            const estaVisible = body.style.display === "block";
            body.style.display = estaVisible ? "none" : "block";
        });
    });

    return contenedor;
}

export function dropdown({
                             trigger, // Elemento que activa el desplegable
                             items = [], // Array de { texto, onClick }
                             padre = document.body
                         } = {}) {
    const contenedor = put({ etiqueta: "div", padre });
    style({ elemento: contenedor, estilos: { position: "relative", display: "inline-block" } });

    if (trigger instanceof HTMLElement) contenedor.appendChild(trigger);

    const menu = put({ etiqueta: "div", padre: contenedor });
    style({
        elemento: menu,
        estilos: {
            display: "none",
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            minWidth: "150px",
            zIndex: "100"
        }
    });

    items.forEach(it => {
        const opcion = put({
            etiqueta: "div",
            contenido: it.texto,
            padre: menu,
            funcionalidad: {
                click: () => {
                    if (it.onClick) it.onClick();
                    menu.style.display = "none";
                }
            }
        });
        style({ elemento: opcion, estilos: { padding: "8px 12px", cursor: "pointer" } });
    });

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    return contenedor;
}

export function pagination({
                               paginaActual = 1,
                               totalPaginas = 1,
                               onChange,
                               padre = document.body
                           } = {}) {
    const contenedor = put({ etiqueta: "div", padre });
    style({ elemento: contenedor, estilos: { display: "flex", gap: "5px", alignItems: "center" } });

    for (let i = 1; i <= totalPaginas; i++) {
        const esActiva = i === paginaActual;
        put({
            etiqueta: "button",
            contenido: String(i),
            padre: contenedor,
            funcionalidad: {
                click: () => {
                    if (typeof onChange === "function") onChange(i);
                }
            },
            atributos: {
                style: `padding: 5px 10px; cursor: pointer; border: 1px solid #ccc; background: ${esActiva ? '#007bff' : '#fff'}; color: ${esActiva ? '#fff' : '#000'}`
            }
        });
    }

    return contenedor;
}

export function breadcrumb({
                               items = [], // Array de { texto, href }
                               padre = document.body
                           } = {}) {
    const nav = put({ etiqueta: "nav", padre });
    style({ elemento: nav, estilos: { display: "flex", gap: "8px", fontSize: "14px", color: "#666" } });

    items.forEach((item, index) => {
        if (index > 0) {
            put({ etiqueta: "span", contenido: "/", padre: nav });
        }

        if (item.href) {
            put({ etiqueta: "a", contenido: item.texto, padre: nav, atributos: { href: item.href } });
        } else {
            put({ etiqueta: "span", contenido: item.texto, padre: nav });
        }
    });

    return nav;
}