export function CajaTexto(AJson) {
    const {
      autocomplete,
      clases,
      disabled,
      funcionKeyUp,
      funcionChange,
      maxlength,
      minlength,
      name,
      placeholder,
      readonly,
      required,
      size,
      tamanio,
      type,
      value
    } = AJson;
    const $cajaTexto = document.createElement("input");
    $cajaTexto.type = (type) ? type : "text";
    $cajaTexto.id = `id-${name}`;
    $cajaTexto.name = name;
    $cajaTexto.autocomplete = (autocomplete) ? autocomplete : false;
    if (minlength != undefined) $cajaTexto.minLength = minlength;
    if (maxlength != undefined) $cajaTexto.maxLength = maxlength;
    if (placeholder) $cajaTexto.placeholder = placeholder;
    if (readonly) $cajaTexto.readOnly = readonly;
    if (required) $cajaTexto.required = required;
    if (value) $cajaTexto.value = value;
    if (size) $cajaTexto.size = size;
    if (disabled) $cajaTexto.disabled = disabled;
    if (tamanio) $cajaTexto.style.width = tamanio;
   // if (clases) console.log(clases); $cajaTexto.className = `${clases}`;
    if (funcionKeyUp) {
      $cajaTexto.removeEventListener("keyup", funcionKeyUp);
      $cajaTexto.addEventListener("keyup", funcionKeyUp);
    }
    if (funcionChange){
      $cajaTexto.removeEventListener("change", funcionChange);
      $cajaTexto.addEventListener("change", funcionChange);
    }

    return $cajaTexto;
}