export async function ObtieneDatosArchivo(AJson){
    const {
        elemento,
        funcion
    } = AJson;
    if(elemento.files.length > 0 ){
        let file  = elemento.files[0];
        let reader =  new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async(e) => {
          let data = e.target.result;
          let workbook = XLSX.read(data, {type: 'binary'})
          // console.log(workbook)
          let sheetNames = workbook.SheetNames; // colección de nombres de hojas de trabajo
          let worksheet = workbook.Sheets[sheetNames[0]]; // aquí solo leemos la primera hoja 
          let json = XLSX.utils.sheet_to_json(worksheet, {header: 1, range: 1, blankrows: false}); // Lea el libro de trabajo. Aquí puede escribir su propio método para generar la tabla. Se recomienda utilizar XLSX.utils. Clase de herramienta para generar datos. Datos de salida en formato json. Otros formatos se introducen después del código.
          if (typeof (callback) == "function") callback (json); // callback 
          //  document.getElementById('readLocalFile').value = null;
          funcion(json);
        }
      } else {
        toast("No files found", {type:error})
      }
}