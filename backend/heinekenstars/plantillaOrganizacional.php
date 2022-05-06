<?php
  require_once("./plantillaOrganizacionalClass.php");

  $PlantillaOrganizacional = new PlantillaOrganizacional;
  $datos = [];
  $PlantillaOrganizacional->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
  $PlantillaOrganizacional->ObtieneColumnasExcel($PlantillaOrganizacional->ObtieneRequest("columnasExcel",""));
  $PlantillaOrganizacional->idFormulario = $PlantillaOrganizacional->ObtieneRequest("idFormulario","0");
  $PlantillaOrganizacional->AsignaToken($PlantillaOrganizacional->ObtieneRequest("token",""));
  $error = $PlantillaOrganizacional->ValidarUsuario();
  $idusu = $PlantillaOrganizacional->ObtieneIdUsuario();
  if(strlen($error)==0){
    $datos=$PlantillaOrganizacional->ActualizaPlantillaOrganizacional();
  }else{
    $datos = array("error"=>"Acceso denegado");
  }
  $datos['usu']=$idusu;
  $PlantillaOrganizacional->EnviaRespuesta($datos);