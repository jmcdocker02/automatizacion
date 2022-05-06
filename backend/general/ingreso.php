<?php
 require_once("../clases/ObtieneValorFuncionClass.php");
 require_once("../clases/corsClass.php");
 
 $datos=[];
 $Funcion = new TObtieneValorFuncion;
 $parametros = json_decode(file_get_contents("php://input"),true); //
 $password = $Funcion->Decodificar($parametros["password"]); //
 $usuario =  $Funcion->Decodificar($parametros["usuario"]); //
 $Funcion->funcion = "LoginUsuario";
 $Funcion->parametros = array($usuario,$password);
 $resultado = $Funcion->ObtieneValorFuncion();
 if (isset($resultado->error)) {
  $datos[] = $resultado;
 } else {
  $idUsuario = $resultado[0][0]; 
  if($idUsuario > 0){
   $Funcion->AsignaQuery(
    "select 
     usuarios.usu01,
     usuarios.usu04  
 	   from usuarios 
	    where (usuarios.usu01 = ?)"
   );
   $Funcion->AsignaParametros(array($idUsuario));
   $fila = $Funcion->ObtieneRegistro();
   $datos['usuario'] = $fila;
   $Funcion->AsignaIdUsuario($idUsuario);
   $Funcion->AsignaClaveUsuario($usuario);
   $Funcion->AsignaPwd($password);
   $Funcion->GeneraToken();
   $datos['token'] = $Funcion->ObtieneToken(); 
  }else{
   $datos['error'] = (object)array("error"=>"Usuario o Contraseña, incorrecto.{$idUsuario}"); 
  }
 }
$cors = new CorsAccessControl();
$cors->send();
header('Content-Type: application/json');
echo json_encode($datos);