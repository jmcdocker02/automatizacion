export default function ColocaTituloEmpresa(ATitulo) {
  const $titulo = document.getElementById("empresa");
  const $h2 = document.createElement("H2");
  $h2.innerHTML = ATitulo;
  $titulo.appendChild($h2);
}