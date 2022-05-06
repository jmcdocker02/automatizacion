<?php
require_once("./bajaEmpleadosClass.php");

$BajaEmpleados = new BajaEmpleados();
$datos = [];
$BajaEmpleados->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$BajaEmpleados->ObtieneColumnasExcel($BajaEmpleados->ObtieneRequest("columnasExcel",""));
$BajaEmpleados->idFormulario=$BajaEmpleados->ObtieneRequest("idFormulario","0");
$BajaEmpleados->AsignaToken($BajaEmpleados->ObtieneRequest("token",""));
$error = $BajaEmpleados->ValidarUsuario();
if(strlen($error)==0){
  $datos=$BajaEmpleados->ActualizaEmpleados();
}else{
  $datos = array("error"=>"Acceso denegado");
}
$BajaEmpleados->EnviaRespuesta($datos);