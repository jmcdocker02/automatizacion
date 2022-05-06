<?php
 require_once("./usuariosClass.php");

 $datos = [];
 $Usuarios = new TUsuarios;
 $Usuarios->AsignaIdFormulario($Usuarios->ObtieneRequest("id","0"));
 $Usuarios->AsignaIdTabla($Usuarios->ObtieneRequest("idTabla", ""));
 $Usuarios->AsignaIdCatalogo($Usuarios->ObtieneRequest("idCatalogo", ""));
 $Usuarios->AsignaIdMenu($Usuarios->ObtieneRequest("for02",0));
 $Usuarios->AsignaEmp01($Usuarios->ObtieneRequest("idEmpresa",0));
 $Usuarios->AsignaToken($Usuarios->ObtieneRequest("token",""));
 $Usuarios->AsignaIdEmpresa($Usuarios->ObtieneRequest("idEmpresa",0));
 $Usuarios->AsignaFechaInicio($Usuarios->ObtieneRequest("fechaInicio",""));
 $Usuarios->AsignaFechaFin($Usuarios->ObtieneRequest("fechaFin",""));
 // $error = $Usuarios->ValidarUsuario();
 if(strlen($error)==0){
  switch ($_SERVER["REQUEST_METHOD"]) {
 		case "DELETE":
 		 $datos = $Usuarios->EliminaRegistroFormulario();
 		 break;
  	case "GET":
	 if($Usuarios->ObtieneIdCatalogo()==""){
	  if($Usuarios->ObtieneIdTabla()==""){
   	   $datos = $Usuarios->ObtieneDatosUsuarios();
	  }else{
       $datos = $Usuarios->ObtieneDatosRegistroUsuarios();
      }
	 }else{
      $datos = $Usuarios->ObtienePermisos();
	 }
 	 break;
  	case "OPTIONS":
	 $datos = $Usuarios->ObtieneFiltrosFormulario($Usuarios->ObtieneIdFormulario());
	 break;
    case "POST":
        $Usuarios->AsignaValores(json_decode(file_get_contents("php://input"),true));
        $datos = $Usuarios->GuardarDatosUsuarios();
        break;
    case "PUT":
		$Usuarios->AsignaValores(json_decode(file_get_contents("php://input"), true));
        $datos = ($Usuarios->ObtieneIdCatalogo()=="")
		 ?$Usuarios->ActualizarDatosUsuarios()
		 :$Usuarios->ActualizaPermisos();
        break;	
  }
	}else{
     $datos["error"] = array("error"=>"Datos Incorrectos");
	}
 $Usuarios->EnviaRespuesta($datos);
