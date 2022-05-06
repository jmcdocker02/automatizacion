import { Eliminar } from "./Eliminar.js";
import { Guardar } from "./Guardar.js";
import { MostrarModal } from "./MostrarModal.js";
import { ObtieneDatosTabla } from "../../funciones/ObtieneDatosTabla.js";
import { Modal } from "../../componentes/Modal.js";
import Acciones from "./acciones/Acciones.js";
import Columnas from "./columnas/Columnas.js";
import FiltrosFormulario from "./filtrosformulario/FiltrosFormulario.js";
import Menus from "./menus/Menus.js";
import ImportacionExcel from "../importacionExcel/ImportacionExcel.js";
import { Boton } from "../../componentes/Boton.js";
import { RestaurarFormularioPrincipal } from "../../funciones/RestaurarFormularioPrincipal.js";
import { ObtienePrefijo } from "./ObtienePrefijo.js";
import { ObtieneOpcionesSelect } from "../../funciones/ObtieneOpcionesSelect.js";

export async function CambiarFiltros(e) {
    if (e.target.tagName === "FORM") e.preventDefault();
    switch (e.target.id) {
        case "id-Agregar":
            await MostrarModal(0);
            break;
        case "id-guardar":
            await Guardar(e.target.getAttribute("data-id"));
            break;
        case "id-Modificar":
            await MostrarModal(e.target.getAttribute("data-for01"))
            break;
        case "id-Eliminar":
            await Eliminar(e.target.getAttribute("data-for01"));
            break;
        case "id-Acciones":
            await Acciones({
                "idFormulario": e.target.getAttribute("data-for01"),
                "idAcciones": e.target.getAttribute("data-id")
            });
            Modal({
                "titulo": "Acciones",
                "claseModal": "modal-fullscreen",
                "tablero": "secundaria",
                "botones": Boton({
                    "name": "cerrar",
                    "texto": "Cerrar",
                    "atributos": [{
                        "atributo": "data-bs-dismiss",
                        "valor": "modal",
                    }, ]

                }),
                "funcion": CambiarFiltros
            })
            break;
        case "id-Columnas":
            await Columnas({
                "idFormulario": e.target.getAttribute("data-for01"),
                "idColumnas": e.target.getAttribute("data-id")
            })
            Modal({
                "titulo": "Columnas",
                "claseModal": "modal-fullscreen",
                "tablero": "secundaria",
                "botones": Boton({
                    "name": "cerrar",
                    "texto": "Cerrar",
                    "atributos": [{
                        "atributo": "data-bs-dismiss",
                        "valor": "modal",
                    }, ]

                }),
                "funcion": CambiarFiltros
            })
            break;
        case "id-Filtros":            
              await FiltrosFormulario({
                  "idFormulario": e.target.getAttribute("data-for01"),
                  "idFiltrosFormulario": e.target.getAttribute("data-id")
              })
              Modal({
                  "titulo": "Filtros Formulario",
                  "claseModal": "modal-fullscreen",
                  "tablero": "secundaria",
                  "botones": Boton({
                      "name": "cerrar",
                      "texto": "Cerrar",
                      "atributos": [{
                          "atributo": "data-bs-dismiss",
                          "valor": "modal",
                      }, ]
  
                  }),
                  "funcion": CambiarFiltros
              })
              break;
        case "id-Importaciones":
            await ImportacionExcel({
                "idFormulario": e.target.getAttribute("data-for01"),
                "idImportaciones": e.target.getAttribute("data-id")
            })
            Modal({
                "titulo": "Importacion Excel",
                "claseModal": "modal-fullscreen",
                "tablero": "secundaria",
                "botones": Boton({
                    "name": "cerrar",
                    "texto": "Cerrar",
                    "atributos": [{
                        "atributo": "data-bs-dismiss",
                        "valor": "modal",
                    }, ]

                }),
                "funcion": CambiarFiltros
            })
            break;
        case "id-cerrar":
            RestaurarFormularioPrincipal("Formularios");
            const $divFiltro = document.getElementById("id-modal-filtros");
            document.getElementById("modal-secundaria-encabezado").removeChild($divFiltro);
            await ObtieneOpcionesSelect({
              "idFormulario": 16,
              "tabla": "menus",
              "campoLlave": "men01",
              "campoDescripcion": "men02",
              "$select": document.getElementById("id-menus")
            });
            document.getElementById("id-menus").value = sessionStorage.getItem("modulo");
            break;            
        case "id-menus":
            sessionStorage.setItem("modulo", document.getElementById("id-menus").value);
            await ObtieneDatosTabla({ "funcion": CambiarFiltros });
            break;
        case "id-for06":    
            const $for06 = document.getElementById("id-for06")
            const prefijo = ObtienePrefijo("id-for06");
            document.getElementById("id-for07").value = ($for06.value != "") ? "v"+$for06.value : "";
            document.getElementById("id-for10").value = prefijo;
            document.getElementById("id-for11").value = prefijo+"01";
            document.getElementById("id-for12").value = prefijo+"02";
            break;
        case "id-boton-menus":
            await Menus(e.target.getAttribute("data-id")); 
            await Modal({
              "titulo": "Mantenimiento Menus",
              "claseModal": "modal-fullscreen",
              "tablero": "secundaria",
              "botones": Boton({
                "name": "cerrar",
                "texto": "Cerrar",
                "atributos": [{
                  "atributo": "data-bs-dismiss",
                  "valor": "modal",
                }, ]
              }),
              "funcion": CambiarFiltros
            });
            break;
    }
    switch (e.target.parentNode.id) {
        case "id-Agregar":
            await MostrarModal(0)
            break;
        case "id-guardar":
            await Guardar(e.target.parentNode.getAttribute("data-id"))
            break;
        case "id-Modificar":         
          await MostrarModal(e.target.parentNode.getAttribute("data-for01"))
          break;
        case "id-Eliminar":
          await Eliminar(e.target.parentNode.getAttribute("data-for01"));
          break;  
        case "id-boton-menus":
            await Menus(e.target.parentNode.getAttribute("data-id")); 
            await Modal({
              "titulo": "Mantenimiento Menus",
              "claseModal": "modal-fullscreen",
              "tablero": "secundaria",
              "botones": Boton({
                "name": "cerrar",
                "texto": "Cerrar",
                "atributos": [{
                  "atributo": "data-bs-dismiss",
                  "valor": "modal",
                }, ]
              }),
              "funcion": CambiarFiltros
            });
          break;
        case "id-Acciones":
            await Acciones({
                "idFormulario": e.target.parentNode.getAttribute("data-for01"),
                "idAcciones": e.target.parentNode.getAttribute("data-id")
            });
            await Modal({
                "titulo": "Acciones",
                "claseModal": "modal-fullscreen",
                "tablero": "secundaria",
                "botones": Boton({
                    "name": "cerrar",
                    "texto": "Cerrar",
                    "atributos": [{
                        "atributo": "data-bs-dismiss",
                        "valor": "modal",
                    }, ]
  
                }),
                "funcion": CambiarFiltros
            })
            break;
          case "id-Columnas":
              await Columnas({
                  "idFormulario": e.target.parentNode.getAttribute("data-for01"),
                  "idColumnas": e.target.parentNode.getAttribute("data-id")
              })
              await Modal({
                  "titulo": "Columnas",
                  "claseModal": "modal-fullscreen",
                  "tablero": "secundaria",
                  "botones": Boton({
                      "name": "cerrar",
                      "texto": "Cerrar",
                      "atributos": [{
                          "atributo": "data-bs-dismiss",
                          "valor": "modal",
                      }, ]
  
                  }),
                  "funcion": CambiarFiltros
              })
              break;
          case "id-Filtros":
                await FiltrosFormulario({
                    "idFormulario": e.target.parentNode.getAttribute("data-for01"),
                    "idFiltrosFormulario": e.target.parentNode.getAttribute("data-id")
                })
                await Modal({
                    "titulo": "Filtros Formulario",
                    "claseModal": "modal-fullscreen",
                    "tablero": "secundaria",
                    "botones": Boton({
                        "name": "cerrar",
                        "texto": "Cerrar",
                        "atributos": [{
                            "atributo": "data-bs-dismiss",
                            "valor": "modal",
                        }, ]
    
                    }),
                    "funcion": CambiarFiltros
                })
                break;
          case "id-Importaciones":
              await ImportacionExcel({
                  "idFormulario": e.target.parentNode.getAttribute("data-for01"),
                  "idImportaciones": e.target.parentNode.getAttribute("data-id")
              })
              await Modal({
                  "titulo": "Importacion Excel",
                  "claseModal": "modal-fullscreen",
                  "tablero": "secundaria",
                  "botones": Boton({
                      "name": "cerrar",
                      "texto": "Cerrar",
                      "atributos": [{
                          "atributo": "data-bs-dismiss",
                          "valor": "modal",
                      }, ]
  
                  }),
                  "funcion": CambiarFiltros
              })
              break;
    }
}