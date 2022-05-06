<?php
  require_once("./StarsSemestralClass.php");

  $StarsSemestral = new StarsSemestral;
  $datos = [];
  $opcion = $StarsSemestral->ObtieneRequest("opcion","");
  $StarsSemestral->ObtieneColumnasExcel($StarsSemestral->ObtieneRequest("columnasExcel","A;1"));
  $StarsSemestral->idFormulario = $StarsSemestral->ObtieneRequest("idFormulario","0");
  $StarsSemestral->ColocaValorAnioProceso($StarsSemestral->ObtieneRequest("anio","0"));
  $StarsSemestral->ColocaValorSemestreProceso($StarsSemestral->ObtieneRequest("semestre","0"));
  $StarsSemestral->AsignaToken($StarsSemestral->ObtieneRequest("token",""));
  $error = $StarsSemestral->ValidarUsuario();
  if(strlen($error)==0){
    switch ($_SERVER["REQUEST_METHOD"]) {
      case "DELETE":
        break;
      case "GET":
        switch ($opcion) {
          case '2':
            $datos=$StarsSemestral->Actualizar();
            break;
          case '4':
            $datos=$StarsSemestral->EnviaCorreo();
            break;
          default:
            $datos[]=array("error"=>"Opcion {$opcion} no valida");
            break;
        }
        break;
      case "OPTIONS":
        $datos = $StarsSemestral->Exportar();
        break;
      case "POST": 
        $StarsSemestral->ColocaValorValores(json_decode(file_get_contents("php://input"),true));
        $datos=$StarsSemestral->Importar();
        break;
      case "PUT":
        break;	
    }
  }else{
    $datos = array("error"=>"Acceso denegado");
  }
  $StarsSemestral->EnviaRespuesta($datos);