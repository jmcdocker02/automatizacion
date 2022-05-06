<?php
  require_once("../clases/ImportarExcelClass.php");
  require_once("../PHPMailer/enviaCorreo.php");
  require_once("../clases/excelClass.php");

  class StarsMensual extends ImportarExcel
  {
    private $Errores = [];
    private $anioProceso = '';
    private $mesProceso = '';
    private $fechaResultado = '';
    private $starsAgregadas = 0;
    private $starsError = 0;
    private $Valores = [];

    /* Declaraciones privadas */
    private function AgregaResultadoKpisAux(int $ALinea)
    {
      $this->ObtieneSentenciaInsert();
      $this->AsignaParametros($this->ColocaParametros($ALinea));
      $resultado = $this->EjecutaSentenciaInsert();
      if (isset($resultado->error)) {
        $this->Errores[] = "Error: {$resultado->error} Linea: {$ALinea}";
        $this->starsError++;
      }else{
       $this->starsAgregadas++; 
      }  
    }

    private function CargaResultadoFinal()
    {
      try {
        $this->InicializaGuardado();
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.CargaResultadoFinal;";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
        //$this->Errores[] = $resultado->execute();
        $this->AceptaTransaccion();
      } catch (PDOException $e) {
        $this->RechazaTransaccion();
        $this->Errores[] = "Carga Resultado Final: Error en proceso almacenado CargaResultadoFinal " . $e->getMessage();
      } finally {
        $this->DestruyeConexion();
      }
    }

    private function ColocaParametros(int $ALinea)
    {
      return array(
        0,
        $this->linea[$this->columnasExcel[1]],
        $this->linea[$this->columnasExcel[2]],
        $this->linea[$this->columnasExcel[3]],
        $this->linea[$this->columnasExcel[4]],
        $this->linea[$this->columnasExcel[5]],
        $this->linea[$this->columnasExcel[6]],
        $this->linea[$this->columnasExcel[7]],
        $this->linea[$this->columnasExcel[8]],
        $this->fechaResultado,
        $ALinea
      );
    }

    private function ConsolidadoAux()
    {
      try {
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.GeneracionRankingMensual('{$this->fechaResultado}');";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
      } catch (PDOException $e) {
        $this->Errores[] = "Consolidados: Error en proceso almacenado GeneracionRankingMensual " . $e->getMessage();
      }
    }

    function ObtieneSentenciaInsert()
    {
      $this->query = "insert into {$this->ObtieneBaseDatos(4)}.resultados_kpis_aux (
        resultados_kpis_aux.id_reskpi, 
        resultados_kpis_aux.num_empleado, 
        resultados_kpis_aux.puesto, 
        resultados_kpis_aux.cluster_comparacion, 
        resultados_kpis_aux.nom_kpi, 
        resultados_kpis_aux.resultado_kpi, 
        resultados_kpis_aux.meta_kpi,
        resultados_kpis_aux.resultado_global,
        resultados_kpis_aux.cluster,
        resultados_kpis_aux.fecha,
        resultados_kpis_aux.linea_excel)
        values (?,?,?,?,?,?,?,?,?,?,?)";
    }
    
    function ObtieneSentenciaTruncate()
    {
      $this->query = "truncate table {$this->ObtieneBaseDatos(4)}.resultados_kpis_aux; 
      truncate table {$this->ObtieneBaseDatos(4)}.consolidado_aux;";
    } 

    private function ProcesarStarsMensual()
    {
  		try {
        $this->InicializaGuardado();
        $this->mesProceso = strlen($this->mesProceso) > 1 ? $this->mesProceso : '0'.$this->mesProceso;
        $this->fechaResultado = "{$this->anioProceso}-{$this->mesProceso}-01";
        $i=0;
        $this->TruncaResultadoKpisAux($i);
        foreach ($this->Valores as $linea) {
          $i++;
          $this->linea = $linea;
          $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          $this->linea[$this->columnasExcel[2]] = $this->ObtieneValorCelda(2);
          $this->linea[$this->columnasExcel[3]] = $this->ObtieneValorCelda(3);
          $this->linea[$this->columnasExcel[4]] = $this->ObtieneValorCelda(4);
          $this->linea[$this->columnasExcel[5]] = $this->ObtieneValorCelda(5);
          $this->linea[$this->columnasExcel[6]] = $this->ObtieneValorCelda(6);
          $this->linea[$this->columnasExcel[7]] = $this->ObtieneValorCelda(7) <> 0 ? $this->ObtieneValorCelda(7) : 0;
          $this->linea[$this->columnasExcel[8]] = $this->ObtieneValorCelda(8);
          $renglon = $i+1;
          //$this->Errores[]=$this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
          if ((strtoupper($this->linea[$this->columnasExcel[8]]) == "REGION") || 
             (strtoupper($this->linea[$this->columnasExcel[8]]) == "NACIONAL") ||
             (strtoupper($this->linea[$this->columnasExcel[8]]) == "GZ")) {
            //if ($this->linea[$this->columnasExcel[7]] <> 0) {
              //if ($this->ValidarEmpleado()) {
                //if ($this->ValidarPuesto()) {
                  //if (!$this->ValidarDuplicadoEmpleado()) {
                    $this->AgregaResultadoKpisAux($renglon);
                  //} else{
                  //  $this->Errores[] = "Empleado {$this->linea[$this->columnasExcel[1]]} duplicado Tabla resultados_kpis_aux, Linea: {$renglon}";
                  //  $this->starsError++;
                  //}
                //} else {
                //  $this->Errores[] = "Puesto {$this->linea[$this->columnasExcel[2]]} Inexistente en Tabla Bandos, Linea: {$renglon}";
                //  $this->starsError++;
                //}
              //} else {
              //  $this->Errores[] = "Empleado {$this->linea[$this->columnasExcel[1]]} Inexistente en Tabla Empleados, Linea: {$renglon}";
              //  $this->starsError++;
              //}
            //} else {
            //  $this->Errores[] = "Columna Resultado Global Vacia, {$this->linea[$this->columnasExcel[7]]} Linea: {$renglon}";
            //  $this->starsError++;
            //}
          } else {
            $this->Errores[] = "Columna Cluster invalida, {$this->linea[$this->columnasExcel[8]]} Linea: {$renglon}";
            $this->starsError++;
          }
        }
        $this->Errores[]=$this->ValidaRegistros();
        $this->ConsolidadoAux();
        $this->Exportar();
        $this->EnviaCorreo();

        $this->AceptaTransaccion();
        //$this->Errores[] = "Stars Agregadas: {$this->starsAgregadas} 
        //  Stars con Errores: {$this->starsError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Stars Agregadas:" => $this->starsAgregadas, 
            "Stars con Errores:" => $this->starsError
           ),
          "guardar"=>array(
           "0" => $this->starsAgregadas, 
           "1" => 0,
           "2" => $this->starsError
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

    private function SumaStarsSaldo()
    {
      $this->mesProceso = strlen($this->mesProceso) > 1 ? $this->mesProceso : '0'.$this->mesProceso;
      $this->fechaResultado = "{$this->anioProceso}-{$this->mesProceso}-01";
      try {
        $this->InicializaGuardado();
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.SumaStars('{$this->fechaResultado}');";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
        $this->AceptaTransaccion();
      } catch (PDOException $e) {
        $this->RechazaTransaccion();
        $this->Errores[] = "Suma Stars al Saldo: Error en proceso almacenado SumaStarsSaldo " . $e->getMessage();
      } finally {
        $this->DestruyeConexion();
      }
    }

    private function TruncaResultadoKpisAux(int $ALinea)
    {
      $this->ObtieneSentenciaTruncate();
      $resultado = $this->EjecutaSentencia();
      if (isset($resultado->error)) {
        $this->Errores[] = "Error: {$resultado->error} Linea: {$ALinea}";
        $this->starsError++;
      }
    }

    private function ValidaDatos()
    {
	    if(count($this->Valores)==0){
        $this->Errores["error"]=array("error"=>"No se localizaron datos a procesar");
	    }  
    }

    private function ValidarEmpleado()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".empleados",
        "num_empleado",
        "where num_empleado = ?",
        array($this->linea[$this->columnasExcel[1]])
      );
      return $empleado == $this->linea[$this->columnasExcel[1]];
    }

    private function ValidarduplicadoEmpleado()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".resultados_kpis_aux",
        "num_empleado",
        "where num_empleado = ? and puesto ",
        array($this->linea[$this->columnasExcel[1]])
      );
      return $empleado == $this->linea[$this->columnasExcel[1]];
    }

    private function ValidarPuesto()
    {
      $empleado = $this->ObtieneValorCampo(
        $this->ObtieneBaseDatos(4).".bandos",
        "puesto",
        "where trim(puesto)=?",
        array($this->linea[$this->columnasExcel[2]])
      );
      return $empleado == $this->linea[$this->columnasExcel[2]];
    }


    private function ValidaRegistros()
    {
      $this->query = "select {$this->ObtieneBaseDatos(4)}.ValidaStarsMensual($this->starsError) as ValidaStars;";
		//$this->AsignaParametros($AParametros);	 
		$registro = $this->ObtieneRegistro();
		return (isset($registro->error)) ? $registro->error : $registro["ValidaStars"];
    }

    /* Declaraciones publicas */
    public function Actualizar()
    {
      $this->CargaResultadoFinal();
      $this->SumaStarsSaldo();
      return array('resultado'=>'Proceso realizado con exito'.$this->fechaResultado);
    }
  
    public function ColocaValorValores(array $AValores)
	  {
      $this->Valores = $AValores;
  	}

    public function ColocaValorAnioProceso(string $AAnioProceso)
    {
      $this->anioProceso = $AAnioProceso;
    }

    public function ColocaValorMesProceso(string $AMesProceso)
    {
      $this->mesProceso = $AMesProceso;
    }

    public function EnviaCorreo()
    {
      return EnviaCorreo(
        'Zoe Badillo',
        'zoe.badillo@decode.mx',
        'Ranking Zona Figura Mensual',
        'Buen día, envio archivo Ranking zona figura mensual para su visto bueno.',
        '../temp/Ranking Zona Figura Mensual.xlsx');
    }

    public function Exportar()
    {
      $datos = [];
      $documento = new TExcel();
      $Tabla = new TObtieneDatosTabla;
      $Tabla->AsignaTabla($Tabla->ObtieneBaseDatos(4).".consolidado_aux");
      $Tabla->AsignaCampos("consolidado_aux.num_empleado,empleados.nombre_empleado,
        consolidado_aux.puesto, empleados.dr, empleados.gz, consolidado_aux.cluster,
        consolidado_aux.resultado_global, consolidado_aux.clasificacion,
        consolidado_aux.top, consolidado_aux.stars, consolidado_aux.fecha");
      $Tabla->AsignaInner("left join {$Tabla->ObtieneBaseDatos(4)}.empleados on consolidado_aux.num_empleado = empleados.num_empleado");
      $registros = $Tabla->ObtieneDatosTablaAsociativo();
      
      if (isset($registros->error)) {
        $datos["error"]=$registros;
      }else{
        $columnas = array("A1;NUM EMPLEADO","B1;NOMBRE EMPLEADO","C1;PUESTO","D1;DR","E1;GZ",
          "F1;CLUSTER","G1;RESULTADO GLOBAL","H1;CLASIFICACION","I1;TOP","J1;STARS","K1;FECHA");
        $documento->AsignarValorArreglo($documento->ObtieneArreglo($columnas));
        $documento->DibujarTabla($registros, "A2");        
        $documento->nombreArchivo = "Ranking Zona Figura Mensual.xlsx";
        $documento->GuardarArchivo();
        $datos['resultado']=$documento->ObtieneResultado();
        return $datos;
     }
    }

    public function Importar()
    {
      $this->ValidaDatos();
  	  if(count($this->Errores)>0){
        return $this->Errores;
  	  }else{
        return $this->ProcesarStarsMensual();
	    }
    }
  }