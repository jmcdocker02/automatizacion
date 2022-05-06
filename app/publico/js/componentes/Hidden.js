export function Hidden(AJson) {
    const {
        name,
        valor
    } = AJson;
    const $hidden = document.createElement("input");
    $hidden.type = "hidden";
    $hidden.name = name;
    $hidden.value = valor;
    $hidden.id = `id-${name}`;
    return $hidden;
}