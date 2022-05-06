<?php
require_once("../clases/archivosClass.php");

$Archivos = new TArchivos();
$datos = [];
$idError = $Archivos->ObtieneRequest("idTabla",0);
if ($idError == 0){
    $datos["error"] = array("error"=>"error de id");
}else {
    $Archivos->AsignaQuery("select pro09 from procesos where pro01 = ?");
    $Archivos->AsignaParametros(array($idError));
    $result = $Archivos->ObtieneRegistro();
		if (isset($result->error)) {
			return $result;
		} else {
            $Archivos->ColocaValorTexto($result["pro09"]);
            $Archivos->ColocaValorNombreArchivo("../temp/archivo.txt");
            $Archivos->GuardarArchivoTexto();
            //$datos["resultado"]=array("url"=>"http://localhost/BackEnd/temp/archivo.txt","archivo"=>"archivo.txt");
            $datos["resultado"]=array("url"=>"https://jmc.decode.mx/BackEnd/temp/archivo.txt","archivo"=>"archivo.txt");
		}
}
$Archivos->EnviaRespuesta($datos);