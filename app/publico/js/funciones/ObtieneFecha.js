import { ObtieneMes } from './ObtieneMes.js';

export function ObtieneFecha(ATipo) {
    /* 
      0: Fecha Actual en cadena de texto,
      1: Fecha de inicio del mes actual en cadena de texto,
      2: Fecha de fin del mes actual en cadena de texto.
      3: Fecha Actual en formato Date
      4: Fecha de inicio del mes actual en formato Date
      5: Fecha de fin del mes actual en formato Date
    */
    const hoy = new Date();
    let fecha;
    switch (ATipo) {
        case 0:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate());
            break;
        case 1:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
            break;
        case 2:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 2, 0);
            break;
        case 3:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
            break;
        case 4:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            break;
        case 5:
            fecha = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            break;
        case 6:
            fecha = `${hoy.getDate()} de ${ObtieneMes(hoy.getMonth() + 1)} de ${hoy.getFullYear()}`;
    }

    if (ATipo < 3) {
        const mes = `0${fecha.getMonth()}`.slice(-2);
        const dia = `0${fecha.getDate()}`.slice(-2);
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    } else {
        return fecha;
    }
}