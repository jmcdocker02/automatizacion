export function Codificar(ACadena) {
    let codificado = "";
    for (let i = 0; i < ACadena.length; i++) {
        let a = ACadena.charCodeAt(i);
        let b = a ^ 123; // bitwise XOR with any number, e.g. 123
        codificado = codificado + String.fromCharCode(b);
    }
    return codificado;
}