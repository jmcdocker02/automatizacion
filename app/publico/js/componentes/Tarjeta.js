export function Tarjeta(AJson) {
    const {
        id,
        clase,
        claseCuerpo,
        claseCabecera,
        titulo,
        contenido,
        funcionClick
    } = AJson;
    const $tarjeta = document.createElement('div');
    const $tarjetaCabecera = document.createElement('div');
    const $tarjetaCuerpo = document.createElement('div');

    $tarjeta.className = (clase != undefined) ? `card ${clase}` : `card`;
    $tarjeta.id = id;
    $tarjetaCabecera.id = `${id}-cabecera`;
    $tarjetaCabecera.className = 'card-header';
    if (claseCabecera) $tarjetaCabecera.classList.add(claseCabecera);
    $tarjetaCabecera.appendChild(titulo);
    $tarjetaCuerpo.className = `card-body ${claseCuerpo}`;
    $tarjetaCuerpo.id = `${id}-cuerpo`;
    contenido.forEach(elemento => {
        $tarjetaCuerpo.appendChild(elemento);
    });

    $tarjeta.appendChild($tarjetaCabecera);
    $tarjeta.appendChild($tarjetaCuerpo)
    $tarjeta.addEventListener("click", funcionClick); //linea nueva

    return $tarjeta;
}