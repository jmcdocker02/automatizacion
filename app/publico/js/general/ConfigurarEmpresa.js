import { Menu } from "./Menu.js";

export function ConfigurarEmpresa(AJson){
  const {
    idEmpresa,
    nombreEmpresa,
    numeroEmpresas
  } = AJson;
  sessionStorage.setItem("idEmpresa", idEmpresa);
  sessionStorage.setItem("nombreEmpresa", nombreEmpresa);
  Menu(numeroEmpresas);
}