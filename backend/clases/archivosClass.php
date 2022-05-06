<?php
 require_once("../clases/obtieneDatosTablaClass.php");

 class TArchivos extends TObtieneDatosTabla 
 {
  private $nombreArchivo = "";
  private $texto = "";

  /**
   * Declaraciones Privadas
   */

  /**
   * Declaraciones Publicas
   *  */ 

    public function ColocaValorNombreArchivo(string $ANombreArchivo)
    {
        $this->nombreArchivo = $ANombreArchivo;
    } 

    public function ColocaValorTexto(string $ATexto)
    {
      $this->texto = $ATexto;
    }

    public function GuardarArchivoTexto()
    {
        $archivo = fopen($this->nombreArchivo, "w");
        fwrite($archivo, $this->texto);
        fclose($archivo);
    }
 }

