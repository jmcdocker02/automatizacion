<?php
require '../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

class TExcel {
 
 private $spreadsheet;
 public  $nombreArchivo = "";

 function __construct() {
  $this->spreadsheet = new Spreadsheet(); 
 }

public function AjustaColumnas(array $columnas){
 foreach ($columnas as $columnID) {
 // print_r($columnID);
  $this->spreadsheet->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
 //     $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
 }
}

 public function Asignarvalor(string $celda, string $valor){
  $this->spreadsheet->getActiveSheet()->setCellValue($celda, utf8_encode($valor));
 }

 public function AsignarValorArreglo(array $valores){
   foreach( $valores as $celda => $valor ){
    $this->spreadsheet->getActiveSheet()->setCellValue($celda, utf8_encode($valor));
   }
 }

 public function DibujarTabla( array $dataSet , string $celdaInicio = "A1"){
  $this->spreadsheet->getActiveSheet()
    ->fromArray(
        $dataSet,
        NULL,
        $celdaInicio
    );
 }

 public function ColorCeldas(array $arregloColores){
  if(gettype($arregloColores) == "array"){
   foreach( $arregloColores as $celda => $valor ){
    $this->spreadsheet
    ->getActiveSheet()
    ->getStyle($celda)
    ->getFill()
    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
    ->getStartColor()
    ->setARGB($valor);
   }
  }else{
   die("La funcion ColorCeldas recibe como parametros el documento y un arreglo, las llaves son las celdas
    y el valor es el color.  Ejemplo: ['A1:B2' => 'ffffff']");
  }
 }

 public function CombinaCeldas(array $arregloCeldas){
  if(gettype($arregloCeldas) == 'array') {
   foreach ($arregloCeldas as $celdas) {
    $this->spreadsheet->getActiveSheet()->mergeCells($celdas);
    }
   }else{
     die("La funcion CobinaCeldas recibe como parametros el documento y un arreglo con los conjuntos
     de celdas que se quieren unir Ejemplo: ['A1', 'D4:F5']");
   }
 }

 public function AsignarEstilosArray( string $celdas , array $estilos ){
  $this->spreadsheet->getActiveSheet()->getStyle($celdas)->applyFromArray($estilos);
 }

 public function ColocarNegritas( array $celdas ){
   foreach( $celdas as $celda ){
    $this->spreadsheet->getActiveSheet()->getStyle($celda)->getFont()->setBold(true);
   }
 }

 public function AlinearTexto( array $celdas ){
  foreach( $celdas as $celda => $valor ){
    switch (strtoupper($valor)) {
      case 'C':
        $propiedad = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;
        break;

      case 'D':
        $propiedad = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT;
        break;
      
      default:
        $propiedad = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT;
        break;
    }

    $this->spreadsheet->getActiveSheet()->getStyle( $celda )
    ->getAlignment()->setHorizontal($propiedad);
  }
 }

 public function CambiarFuente( array $celdas ){
  foreach( $celdas as $celda => $valor ){
    $this->spreadsheet->getActiveSheet()->getStyle( $celda )
      ->getFont()->setName( $valor );
  }
 }

 public function CambiarTamanioLetra( array $celdas ){
  foreach( $celdas as $celda => $valor ){
    $this->spreadsheet->getActiveSheet()->getStyle( $celda )
      ->getFont()->setSize( $valor );
  }
 }

 public function ColocarBordes( array $celdas ){
    $styleArray = array(
      'borders' => array(
        'outline' => array(
          'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
          'color' => array('argb' => '000000'),
        ),
      ),
    );
    foreach ($celdas as $celda) {
      $this->spreadsheet->getActiveSheet()->getStyle($celda)->applyFromArray($styleArray);
    }
 }

 public function FormatoCeldas( array $celdas){
  foreach( $celdas as $celda => $valor ){
    $propiedad = \PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1;
    $this->spreadsheet
    ->getActiveSheet()
    ->getStyle($celda)
    ->getNumberFormat()
    ->setFormatCode("#,##0");
  }
 }

 public function DescargarArchivo(){
  $writer = new Xlsx($this->spreadsheet);
  header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  header('Content-Disposition: attachment; filename="'. urlencode($this->nombreArchivo).'"');
  $writer->save('php://output');
 }

 public function GuardarArchivo(){
  $archivo = new Xlsx($this->spreadsheet);
  $archivo->save("../temp/{$this->nombreArchivo}");
 }

 public function ObtieneArreglo(array $ADatos)
 {
    $resultado=[];
    foreach ($ADatos as $key => $value) {
      $ar=explode(';',$value);
      $resultado[$ar[0]]=$ar[1];
    }
    return $resultado;
  }

  public function ObtieneResultado()
  {
    return array(
      //"url"=>"http://localhost/BackEnd/temp/{$this->nombreArchivo}",
      "url"=>"https://jmc.decode.mx/BackEnd/temp/{$this->nombreArchivo}",
      "nombreArchivo"=>$this->nombreArchivo
   ); 
  }

} 