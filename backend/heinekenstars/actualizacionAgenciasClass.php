<?php
  require_once("../clases/ImportarExcelClass.php");

  class ActualizacionAgencias extends ImportarExcel
  {
    private $agenciasActualizadas = 0;
    private $agenciasAgregadas = 0;
    private $agenciasError = 0;
    private $Errores=[];
    private $Valores=[];

    /* Declaraciones privadas */
    private function ActualizaAgencia(int $ALinea)
    {
      $this->ObtieneSentenciaUpdate();
      $this->AsignaParametros($this->ObtieneParametros(1,1));
      $resultado = $this->EjecutaSentencia(); 
      //-$this->Errores[] = array("errorResultado"=>$resultado,"Linea"=>$ALinea);
      if (isset($resultado->error)) {
        $this->Errores[] = "{$resultado->error} Linea:{$ALinea}";
        $this->Errores[] = $this->linea;
        $this->agenciasError++;
      }else{
        $this->agenciasActualizadas++;
      }  
    }

    private function AgregaAgencia(int $ALinea)
    {
      $this->ObtieneSentenciaInsert();
      $this->AsignaParametros($this->ObtieneParametros(1,0));
      $resultado = $this->EjecutaSentenciaInsert();
      if (isset($resultado->error)) {
        $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
        $this->Errores[] = $this->linea;
        $this->agenciasError++;
      }else{
       $this->agenciasAgregadas++;
      }
    }

    private function ExisteAgencia()
    {
      $agencia = $this->ObtieneValorCampo(
      $this->ObtieneBaseDatos(4).".direccion_agencia",
      "id_direccion_agencia",
      "where id_direccion_agencia = ?",
      array($this->linea[$this->columnasExcel[1]])
      );
      return $agencia == $this->linea[$this->columnasExcel[1]];
    }

    private function ObtieneSentenciaInsert()
    {
      $this->query = "insert into {$this->ObtieneBaseDatos(4)}.direccion_agencia values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    }

    function ObtieneSentenciaUpdate()
    {
      $this->query = "update {$this->ObtieneBaseDatos(4)}.direccion_agencia set 
        direccion_agencia.dr = ?, 
        direccion_agencia.gz = ?, 
        direccion_agencia.localidad = ?, 
        direccion_agencia.calle = ?, 
        direccion_agencia.numero = ?, 
        direccion_agencia.cp = ?, 
        direccion_agencia.colonia = ?, 
        direccion_agencia.ciudad = ?, 
        direccion_agencia.estado = ?, 
        direccion_agencia.entre_calle_1 = ?, 
        direccion_agencia.entre_calle_2 = ?, 
        direccion_agencia.nombre_rh = ?, 
        direccion_agencia.celular = ? 
        where direccion_agencia.id_direccion_agencia = ?";
    }

    private function ProcesarAgencias()
    {
      try {
        $this->InicializaGuardado(); 
        $i=0;
        foreach ($this->Valores as $linea) {
          $i++;
          $this->linea = $linea;
          $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          $this->linea[$this->columnasExcel[7]] = $this->ObtieneSoloNumeros(7);
          $this->linea[$this->columnasExcel[14]] = $this->ObtieneSoloNumeros(14);
          $renglon = $i+1; 
          if($this->ExisteAgencia()){
            $this->ActualizaAgencia($renglon);
          }else{
            $this->AgregaAgencia($renglon);
          }
        }
        $this->AceptaTransaccion();
        $this->Errores[] = "Agencias Agregadas: {$this->agenciasAgregadas} 
          Agencias Actualizadas: {$this->agenciasActualizadas} 
          Agencias con Errores: {$this->agenciasError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Agencias Agregadas:" => $this->agenciasAgregadas, 
            "Agencias Actualizadas:" => $this->agenciasActualizadas,
            "Agencias con Errores:" => $this->agenciasError
           ),
          "guardar"=>array(
           "0" => $this->agenciasAgregadas, 
           "1" => $this->agenciasActualizadas,
           "2" => $this->agenciasError
          )
        );
        $resulSet = $this->GuardarRespuesta($datos);
        if (isset($resulSet["error"])) {
          $datos["error"] = $resulSet;
        }
        return $datos;
      } catch (PDOException $e) {
        $this->RechazaTransaccion();
        return  (object)array("error" => $e->getMessage());
      } finally {
        $this->DestruyeConexion();
      }  
    }

    private function ValidaDatos()
    {
      if(count($this->Valores)==0){
        $this->Errores["error"]=array("error"=>"No se localizaron datos a procesar");
      }  
    }
     
    /* Declaraciones Publicas */
    public function ActualizaAgencias()
    {
      $this->ValidaDatos();
      if(count($this->Errores)>0){
        return $this->Errores;
      }else{  
        return $this->ProcesarAgencias();
      }
    }

    public function ColocaValorValores(array $AValores)
     {   
       $this->Valores = $AValores;
     }
  }