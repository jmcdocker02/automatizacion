<?php
  require_once("../clases/ImportarExcelClass.php");
  require_once("../PHPMailer/enviaCorreo.php");
  require_once("../clases/excelClass.php");
  
  class StarsSemestral extends ImportarExcel
  {
    private $Errores = [];
    private $anioProceso = '';
    private $semestreProceso = '';
    private $fechaInicio = '';
    private $fechaFin = '';
    private $starsAgregadas = 0;
    private $starsError = 0;
    private $Valores = [];

    /* Declaraciones privadas */
    private function AgregaResultadoKpisSemestral(int $ALinea)
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

    private function CargaResultadoSemestralFinal()
    {
      try {
        $this->InicializaGuardado();
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.CargaResultadoSemestralFinal;";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
        //$this->Errores[] = $resultado->execute();
        $this->AceptaTransaccion();
      } catch (PDOException $e) {
        $this->RechazaTransaccion();
        $this->Errores[] = "Carga Resultado Final: Error en proceso almacenado CargaResultadoSemestralFinal " . $e->getMessage();
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
        $this->fechaInicio,
        $this->fechaFin,
        $ALinea
      );
    }

    private function ConsolidadoSemestralAux()
    {
      try {
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.GeneracionRankingSemestral('{$this->fechaInicio}','{$this->fechaFin}');";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
      } catch (PDOException $e) {
        $this->Errores[] = "ConsolidadoSemestral: Error en proceso almacenado GeneracionRankingSemestral " . $e->getMessage();
      }
    }

    function ObtieneSentenciaInsert()
    {
      $this->query = "insert into {$this->ObtieneBaseDatos(4)}.resultados_kpis_semestral (
        resultados_kpis_semestral.id_reskpi, 
        resultados_kpis_semestral.num_empleado, 
        resultados_kpis_semestral.puesto, 
        resultados_kpis_semestral.cluster_comparacion, 
        resultados_kpis_semestral.nom_kpi, 
        resultados_kpis_semestral.resultado_kpi, 
        resultados_kpis_semestral.meta_kpi,
        resultados_kpis_semestral.resultado_global,
        resultados_kpis_semestral.cluster,
        resultados_kpis_semestral.fecha_inicio,
        resultados_kpis_semestral.fecha_fin,
        resultados_kpis_semestral.linea_excel)
        values (?,?,?,?,?,?,?,?,?,?,?,?)";
    }

    function ObtieneSentenciaTruncate()
    {
      $this->query = "truncate table {$this->ObtieneBaseDatos(4)}.resultados_kpis_semestral; 
      truncate table {$this->ObtieneBaseDatos(4)}.consolidado_semestral_aux;";
    } 

    private function ProcesarStarsSemestral()
    {
  		try {
        $this->InicializaGuardado();
        if ($this->semestreProceso==1){
          $this->fechaInicio = "{$this->anioProceso}-01-01";
          $this->fechaFin = "{$this->anioProceso}-06-30";
        } else {
          $this->fechaInicio = "{$this->anioProceso}-07-01";
          $this->fechaFin = "{$this->anioProceso}-12-31";
        }
        $i=0;
        $this->TruncaResultadoKpisSemestral($i);
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
          if ((strtoupper($this->linea[$this->columnasExcel[8]]) == "REGION") || 
             (strtoupper($this->linea[$this->columnasExcel[8]]) == "NACIONAL") ||
             (strtoupper($this->linea[$this->columnasExcel[8]]) == "GZ")) {
            //if ($this->linea[$this->columnasExcel[7]] <> 0) {
              //if ($this->ValidarEmpleado()) {
                //if ($this->ValidarPuesto()) {
                  $this->AgregaResultadoKpisSemestral($renglon);
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
        $this->ConsolidadoSemestralAux();
        $this->Exportar();
        $this->EnviaCorreo();

        $this->AceptaTransaccion();
        //$this->Errores[] = "Stars Agregadas: {$this->starsAgregadas} 
        //Stars con Errores: {$this->starsError}";
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
      //$this->fechaResultado = date('Y-m-01');
      if ($this->semestreProceso==1){
        $this->fechaInicio = "{$this->anioProceso}-01-01";
        //$this->fechaFin = "{$this->anioProceso}-06-30";
      } else {
        $this->fechaInicio = "{$this->anioProceso}-07-01";
        //$this->fechaFin = "{$this->anioProceso}-12-31";
      }

      try {
        $this->InicializaGuardado();
        $this->query = "CALL {$this->ObtieneBaseDatos(4)}.SumaStarsSemestral('{$this->fechaInicio}');";
        $resultado = $this->conexion->prepare($this->query);
        $resultado->execute();
        $this->AceptaTransaccion();
      } catch (PDOException $e) {
        $this->RechazaTransaccion();
        $this->Errores[] = "suma Star al Saldo: Error en proceso almacenado SumaStarsSaldo " . $e->getMessage();
      } finally {
        $this->DestruyeConexion();
      }
    }

    private function TruncaResultadoKpisSemestral(int $ALinea)
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
      $this->query = "select {$this->ObtieneBaseDatos(4)}.ValidaStarsSemestral($this->starsError) as ValidaStars;";
		//$this->AsignaParametros($AParametros);	 
		$registro = $this->ObtieneRegistro();
		return (isset($registro->error)) ? $registro->error : $registro["ValidaStars"];
    }

    /* Declaraciones publicas */
    public function Actualizar()
    {
      $this->CargaResultadoSemestralFinal();
      $this->SumaStarsSaldo();
      return array('resultado'=>'Proceso realizado con exito SEMESTRAL');
    }

    public function ColocaValorValores(array $AValores)
	  {
      $this->Valores = $AValores;
  	}

    public function ColocaValorAnioProceso(string $AAnioProceso)
    {
      $this->anioProceso = $AAnioProceso;
    }

    public function ColocaValorSemestreProceso(string $ASemestreProceso)
    {
      $this->semestreProceso = $ASemestreProceso;
    }

    public function EnviaCorreo()
    {
      return EnviaCorreo(
        'Zoe Badillo',
        'zoe.badillo@decode.mx',
        'Ranking Zona Figura Semestral',
        'Buen día, envio archivo Ranking zona figura semestral para su visto bueno.',
        '../temp/Ranking Zona Figura Semestral.xlsx');
    }

    public function Exportar()
    {
      $datos = [];
      $documento = new TExcel();
      $Tabla = new TObtieneDatosTabla;
      $Tabla->AsignaTabla($Tabla->ObtieneBaseDatos(4).".consolidado_semestral_aux");
      $Tabla->AsignaCampos("consolidado_semestral_aux.num_empleado,empleados.nombre_empleado,
      consolidado_semestral_aux.puesto, empleados.dr, empleados.gz, consolidado_semestral_aux.cluster,
      consolidado_semestral_aux.resultado_global,
      consolidado_semestral_aux.clasificacion, consolidado_semestral_aux.top,
      consolidado_semestral_aux.stars, consolidado_semestral_aux.fecha_inicio, consolidado_semestral_aux.fecha_fin");
      $Tabla->AsignaInner("left join {$Tabla->ObtieneBaseDatos(4)}.empleados on consolidado_semestral_aux.num_empleado = empleados.num_empleado");
      $registros = $Tabla->ObtieneDatosTablaAsociativo();
      
      if (isset($registros->error)) {
        $datos["error"]=$registros;
      }else{
        $columnas = array("A1;NUM EMPLEADO","B1;NOMBRE EMPLEADO","C1;PUESTO","D1;DR","E1;GZ",
          "F1;CLUSTER","G1;RESULTADO GLOBAL","H1;CLASIFICACION","I1;TOP","J1;STARS","K1;FECHA INICIO",
          "L1;FECHA FIN");
        $documento->AsignarValorArreglo($documento->ObtieneArreglo($columnas));
        $documento->DibujarTabla($registros, "A2");
        //$documento->nombreArchivo = "Ranking Zona Figura Semestral ".$this->ObtieneFechaActual().".xlsx";
        $documento->nombreArchivo = "Ranking Zona Figura Semestral.xlsx";
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
        return $this->ProcesarStarsSemestral();
	    }
    }
  }