<?php
 require_once("../clases/ObtieneValorFuncionClass.php");
 require_once("../PHPMailer/enviaCorreo.php");
 
 $datos=[];
 $Funcion = new TObtieneValorFuncion;
 //$correo = $Funcion->ObtieneRequest("correo","");
 //$usuario =  $Funcion->Decodificar($Funcion->ObtieneRequest("usuario", ""));
 //$contrasena = $Funcion->ContresenaSegura();
 $parametros = json_decode(file_get_contents("php://input"),true); //
 $usuario =  $Funcion->Decodificar($parametros["usuario"]); //
 $correo = $Funcion->Decodificar($parametros["password"]); //
 $Funcion->funcion = "solicitaContrasena";
 $Funcion->parametros = array($usuario,$correo,$contrasena);
 $resultado = $Funcion->ObtieneValorFuncion();
 if (isset($resultado->error)) {
  $datos[] = $resultado;
 } else {
  $idUsuario = $resultado[0][0]; 
  if($idUsuario > 0){
    $datos["resultado"]= EnviaCorreo(
      $usuario,
      $correo,
      "Entrega de Password",
      ObtieneMensaje($usuario,$contrasena),
      "");
     }else{
   $datos['error'] = (object)array("error"=>"Usuario o Contraseña, incorrecto"); 
  }
 }
 $Funcion->EnviaRespuesta($datos);




 function ObtieneMensaje($AUsuario, $AContrasena){
  return '
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formato</title>
</head>
<body>
    <div id=":1be" class="a3s aiL ">
        &nbsp;Referencia: Carta Responsiva y Políticas de uso adecuado claves confidenciales de <br>
        <br>
        Aplicable : '.$AUsuario.'<br>
        Su contrasena de acceso es '.$AContrasena.'<br>
        <br>
        Condiciones y políticas manejo de claves confidenciales de la Empresa<br>
        <br>
        Con la finalidad de llevar el control adecuado de las claves confidenciales de la Empresa Sacar del Centro México, S.A. de C.V. (la “Empresa”), a continuación se enlistan las características, condiciones y lineamientos para su manejo adecuado. Es responsabilidad de los empleados en la Empresa el buen uso y correcta aplicación de las mismas.<br>
        <br>
        Se entiende como claves confidenciales todas aquellasclaves de acceso electrónico y/o acceso a cuentas o entidades gubernamentales que deberán mantenerse como confidenciales y solo deberán ser usadas por el personal previamente autorizado. Las claves será manejadas y controladas por el (“Empleado Responsable”) del manejo de las claves que le sean proporcionadas para sus servicios y actividades en la Empresa. El cual firma de conformidad la presentecarta responsiva y política de uso adecuado y manejo de claves confidenciales de la Empresa.<br>
    </div>
</body>
</html>
  ';

 }
