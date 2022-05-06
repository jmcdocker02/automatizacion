<?php
require_once("./reporteFinancierosClass.php");

$datos = [];
$ReporteFinancieros = new TReporteFinancieros;
$ReporteFinancieros->AsignaToken($ReporteFinancieros->ObtieneRequest("token",""));
$error = $ReporteFinancieros->ValidarUsuario();
if(strlen($error)==0){
 switch ($_SERVER["REQUEST_METHOD"]) {
  case "DELETE":
   break;
  case "GET":
   $datos = $ReporteFinancieros->ObtieneDatosRegistroReporte();
   break;
  case "OPTIONS":
    $datos = $ReporteFinancieros->GeneraArchivoExcel();
    break;
  case "POST": 
   break;
  case "PUT":
   break;	
 }
}else{
 $datos = array("error"=>"Acceso denegado");
}
$ReporteFinancieros->EnviaRespuesta($datos);
  