<?php
require_once("./actualizacionAgenciasClass.php");

$ActualizacionAgencias = new ActualizacionAgencias();
$datos = [];
$ActualizacionAgencias->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$ActualizacionAgencias->ObtieneColumnasExcel($ActualizacionAgencias->ObtieneRequest("columnasExcel",""));
$ActualizacionAgencias->idFormulario=$ActualizacionAgencias->ObtieneRequest("idFormulario","0");
$ActualizacionAgencias->AsignaToken($ActualizacionAgencias->ObtieneRequest("token",""));
$error = $ActualizacionAgencias->ValidarUsuario();
if(strlen($error)==0){
  $datos=$ActualizacionAgencias->ActualizaAgencias();
}else{
  $datos = array("error"=>"Acceso denegado");
}
$ActualizacionAgencias->EnviaRespuesta($datos);