export async function EliminaLineaTabla(e){
  const $renglon = e.parentNode.parentNode;
  $renglon.parentNode.removeChild($renglon);
}