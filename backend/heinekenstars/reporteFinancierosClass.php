<?php

 require_once("../clases/obtieneDatosTablaClass.php");
 require_once("../clases/excelClass.php");


 class TReporteFinancieros extends TObtieneDatosTabla
 {
 
	function __construct()
 	{
	 	parent::__construct();
   }

   /**
   * Declaraciones Privadas
   */

   private function ObtieneQuery(string $AQuery)
   {
      $posicion = strpos($AQuery,"[");
      $aguja = substr($AQuery,$posicion,3);
      $baseDatos = preg_replace("/[^0-9]/","",$aguja);
      $remplazo = $this->ObtieneBaseDatos($baseDatos);
      return str_replace($aguja, $remplazo, $AQuery); 
   }
 
   private function ObtieneStars(string $AQuery)
   {
      $this->query = $AQuery;
      $result = $this->ObtieneRegistro();
      if (isset($result->error)) {
          return $result;
      } else {
       return $this->ObtieneDatosRegistro($result);
      }
   }

   private function ObtieneRenglonesReporte(int $ATipo = 0)
   {
    $datos=[];
    $totalStars = 0;
    $this->LimpiaVariables();
    $this->AsignaTabla($this->ObtieneBaseDatos(1).".reportefinancieros");
    $registros = $this->ObtieneDatosTablaAsociativo();
    foreach ($registros as $registro) {
     $stars = $this->ObtieneStars($this->ObtieneQuery($registro["rep06"]));
     $totalStars += $stars[0];
     $estrellas = ($ATipo==0)?number_format($stars[0],0):$stars[0];
     $linea=[];
     $linea["rep02"] = $registro["rep02"]; 
     $linea["rep03"] = $registro["rep03"];
     $linea["rep04"] = $registro["rep04"];
     $linea["rep07"] = $estrellas;
     $datos[]=$linea; 
    }
    $estrellas = ($ATipo==0)?number_format($totalStars,0):$totalStars;
    $datos[] = array(
       "rep02" => "Total Stars", 
       "rep03" =>"", 
       "rep04" => "",
       "rep07" => $totalStars
    );
    $datos[] = $this->ObtieneTotalRedimidas($ATipo);
    return $datos;
   }

   private function Obtienetitulos(){
      $datos=[];
      $datos[]=array("col01" => "49", "col02" => "1", "col03" => "rep02", "col04" => "Modulo", "col05"=>"0", "col06" => "15", "col07"=> "");
      $datos[]=array("col01" => "49", "col02" => "2", "col03" => "rep03", "col04" => "Periodo", "col05"=>"0", "col06" => "15", "col07"=> "");
      $datos[]=array("col01" => "49", "col02" => "3", "col03" => "rep04", "col04" => "Fecha de Asignación Stars", "col05"=>"1", "col06" => "20", "col07"=> "");
      $datos[]=array("col01" => "49", "col02" => "4", "col03" => "rep07", "col04" => "Stars", "col05"=>"2", "col06" => "10", "col07"=> "");
      return $datos;
   }

   private function ObtieneTotalRedimidas(int $ATipo)
   {
      $baseDatos = $this->ObtieneBaseDatos(4);
      $this->query = "select sum(valor) as cajas from {$baseDatos}.canjes where id_estatus !=6";
      $result = $this->ObtieneRegistro();
      if (isset($result->error)) {
          return $result;
      } else {
         $estrellas = ($ATipo==0)?number_format($result[0],0):$result[0];
         return array(
         "rep02" => "Stars Redimidas al ".$this->ObtieneFechaActual(), 
         "rep03" =>"", 
         "rep04" => "",
         "rep07" => $estrellas
      );
      }
   }
   /**
   * Declaraciones Publicas
   */
    public function GeneraArchivoExcel(){
      $datos = [];
      $documento = new TExcel();
      $columnas = array("A1;Modulo","B1;Periodo","C1;Fecha de Asignacion Stars","D1;Stars");
      $documento->AsignarValorArreglo($documento->ObtieneArreglo($columnas));
      $documento->DibujarTabla($this->ObtieneRenglonesReporte(1), "A2");
      $arreglo = explode("|", "A|B|C|D");
      $documento->AjustaColumnas($arreglo);
      $documento->AlinearTexto($documento->ObtieneArreglo(explode("|", "A1:D1;C")));
      $documento->ColocarNegritas(explode("|", "A1:D1"));
      $documento->ColorCeldas($documento->ObtieneArreglo(explode("|", "A1:D1;008000")));
      $documento->FormatoCeldas(array("D"));
      $documento->nombreArchivo = "ReporteFinancieros.xlsx";
      $documento->GuardarArchivo();
      $datos['resultado']= $documento->ObtieneResultado(); 
      return $datos;
    }

   public function ObtieneDatosRegistroReporte()
   {
       $datos = [];
       $datos["formulario"] = $this->ObtieneFormulario($this->idFormulario);
       $datos["registros"] = $this->ObtieneRenglonesReporte();
       $datos["titulos"] = $this->ObtieneTitulos();
       return $datos;
   }

}