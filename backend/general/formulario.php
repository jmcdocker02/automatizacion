<?php
 require_once("../clases/formularioClass.php");

 $datos = [];
 $Formulario = new TFormulario;
 $Formulario->AsignaIdFormulario($Formulario->ObtieneRequest("id","0"));
 $Formulario->AsignaIdTabla($Formulario->ObtieneRequest("idTabla", ""));
 $Formulario->AsignaIdCatalogo($Formulario->ObtieneRequest("idCatalogo", ""));
 $Formulario->AsignaIdEmpresa($Formulario->ObtieneRequest("idEmpresa",0));
 $Formulario->AsignaFechaInicio($Formulario->ObtieneRequest("fechaInicio",""));
 $Formulario->AsignaFechaFin($Formulario->ObtieneRequest("fechaFin",""));
 $Formulario->AsignaToken($Formulario->ObtieneRequest("token",""));
 $error = $Formulario->ValidarUsuario();
 if(strlen($error)==0){
  switch ($_SERVER["REQUEST_METHOD"]) {
 		case "DELETE":
 		 $datos = $Formulario->EliminaRegistroFormulario();
 		 break;
  	case "GET":
 	  if($Formulario->ObtieneIdCatalogo()==""){
		if($Formulario->ObtieneIdTabla()==""){
   	 		$datos = $Formulario->ObtieneDatosFormulario();
		}else{
      		$datos = $Formulario->ObtieneDatosRegistroFormulario();
		}
   	} else {
 		 	$datos = $Formulario->ObtieneDatosCatalogo();
 			}
 	 	break;
  	case "OPTIONS":
 	 	$datos = $Formulario->ObtieneFiltrosFormulario($Formulario->ObtieneIdFormulario());
 	 	break;
 		case "POST":
		 $Formulario->AsignaValores(json_decode(file_get_contents("php://input"),true));
 		 $datos = $Formulario->GuardarDatosFormulario();
 		 break;
 		case "PUT":
 	 	$Formulario->AsignaValores(json_decode(file_get_contents("php://input"), true));
 		 $datos = $Formulario->ActualizarDatosFormulario();
 		 break;	
  }
	}else{
	 $Formulario->AsignaErrorToken($error);
     $datos["error"] = array("error"=>"Error de autenticación {$error}");
	}
 $Formulario->EnviaRespuesta($datos);
