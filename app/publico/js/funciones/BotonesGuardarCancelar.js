import { GrupoBotones } from "../componentes/GrupoBotones.js";

export function BotonesGuardarCancelar(AAtributos){
  const atributos = (AAtributos) ? AAtributos : "";
  return GrupoBotones({
      botones: [{
              "texto": `<i class="fas fa-save "></i> Guardar`,
              "name": "guardar",
              "type": "submit",
              "atributos": atributos
          },
          {
              "texto": `<i class="fas fa-times "></i> Cancelar`,
              "name": "cancelar",
              "atributos": [{
                  "atributo": "data-bs-dismiss",
                  "valor": "modal",
              }, ],
          },
      ],
  });
}