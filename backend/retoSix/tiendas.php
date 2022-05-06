<?php
require_once("./TiendasClass.php");

$Tiendas = new Tiendas;
$datos = [];
$Tiendas->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
$Tiendas->ObtieneColumnasExcel($Tiendas->ObtieneRequest("columnasExcel",""));
$Tiendas->idFormulario = $Tiendas->ObtieneRequest("idFormulario","0");
$datos=$Tiendas->ActualizaTiendas();
$Tiendas->EnviaRespuesta($datos);