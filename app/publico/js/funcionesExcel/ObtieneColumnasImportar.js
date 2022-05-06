export async function ObtieneColumnasImportar(AJson){
    const {
        idTabla,
        columnasTabla
      } = AJson;
      const id = (idTabla) ? idTabla : "id-tabladimportacionexcel";
      const $tabla = document.getElementById(id);
      const idCampo = 0;
      const totalColumnas = (columnasTabla) ? columnasTabla : $tabla.rows[0].cells.length - 1;
      let lineas = "";
      let coma = "";
      for (let i = 1; i < $tabla.rows.length; i++) {
        const numero = "0"+i;
        const campo=`id-dim${numero.slice(-2)}`;
        //const campo=`id-dim${numero}`;
        lineas += `${coma}${$tabla.rows[i].cells[idCampo].innerText};${document.getElementById(campo).value}`;
        coma = ",";
      }
      sessionStorage.setItem("columnasExcel",lineas);  
}