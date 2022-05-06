<?php
require_once("./actualizacionRetosClass.php");

$ActualizacionRetos = new ActualizacionRetos();
$datos = [];
$ActualizacionRetos->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$ActualizacionRetos->ObtieneColumnasExcel($ActualizacionRetos->ObtieneRequest("columnasExcel",""));
$ActualizacionRetos->idFormulario=$ActualizacionRetos->ObtieneRequest("idFormulario","0");
$ActualizacionRetos->ColocaValorIdReto($ActualizacionRetos->ObtieneRequest("idReto","0"));
$ActualizacionRetos->ColocaValorFechaProceso($ActualizacionRetos->ObtieneRequest("fechaProceso","0"));
$ActualizacionRetos->ColocaValorTipo($ActualizacionRetos->ObtieneRequest("tipo","0"));
$ActualizacionRetos->ColocaValorTipoReto($ActualizacionRetos->ObtieneRequest("imp01","0"));
$ActualizacionRetos->AsignaToken($ActualizacionRetos->ObtieneRequest("token",""));
$error = $ActualizacionRetos->ValidarUsuario();
if(strlen($error)==0){
  $datos=$ActualizacionRetos->ActualizaRetos();
}else{
  $datos = array("error"=>"Acceso denegado");
}  
$ActualizacionRetos->EnviaRespuesta($datos);