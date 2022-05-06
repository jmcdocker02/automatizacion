<?php
  require_once("../clases/guardaDatosTablaClass.php");
  require_once("../clases/formularioClass.php");
class ImportarExcel extends TGuardarDatos
{
 public $columnasExcel = []; 
 public $linea = [];
 public $idFormulario=0;


/** declaraciones privadas */

 private function ObtieneIndiceExcel(string $AColumna, int $AColumnas=50)
 {
  $prefijo ="";
  $i = 65;
  $k = 65;
  $indice = 0;
  for ($j=0; $j < $AColumnas; $j++) { 
   $letra = $prefijo.chr($i);
   if($letra == strtoupper($AColumna)){
    $indice = $j;
    break;  
   }else{
    if($i==90){
     $prefijo = chr($k);
     $i = 65;
     $k++;
    }else{
     $i++;
    }
   }
  } 
  return $indice;
 }

/** declaraciones publicas */

public function GuardaArchivoDatosSeparadosComas(string $AArchivo, array $AValores)
{
  $archivo = fopen($AArchivo, 'w');
 foreach ($AValores as $linea) {
  $registro = "";
  $coma = "";
  $registro .= $linea[4];
  $registro .= ",".$this->LimpiarCaracteresAcentuados(utf8_decode('"'.$linea[5].'"'));
    $registro .= ",".$linea[7];
  $registro .= ",".$this->LimpiarCaracteresAcentuados(utf8_decode('"'.$linea[8].'"'));
  if(!fwrite($archivo, $registro."\n")){
    return false;
  };
 }
 fclose($archivo);
 return true;	
}  

public function GuardarRespuesta(array $ARespuesta)
{
  $Formulario = new TFormulario;
  $Formulario->AsignaIdFormulario($this->idFormulario);
  $respuesta = $this->ObtieneTextoRespuesta($ARespuesta);
  //{$this->ObtieneIdUsuario()}
  $Formulario->AsignaValores(array(
    "pro01"=>"0",
    "pro02"=>"{$this->idFormulario}",
    "pro03"=>$this->ObtieneFechaActual(),
    "pro04"=>$this->ObtieneHoraActual(),
    "pro05"=>$this->ObtieneIdUsuario(),
    "pro06"=>$ARespuesta["guardar"][0],
    "pro07"=>$ARespuesta["guardar"][1],
    "pro08"=>$ARespuesta["guardar"][2],
    "pro09"=>$respuesta,
  ));
  return $Formulario->GuardarDatosFormulario(); 
}

public function LimpiarCaracteresAcentuados(string $APajar)
{
 // $pajar = utf8_encode($APajar);
  if(strlen($APajar)>0){
   $pajar = iconv(mb_detect_encoding($APajar, mb_detect_order(), true,), "UTF-8",$APajar);                      
   $aguja    = array('а', 'Ã©', 'ñ', 'Ñ', 'á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú', '??');
   $remplazo = array('a', 'e', 'n', 'N', 'a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', '');
   return str_replace($aguja, $remplazo, $pajar);
  }else{
   return $APajar; 
  }
}
    
 public function ObtieneColumnasExcel(string $ACampos)
 {
  $campos= explode(",",$ACampos);
  $this->columnasExcel=[];
  foreach ($campos as $campo) {
   $pareja = explode(";",$campo);
   $this->columnasExcel[$pareja[0]]= $this->ObtieneIndiceExcel($pareja[1]);
  }
 }

 public function ObtieneSoloNumeros(int $AColumna)
 {
   $valor = $this->linea[$this->columnasExcel[$AColumna]];
   return (is_numeric($valor) || is_null($valor)) ? $valor : preg_replace("/[^0-9]/","",$valor);
 }

 public function ObtieneParametros(int $ALlave, int $ATipo)
 {
    $parametros = [];
    $inicio=($ATipo==0)?1:$ALlave+1;
    for ($i=$inicio; $i <= count($this->columnasExcel); $i++) { 
      $parametros[] = $this->ObtieneValorCelda($i);
    }
    if ($ATipo == 1) {
      for ($i=1; $i <= $ALlave; $i++) { 
        $parametros[] = $this->ObtieneValorCelda($i);
      }
    }
    return $parametros;
 }

 public function ObtieneTextoRespuesta(array $ARespuesta)
 {
   $respuesa = "";
   foreach ($ARespuesta["errores"] as $valor) {
    if(is_array($valor)){
     $i=0;
     foreach ($valor as $elemento) {
      $respuesa .= "({$i}):{$elemento} ";
      $i++;
     }
     $respuesa .='\n';
    }else{
     $respuesa .= $valor."\n";
    }
   }
   return $respuesa;
 }

 public function ObtieneValorCelda(int $AColumna)
 {
  $valor = $this->linea[$this->columnasExcel[$AColumna]];
  return (is_numeric($valor) || is_null($valor)) ? $valor : $this->LimpiarCaracteresAcentuados($valor);
 }

 public function NumeroFecha($AFecha){
	$fecha = (is_numeric($AFecha))?$AFecha:1;	
	$UNIX_DATE = ($fecha - 25569) * 86400;
	return gmdate("Y-m-d", $UNIX_DATE);
 }

}  