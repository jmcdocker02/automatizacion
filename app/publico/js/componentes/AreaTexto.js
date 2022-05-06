export function AreaTexto(AJson) {
    const {
        autocomplete,
        autofocus,
        cols,
        disabled,
        maxlength,
        minlength,
        name,
        placeholder,
        readonly,
        required,
        rows,
        spellcheck
    } = AJson;

    const $areaTexto = document.createElement("textarea");

    $areaTexto.id = `id-${name}`;
    if (autocomplete) $areaTexto.autocomplete;
    if (autofocus) $areaTexto.autofocus;
    $areaTexto.cols = cols;
    if (disabled) $areaTexto.disabled = disabled;
    if (maxlength) $areaTexto.maxLength = maxlength;
    if (minlength) $areaTexto.minlength = minlength;
    $areaTexto.name = name;
    if (placeholder) $areaTexto.placeholder = placeholder;
    if (readonly) $areaTexto.readOnly = readonly;
    if (required) $areaTexto.required = required;
    $areaTexto.rows = rows;
    $areaTexto.spellcheck = (spellcheck) ? spellcheck : false;

    return $areaTexto;
}