<?php
  require_once("../clases/ImportarExcelClass.php");

  class ActualizacionRutas extends ImportarExcel
  {
    private $Errores = [];
    private $rutasAgregadas = 0;
    private $rutasError = 0;
    private $Valores = [];
    private $ruta = "";

    /* Declaraciones privadas */
    private function AgregaRuta(int $ALinea)
    {
      $this->ObtieneSentenciaInsert();
      $this->AsignaParametros($this->ColocaParametros());
      $resultado = $this->EjecutaSentenciaInsert();
      if (isset($resultado->error)) {
        $this->Errores[] = "Error: {$resultado->error} Linea: {$ALinea}";
        $this->Errores[] = $this->linea;
        $this->rutasError++;
      }else{
       $this->rutasAgregadas++; 
      }  
    }

    private function ColocaParametros()
    {
      return array(
        0,
        $this->linea[$this->columnasExcel[1]],
        $this->ruta,
        $this->ObtieneFechaActual(),
        4
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

    private function ExisteEmpleadoRuta()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".empleados_rutas",
        "num_empleado",
        'where num_empleado = ? and ruta = ?',
        array($this->linea[$this->columnasExcel[1]],
        $this->ruta)
      );
      return $empleado == $this->linea[$this->columnasExcel[1]];
    }

    function ObtieneSentenciaInsert()
    {
      $this->query = "insert into {$this->ObtieneBaseDatos(4)}.empleados_rutas (
        empleados_rutas.id_er, 
        empleados_rutas.num_empleado, 
        empleados_rutas.ruta,
        empleados_rutas.fecha,
        empleados_rutas.id_fuente)
        values (?,?,?,?,?)";
    }

    private function ProcesarRutasEmpleado()
    {
  		try {
        $this->InicializaGuardado();
        $i=0;
        foreach ($this->Valores as $linea) {
          $i++;
          $this->linea = $linea;
          $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          $this->ruta = $this->linea[$this->columnasExcel[2]];
          if ($this->ExisteEmpleado()) {
            $cadena = $this->ruta;
            $buscar = '-';
            $posicion = strpos($cadena, $buscar);
            if ($posicion === false) {
              if (!$this->ExisteEmpleadoRuta()) {
                $this->AgregaRuta($i);
              } else {
                $this->Errores [] = "Empleado {$this->linea[$this->columnasExcel[1]]} con ruta {$this->ruta} ya existente";
              }
            } else {
              $rutas = explode("-",$cadena);
              foreach ($rutas as $this->ruta) {
                if (!$this->ExisteEmpleadoRuta()) {
                  $this->AgregaRuta($i);
                } else {
                  $this->Errores[] = "Empleado {$this->linea[$this->columnasExcel[1]]} con ruta {$this->ruta} ya existente";
                }
              }
            }
          } else {
            $this->Errores[] = "Empleado inexistente en tabla Empleados: {$this->linea[$this->columnasExcel[1]]} Linea: {$i}";
            $this->rutasError++;
          }
        }
        $this->AceptaTransaccion();
        $this->Errores[] = "Rutas Empleado Agregadas: {$this->rutasAgregadas} 
        Rutas Empleado con Errores: {$this->rutasError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Rutas empleado Agregadas:" => $this->rutasAgregadas, 
            "rutas empleado con Errores:" => $this->rutasError
           ),
          "guardar"=>array(
           "0" => $this->rutasAgregadas, 
           "1" => 0,
           "2" => $this->rutasError
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

    /* Declaraciones publicas */
    public function ActualizaRutas()
    {
      $this->ValidaDatos();
  	  if(count($this->Errores)>0){
        return $this->Errores;
  	  }else{
        return $this->ProcesarRutasEmpleado();
	    }
    }

    public function ColocaValorValores(array $AValores)
	  {
      $this->Valores = $AValores;
  	}
  }