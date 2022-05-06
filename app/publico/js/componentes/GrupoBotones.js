import { Boton } from "./Boton.js";

export function GrupoBotones(ABotones) {
    const $grupoBotones = document.createElement("div");
    ABotones.botones.forEach(boton => {
        $grupoBotones.appendChild(Boton(boton));
    });
    return $grupoBotones;
}