export function CheckBox(AJson) {
    const {
        nombre,
        valor,
        checado
    } = AJson;
    const $checkBox = document.createElement('input');
    $checkBox.type = 'checkbox';
    $checkBox.className = 'form-check-input'
    $checkBox.id = `id-${nombre}`;
    $checkBox.name = nombre;
    $checkBox.value = valor;
    $checkBox.checked = checado;

    return $checkBox
}