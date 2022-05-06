export function Contenedor(AJson){
  const {
    marco,
    id,
    fragmento
  } = AJson;
  const $contenedor = document.createElement("div");
  if (id != undefined) {
    $contenedor.id = `id-${id}`;
  } else {
    $contenedor.id = `id-contenedor-filtros`
  }

  $contenedor.className = `alineado ${(marco) ? marco : ""}`;
  if (fragmento) $contenedor.appendChild(fragmento);

  return $contenedor;
}