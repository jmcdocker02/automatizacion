<?php
  require_once("../clases/ImportarExcelClass.php");

  class BajaEmpleados extends ImportarExcel
  {
    private $empleadosBaja = 0;
    private $empleadosError = 0;
    private $Errores=[];
    private $Valores=[];

    /* Declaraciones privadas */
    private function ActualizaEmpleado(int $ALinea)
    {
      $this->ObtieneSentenciaUpdate();
      $this->AsignaParametros($this->ColocaParametros());
      $resultado = $this->EjecutaSentencia(); 
      if (isset($resultado->error)) {
        $this->Errores[] = "{$resultado->error} Linea:{$ALinea}";
        $this->empleadosError++;
      }else{
        $this->empleadosBaja++;
      }  
    }

    private function ColocaParametros()
    {
      return array(
        0,
        0,
        $this->ObtieneFechaActual(),
        $this->linea[$this->columnasExcel[1]]
      );
    }

    private function ExisteEmpleado()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".empleados",
        "num_empleado",
        "where num_empleado = ?",
        array($this->linea[$this->columnasExcel[1]])
      );
      return $empleado == $this->linea[$this->columnasExcel[1]];
    }

    function ObtieneSentenciaUpdate()
    {
      $this->query = "update {$this->ObtieneBaseDatos(4)}.empleados set 
        empleados.activo = ?, 
        empleados.baja_po = ?, 
        empleados.fecha_baja = ? 
        where empleados.num_empleado = ?";
    }

    private function ProcesarEmpleados()
    {
      try {
        $this->InicializaGuardado();
        $i=0;
        foreach ($this->Valores as $linea) {
          $i++;
          $this->linea = $linea;
          $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          $renglon = $i+1; 
          if($this->ExisteEmpleado()){
            $this->ActualizaEmpleado($renglon);
          }else{
            $this->Errores[]=array("error"=>"Empleado {$this->linea[$this->columnasExcel[1]]} Inexistente en tabla empleados");
            $this->empleadosError++;
          }
        }
        $this->AceptaTransaccion();
        $this->Errores[] = "Empleados dados de baja: {$this->empleadosBaja} 
          Empleados con Errores: {$this->empleadosError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Empleados dados de baja:" => $this->empleadosBaja, 
            "Empleados con Errores:" => $this->empleadosError
           ),
          "guardar"=>array(
           "0" => $this->empleadosBaja, 
           "1" => $this->empleadosBaja, 
           "2" => $this->empleadosError
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
    public function ActualizaEmpleados()
    {
      $this->ValidaDatos();
      if(count($this->Errores)>0){
        return $this->Errores;
      }else{  
        return $this->ProcesarEmpleados();
      }
    }

    public function ColocaValorValores(array $AValores)
     {   
        $this->Valores = $AValores;
     }
  }