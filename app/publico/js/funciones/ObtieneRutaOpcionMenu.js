export function ObtieneRutaOpcionMenu(AJson) {
    const {
      modulo,
      menu
    } = AJson;
    const ruta = "./..";
    const funcion = menu.charAt(0).toUpperCase() + menu.slice(1);
    return `${ruta}/${modulo.toLowerCase()}/${menu.toLowerCase()}/${funcion}.js`//Se hizo un cambio en la parte del .toLowerCase()
}