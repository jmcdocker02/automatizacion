import { ObtieneRutaOpcionMenu } from "./ObtieneRutaOpcionMenu.js";

export async function CargarOpcion(){
    const rutaOpcionMenu = ObtieneRutaOpcionMenu({
        "modulo": sessionStorage.getItem("nombreOpcionModulo"),
        "menu": sessionStorage.getItem("nombreOpcionMenu")
    });
    const opcionMenu = await
    import (`${rutaOpcionMenu}`).then((module) => module);
    await opcionMenu.default();
}