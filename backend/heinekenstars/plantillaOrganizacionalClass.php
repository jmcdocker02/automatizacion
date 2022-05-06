<?php
  require_once("../clases/ImportarExcelClass.php");

  class PlantillaOrganizacional extends ImportarExcel
  {
    private $empleadosActualizados = 0;
    private $empleadosError = 0;
    private $empleadosAgregados = 0;
    private $empleadosDuplicados = 0;
    private $Errores = [];
    private $Valores = [];

    /* Declaraciones privadas */
    private function ActualizaEmpleado(int $ALinea)
    {
      $this->ObtieneSentenciaUpdate();
      $this->AsignaParametros($this->ColocaParametrosActualiza());
      $resultado = $this->EjecutaSentencia(); 
      if (isset($resultado->error)) {
        $this->Errores[] = "{$resultado->error} Linea:{$ALinea}";
        $this->Errores[] = $this->linea;
        $this->empleadosError++;
      }else{
        $this->empleadosActualizados++;
      }  
    }

    private function AgregaEmpleado(int $ALinea)
    {
      $this->ObtieneSentenciaInsert();
      $this->AsignaParametros($this->ColocaParametros());
      $resultado = $this->EjecutaSentenciaInsert();
      if (isset($resultado->error)) {
        $this->Errores[] = "Error: {$resultado->error} Linea: {$ALinea}";
        $this->Errores[] = $this->linea;
        $this->empleadosError++;
      }else{
       $this->empleadosAgregados++; 
      }  
    }

    private function ColocaEmpleadosInactivos()
    {
      $this->ObtieneSentenciaEmpleadoInactivo();
      $this->AsignaParametros($this->ColocaParametrosEmpleadoInactivo());
      $resultado = $this->EjecutaSentencia(); 
      if (isset($resultado->error)) {
        $this->Errores[] = "{$resultado->error} en ColocaEmpleadosInactivos";
      }
    }

    private function ColocaParametros()
    {
      return array(
        $this->linea[$this->columnasExcel[1]],
        $this->linea[$this->columnasExcel[2]],
        $this->linea[$this->columnasExcel[3]],
        $this->linea[$this->columnasExcel[4]],
        $this->linea[$this->columnasExcel[5]],
        $this->linea[$this->columnasExcel[6]],
        $this->linea[$this->columnasExcel[7]],
        $this->linea[$this->columnasExcel[8]],
        $this->linea[$this->columnasExcel[9]],
        1
      );
    }

    private function ColocaParametrosActualiza()
    {
      return array(
        $this->linea[$this->columnasExcel[2]],
        $this->linea[$this->columnasExcel[3]],
        $this->linea[$this->columnasExcel[4]],
        $this->linea[$this->columnasExcel[5]],
        $this->linea[$this->columnasExcel[6]],
        $this->linea[$this->columnasExcel[7]],
        $this->linea[$this->columnasExcel[8]],
        $this->linea[$this->columnasExcel[9]],
        1,
        $this->linea[$this->columnasExcel[1]]
      );
    }

    private function ColocaParametrosEmpleadoInactivo()
    {
      return array(0);
    }

    private function EmpleadoDuplicado()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".empleados",
        "num_empleado",
        "where num_empleado = ? and activo = ?",
        array($this->linea[$this->columnasExcel[1]],
          1)
      );
      return $empleado == $this->linea[$this->columnasExcel[1]];
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

    function ObtieneSentenciaEmpleadoInactivo()
    {
      $this->query = "update {$this->ObtieneBaseDatos(4)}.empleados set 
        empleados.activo = ?";
    }

    function ObtieneSentenciaInsert()
    {
      $this->query = "insert into {$this->ObtieneBaseDatos(4)}.empleados (
        empleados.num_empleado, 
        empleados.nombre_empleado, 
        empleados.puesto, 
        empleados.dr, 
        empleados.gz, 
        empleados.jv, 
        empleados.fecha_nacimiento, 
        empleados.fecha_ingreso, 
        empleados.num_jefe, 
        empleados.activo)
        values (?,?,?,?,?,?,?,?,?,?)";
    }

    function ObtieneSentenciaUpdate()
    {
      $this->query = "update {$this->ObtieneBaseDatos(4)}.empleados set 
        empleados.nombre_empleado = ?, 
        empleados.puesto = ?, 
        empleados.dr = ?, 
        empleados.gz = ?, 
        empleados.jv = ?, 
        empleados.fecha_nacimiento = ?, 
        empleados.fecha_ingreso = ?, 
        empleados.num_jefe = ? ,
        empleados.activo = ? 
        where empleados.num_empleado = ?";
    }

    private function ProcesarPlantillaOrganizacional()
    {
      try {
        $this->InicializaGuardado(); 
        $this->ColocaEmpleadosInactivos();
        $i=0;
        foreach ($this->Valores as $linea) {
          $i++;
          $this->linea = $linea;
          $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          $this->linea[$this->columnasExcel[2]] = $this->ObtieneValorCelda(2);
          $this->linea[$this->columnasExcel[3]] = $this->ObtieneValorCelda(3);
          $this->linea[$this->columnasExcel[4]] = $this->ObtieneValorCelda(4);
          $this->linea[$this->columnasExcel[5]] = $this->ObtieneValorCelda(5);
          $this->linea[$this->columnasExcel[6]] = $this->ObtieneValorCelda(6);
          $this->linea[$this->columnasExcel[7]] = $this->NumeroFecha($this->linea[$this->columnasExcel[7]]);
          $this->linea[$this->columnasExcel[8]] = $this->NumeroFecha($this->linea[$this->columnasExcel[8]]);
          $this->linea[$this->columnasExcel[9]] = $this->ObtieneSoloNumeros(9);
          $renglon = $i+1;
          if($this->ExisteEmpleado()){
            if($this->EmpleadoDuplicado()){
              $this->empleadosDuplicados++;
              $this->Errores[] = "Empleado {$this->linea[$this->columnasExcel[1]]} duplicado en linea {$renglon}";
              $this->Errores[] = $this->linea;
            } else {
              $this->ActualizaEmpleado($renglon);
            }
          }else{
            $this->AgregaEmpleado($renglon);
          }
        }
        $this->AceptaTransaccion();
        $this->Errores[] = "Empleados Agregados: {$this->empleadosAgregados} 
          Empleados Actualizados: {$this->empleadosActualizados} 
          Empleados Duplicados: {$this->empleadosDuplicados} 
          Empleados con Errores: {$this->empleadosError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Empleados Agregados:" => $this->empleadosAgregados, 
            "Empleados Actualizados:" => $this->empleadosActualizados,
            "Empleados con Errores:" => $this->empleadosError,
            "Empleados Duplicados: " => $this->empleadosDuplicados
           ),
          "guardar"=>array(
           "0" => $this->empleadosAgregados, 
           "1" => $this->empleadosActualizados,
           "2" => $this->empleadosError
          )
        );
         $resulSet = $this->GuardarRespuesta($datos);
         if (isset($resulSet["error"])) {
          $datos["error"] = $resulSet;
          $datos["usuario"] = $this->ObtieneIdUsuario();
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

    /* Declaraciones publicas */
    public function ActualizaPlantillaOrganizacional()
    {
      $this->ValidaDatos();
      if(count($this->Errores)>0){
       return $this->Errores;
      }else{
       return $this->ProcesarPlantillaOrganizacional();
      }
    }

    public function ColocaValorValores(array $AValores)
    {
      $this->Valores = $AValores;
    }
  }