<?php
require_once("./comerciantesClass.php");

$Comerciantes = new Comerciantes;
$datos = [];
$Comerciantes->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$Comerciantes->ObtieneColumnasExcel($Comerciantes->ObtieneRequest("columnasExcel",""));
$Comerciantes->idFormulario=$Comerciantes->ObtieneRequest("idFormulario","0");
$datos=$Comerciantes->ActualizaComerciantes();
$Comerciantes->EnviaRespuesta($datos);