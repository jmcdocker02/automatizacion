<?php
 require_once("../clases/obtieneDatosTablaClass.php");

 $datos = array("for06"=>"cat_retos","for11"=>"id_reto","for12"=>"nombre");
 
 $DatosTabla = new TObtieneDatosTabla;
 $fechaProceso = $DatosTabla->ObtieneRequest("fechaProceso","");
// $error = $Formulario->ValidarUsuario();
 if($fechaProceso == ""){
  $datos["error"]=array("error" => "Tiene que enviar una fecha");
 }else{
  switch ($_SERVER["REQUEST_METHOD"]) {
   case "DELETE":
    break;
   case "GET": 
    $DatosTabla->AsignaTabla($DatosTabla->ObtieneBaseDatos(4).".cat_retos");
    $DatosTabla->AsignaCampos("id_reto,nombre");
    $DatosTabla->AsignaWhere("where ? between fecha_inicio and fecha_fin");
    $DatosTabla->AsignaParametros(array($fechaProceso));
    $registros = $DatosTabla->ObtieneDatosTablaAsociativo();
    if (isset($registros->error)) {
     $datos["error"]=$registros;
    }else{
     $datos["registros"] = $registros;
    }  
    break;
   case "POST":
    break;
   case "PUT":
    break;	
  } 
 }
 $DatosTabla->EnviaRespuesta($datos);
