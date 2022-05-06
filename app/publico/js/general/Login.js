import { AsignaEventos } from "../funciones/AsignaEventos.js";
import { CambiarEventos } from "./CambiarEventos.js";


export async function Login() {
  sessionStorage.clear();
  let $menu = document.getElementById("menu");
  $menu.innerHTML = ObtieneHtmlLogin();
  AsignaEventos({
    "eventos": [
        { "elemento": "id-ingresar", "evento": "click" },
        { "elemento": "id-recuperaContrasenia", "evento": "click" }
    ],
    "funcion": CambiarEventos
  });
}

function ObtieneHtmlLogin() {
  return `
  <div class="logo">
    <img src="publico/img/Decode-02-01.jpg" class="logo-inicio" alt="">
  </div>
  <div class="container wrap border border-2" style="max-width: 550px; max-height: 400px; height:350px;">
    <div class="centrar">
        <img src="publico/img/login/usuarioLogin1.jpg" alt="" width="100px" height="100px">
    </div>
    <div class="tamanio centrar wrap">
      <div>
        <p class="fw-bold">Ingrese su Clave de Acceso y Contraseña</p>
      </div>
      <form class="formulario centrar wrap" action="" method='POST' id='formularioLogin'>
        <div class="form-group" id="usuario-group" >
          <label for="usuario">Clave de Usuario</label>
          <input type="text" class="form-control" id="usuario" name="usuario" required autocomplete="off">
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group" id="password-group">
          <label for="password">Contraseña</label>
          <input type="password" class="form-control" id="password" name="password" required>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-group" style="width:100%; padding-top:1rem;">
        <button type="submit" class="btn btn-outline-primary btn-block btn-todo" style="width:100%;" id="id-ingresar">Ingresar</button>
        </div>
        <div class="form-group" style="width:100%; padding-top:1rem;">
         <button type="submit" class="btn btn-outline-secondary btn-block btn-todo" style="width:100%;" id="id-recuperaContrasenia">Solicitar Contraseña</button>
        </div>
        <div id="alerta" class="form-group text-center alerta"></div>
      </form>
    </div>
  </div>
  `;
}

//{"usuario":{"usu01":"1","0":"1","usu04":"Administrador del Sistema","1":"Administrador del Sistema"},"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzM5NzU4NDgsImV4cCI6MTYzMzk3NzY0OCwidXNlckRhdGEiOnsiaWQiOjEsInB3ZCI6ImFkbWluIn19.HlhfEylMknzBAw1MtEEM1JG47gBS9cWrYkq7pWYON4o"}