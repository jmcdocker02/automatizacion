export function ObtieneUrl(AJson) {
  const {
    modulo,
    pagina,
    sitio,
    parametros
  } = AJson;
  const servidor = ""; //"https://jmc.decode.mx/";
  const portal = (sitio === undefined) ? "/BackEnd/" : sitio;
  if (pagina) {
    return `${servidor}${portal}${modulo}/${pagina}${(parametros)?parametros:""}`;
  } else {
    return `${servidor}${portal}${modulo}`;
  }
}

//http://localhost/app/BackEnd/general/??????.php