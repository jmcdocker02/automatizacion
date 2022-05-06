<?php
  require_once("./StarsMensualClass.php");

  $StarsMensual = new StarsMensual;
  $datos = [];
  $opcion = $StarsMensual->ObtieneRequest("opcion","");
  $StarsMensual->ObtieneColumnasExcel($StarsMensual->ObtieneRequest("columnasExcel","A;1"));
  $StarsMensual->idFormulario = $StarsMensual->ObtieneRequest("idFormulario","0");
  $StarsMensual->ColocaValorAnioProceso($StarsMensual->ObtieneRequest("anio","0"));
  $StarsMensual->ColocaValorMesProceso($StarsMensual->ObtieneRequest("mes","0"));
  $StarsMensual->AsignaToken($StarsMensual->ObtieneRequest("token",""));
  $error = $StarsMensual->ValidarUsuario();
  if(strlen($error)==0){
    switch ($_SERVER["REQUEST_METHOD"]) {
      case "DELETE":
        break;
      case "GET":
        switch ($opcion) {
          case '2':
            $datos=$StarsMensual->Actualizar();
            break;
          case '4':
            $datos=$StarsMensual->EnviaCorreo();
            break;
          default:
            $datos[]=array("error"=>"Opcion {$opcion} no valida");
            break;
        }
        break;
      case "OPTIONS":
        $datos = $StarsMensual->Exportar();
        break;
      case "POST": 
        $StarsMensual->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
        $datos=$StarsMensual->Importar();
        break;
      case "PUT":
        break;	
    }
  }else{
    $datos = array("error"=>"Acceso denegado");
  }
  $StarsMensual->EnviaRespuesta($datos);