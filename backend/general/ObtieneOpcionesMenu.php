<?php
 require_once("../clases/obtieneDatosTablaClass.php");

$datos = [];
$DatosTabla = new TObtieneDatosTabla;
//$idUsuario = $DatosTabla->ObtieneRequest("idUsuario", "0");
//$idEmpresa = $DatosTabla->ObtieneRequest("idEmpresa", "0");
//$DatosTabla->AsignaToken($DatosTabla->ObtieneRequest("token", ""));

$parametros = json_decode(file_get_contents("php://input"),true); //
//print_r($parametros);
$idUsuario =  $parametros["idUsuario"]; //
$idEmpresa =  $parametros["idEmpresa"]; //
$DatosTabla->AsignaToken($parametros["token"]);
//$token = $Funcion->Decodificar($parametros["token"]); //

$error = $DatosTabla->ValidarUsuario();
if ($idUsuario==0 || strlen($error) > 0) {
	$datos = array("error"=> "Tiene que indicar el id de empresa y usuario ");
} else {
 $DatosTabla->AsignaDistinct(true);
 $DatosTabla->AsignaTabla("permisos");
	$DatosTabla->AsignaCampos("
	 menus.men01,
	 menus.men02	
	");
	$DatosTabla->AsignaInner("
     inner join formularios on (permisos.per03 = formularios.for01) 
	 inner join menus on (formularios.for02 = menus.men01)
 	");
	$DatosTabla->AsignaWhere("where ( (length(formularios.for04)>0) and (permisos.per01 = ?) and (permisos.per02 = ?)) ");
	$DatosTabla->AsignaParametros(array($idEmpresa,$idUsuario));
	$menus = $DatosTabla->ObtieneDatosTabla();
	if (isset($menus->error)) {
	 $datos["error"] = $menus->error;
	}else{
 	 $DatosTabla->AsignaCampos("
	  formularios.for01,
	  formularios.for04,
	  formularios.for05,
	  iconos.ico02
	 ");
	 $DatosTabla->AsignaInner("
	  inner join formularios on ((formularios.for01 = permisos.per03) and (formularios.for02 = ?))
	  inner join iconos on (formularios.for05 = iconos.ico01)
	 ");
	 $datos["registros"] = [];
	 foreach ($menus as $menu) {
		$DatosTabla->AsignaParametros(array($menu["men01"], $idEmpresa,$idUsuario));	
		array_push($datos["registros"],array(
			"id"=>$menu["men01"],
		 "nombre"=>$menu["men02"],
			"opciones"=>$DatosTabla->ObtieneDatosTabla()
		));
	}
   }
}
$DatosTabla->EnviaRespuesta($datos);
