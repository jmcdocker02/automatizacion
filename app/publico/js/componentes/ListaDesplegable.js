export async function ListaDesplegable(AJson) {
  const {
    id,
    clase,
    anchoLista,
    valorDefault,
    datos
  } = AJson;
  let $select = document.createElement("select");
  let bandera = 0;
  const tabla = datos["for06"];
  const campoLlave = datos["for11"];
  const campoDescripcion = datos["for12"];
  $select.id = (id === undefined) ? `id-${tabla}` : `id-${id}`;
  $select.name = (id === undefined) ? tabla : id;
  if (clase) $select.className = clase;
  if (anchoLista) $select.style.width = anchoLista;
  if (!datos[`${tabla}`].hasOwnProperty("error")){
    datos[`${tabla}`].forEach( opt => {
      if(bandera === 0 && valorDefault === undefined){
        bandera = opt[campoLlave];
      }
      const $option = document.createElement('option');
      $option.id = `opcion${opt[campoLlave]}${tabla.substring(0,1)}` //Modificado
      $option.value = opt[campoLlave];
      if( Object.keys(opt)[0].substring(0,3) === "ico"){
        $option.className = "fa"
        $option.innerHTML = `&#x${opt[campoDescripcion]}`;
      }else{
        $option.innerText = opt[campoDescripcion];
      }
      $select.appendChild($option);
    });
  }
  $select.value = (valorDefault === undefined) ? bandera : valorDefault;
  // localStorage.setItem($select.id, $select.value);
  return $select;
}