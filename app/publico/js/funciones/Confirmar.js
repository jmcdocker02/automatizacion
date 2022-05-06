export async function Confirmar(AJson) {
    const {
        titulo,
        mensaje,
        funcion,
        parametros
    } = AJson;
    const confirma = await alertify.confirm(
        titulo,
        mensaje,
        function() {
            funcion(parametros);
        },
        null
    ).set({
        labels: {
            ok: 'Aceptar',
            cancel: 'Cancelar'
        },
        padding: false
    });
    return confirma;
}