<?php
require_once("./actualizacionRutasClass.php");

$ActualizacionRutas = new ActualizacionRutas();
$datos = [];
$ActualizacionRutas->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$ActualizacionRutas->ObtieneColumnasExcel($ActualizacionRutas->ObtieneRequest("columnasExcel",""));
$ActualizacionRutas->idFormulario=$ActualizacionRutas->ObtieneRequest("idFormulario","0");
$ActualizacionRutas->AsignaToken($ActualizacionRutas->ObtieneRequest("token",""));
$error = $ActualizacionRutas->ValidarUsuario();
if(strlen($error)==0){
 $datos=$ActualizacionRutas->Actualizarutas();
}else{
 $datos = array("error"=>"Acceso denegado");
}
$ActualizacionRutas->EnviaRespuesta($datos);