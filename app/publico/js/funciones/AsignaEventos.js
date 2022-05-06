export function AsignaEventos(AJson) {
    const {
        eventos,
        funcion
    } = AJson;
    eventos.forEach(evento => {
      const $elemento = document.getElementById(evento.elemento);
      if($elemento != undefined){
        $elemento.removeEventListener(evento.evento, funcion);
        $elemento.addEventListener(evento.evento, funcion);
      }
    });
}