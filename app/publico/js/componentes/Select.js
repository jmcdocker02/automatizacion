export function Select(AJson){
  const {
    id,
    opciones,
    anchoLista,
    valorDefault,
    funcion
  } = AJson;
  const $lista = document.createElement("select");
  $lista.id = `id-${id}`;
  $lista.name = id;
  if (anchoLista) $lista.style.width = anchoLista;
  opciones.forEach( opcion => {
    const $option = document.createElement("option");
    $option.innerText = opcion.texto;
    $option.value = opcion.valor;
    $lista.appendChild($option)
  });
  $lista.removeEventListener("change", funcion);
  $lista.addEventListener("change", funcion);

  if (valorDefault != undefined) {
    $lista.value = valorDefault;
  }
  return $lista;
}