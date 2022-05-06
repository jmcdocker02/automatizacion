<?php
  require_once("../clases/ImportarExcelClass.php");

class ActualizacionRetos extends ImportarExcel
{
  private $retosAgregados = 0;
  private $retosError = 0;
  private $Errores=[];
  private $idReto=0;
  private $fechaProceso = 0;
  private $tipoReto = 0;
  private $tipo=0;
  private $Valores=[];

  /*  Declaraciones privadas */

  private function AgregaReto(int $ALinea)
  {
    //$this->Errores[]="entro aqui AgregaReto"; // no se esta almacenando
    $this->ObtieneSentenciaInsert();
    $this->AsignaParametros($this->ColocaParametros());
    $resultado = $this->EjecutaSentenciaInsert();
    //$this->Errores[]=$resultado;
    if (isset($resultado->error)) {
      $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
      $this->retosError++;
    }else{
      $this->retosAgregados++;
    }
  }

  private function AgregaRetoCajas(int $ALinea)
  {
    $this->ObtieneSentenciaInsertCajas();
    $this->AsignaParametros($this->ColocaParametrosCajas());
    $resultado = $this->EjecutaSentenciaInsert();
    if (isset($resultado->error)) {
      $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
      $this->retosError++;
    }else{
      $this->retosAgregados++;
    }
  }

  private function ColocaParametros()
  {
    return array(
      0,
      $this->idReto,
      $this->linea[$this->columnasExcel[1]],
      $this->linea[$this->columnasExcel[2]],
      $this->linea[$this->columnasExcel[3]],
      $this->linea[$this->columnasExcel[5]],
      $this->linea[$this->columnasExcel[6]],
      $this->linea[$this->columnasExcel[7]],
      $this->linea[$this->columnasExcel[8]],
      $this->linea[$this->columnasExcel[9]],
      $this->linea[$this->columnasExcel[10]],
      $this->linea[$this->columnasExcel[4]],
      $this->fechaProceso,
      $this->tipo
     );
  }
   

  private function ColocaParametrosCajas()
  {
    return array(
      0,
      $this->idReto,
      $this->linea[$this->columnasExcel[1]],
      $this->linea[$this->columnasExcel[3]],
      $this->linea[$this->columnasExcel[2]],
      $this->linea[$this->columnasExcel[5]],
      14,
      $this->linea[$this->columnasExcel[4]],
      $this->tipo,
      $this->fechaProceso
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

  private function ExisteEmpleadoCanal()
  {
   $parametros = array(
     $this->idReto,
     $this->linea[$this->columnasExcel[1]],
     $this->linea[$this->columnasExcel[2]],
     $this->fechaProceso
   );
   $empleado = $this->ObtieneValorCampo(
     $this->ObtieneBaseDatos(4).".reto_ccc_empleados",
     "num_empleado",
     "where id_reto = ? and num_empleado = ? and tipo_ruta = ? and fecha = ?",
     $parametros
    );
    return $empleado == $this->linea[$this->columnasExcel[1]];
  }

  private function ExisteEmpleadoCanalCajas()
  {
   $parametros = array(
     $this->idReto,
     $this->linea[$this->columnasExcel[1]],
     $this->linea[$this->columnasExcel[2]],
     $this->fechaProceso
   );
   $empleado = $this->ObtieneValorCampo(
     $this->ObtieneBaseDatos(4).".reto_cajas",
     "num_empleado",
     "where id_reto = ? and num_empleado = ? and canal = ? and fecha = ?",
     $parametros
    );
    return $empleado == $this->linea[$this->columnasExcel[1]];
  }

  private function ExisteRuta()
  {
   $ruta = $this->ObtieneValorCampo(
     $this->ObtieneBaseDatos(4).".cat_tipo_ruta",
     "tipo_ruta",
     "where tipo_ruta = ?",
     array($this->linea[$this->columnasExcel[3]]),
     false
    );
    return $ruta == $this->linea[$this->columnasExcel[3]];
  }

  private function ObtieneIdCanal(){
    $descripcion = explode(" ",$this->linea[$this->columnasExcel[2]]);
    $idCanal = $this->ObtieneValorCampo(
      $this->ObtieneBaseDatos(4).".cat_tipo_ruta",
      "tipo_ruta",
      "where desc_tipo = ?",
      array($descripcion[1]),
      false
    );
    return $idCanal;
  }

  private function ObtieneSentenciaInsert()
  {
    $baseDatos = $this->ObtieneBaseDatos(4);
    $this->query = "insert into {$baseDatos}.reto_ccc_empleados values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  } 

  private function ObtieneSentenciaInsertCajas()
  {
    $baseDatos = $this->ObtieneBaseDatos(4);
    $this->query = "insert into {$baseDatos}.reto_cajas values (?,?,?,?,?,?,?,?,?,?)";
  }

  private function ProcesarRetos()
  {
    try {
      $this->InicializaGuardado(); 
      $i=0;
      //$this->Errores[]=preg_replace('/[^0-9]/','','  8024372 
//      ');
      foreach ($this->Valores as $linea) {
        $i++;
        $this->linea = $linea;
        //$linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
        //$linea[$this->columnasExcel[2]] = $this->ObtieneIdCanal();
        $this->linea[$this->columnasExcel[1]] = $this->ObtieneSoloNumeros(1);
        //$this->linea[$this->columnasExcel[1]] = preg_replace('/[^0-9]/','',$this->linea[$this->columnasExcel[1]]);
        //$this->Errores[]=$this->linea[$this->columnasExcel[1]];
        $this->linea[$this->columnasExcel[2]] = $this->ObtieneIdCanal();
        $renglon = $i+1; 
        if($this->ExisteEmpleado()){
         //if($this->ExisteRuta()){
          if($this->tipoReto==17){
           //if($this->ExisteEmpleadoCanal()){
           //  $empleado = "[ {$linea[$this->columnasExcel[1]]} ] Columna {$this->columnasExcel[1]}";
           //  $ruta = "[ {$linea[$this->columnasExcel[2]]} ] Columna {$this->columnasExcel[2]}";
           //  $this->Errores[] = "El empleado {$empleado} tipo de ruta {$ruta} Linea:{$renglon} se encuentra duplicado";
           //  $this->retosError++;      
           //}else{

//            $this->Errores[]=$this->idReto;
//            $this->Errores[]=$this->linea[$this->columnasExcel[1]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[2]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[3]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[5]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[6]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[7]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[8]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[9]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[10]];
//            $this->Errores[]=$this->linea[$this->columnasExcel[4]];
//            $this->Errores[]=$this->fechaProceso;
//            $this->Errores[]=$this->tipo;

            $this->AgregaReto($renglon);
            if ($this->tipo == 1){
              $this->SumaStarsEmpleados($renglon);
            }
           //}
          }else{
            //if($this->ExisteEmpleadoCanalCajas()){
            //  $empleado = "[ {$linea[$this->columnasExcel[1]]} ] Columna {$this->columnasExcel[1]}";
            //  $ruta = "[ {$linea[$this->columnasExcel[2]]} ] Columna {$this->columnasExcel[2]}";
            //  $this->Errores[] = "El empleado {$empleado} tipo de ruta {$ruta} Linea:{$renglon} se encuentra duplicado";
            //  $this->retosError++;      
            //}else{
             $this->AgregaRetoCajas($renglon);
             if ($this->tipo == 1){
              $this->SumaStarsCajas($renglon);
             }
            //} 
          }
         //}else{
         // $ruta = "[ {$linea[$this->columnasExcel[3]]} ] Columna {$this->columnasExcel[3]}";
         // $this->Errores[] = "No se localizo el tipo de ruta {$ruta} Linea:{$renglon}";
         // $this->retosError++;      
         // }
        }else{
          $empleado = "[ {$linea[$this->columnasExcel[1]]} ] Columna {$this->columnasExcel[1]}";
          $this->Errores[] = "No se localizo el Empleado {$empleado} Linea:{$renglon}";
         $this->retosError++;      
        }
      }
      $this->AceptaTransaccion();
      $this->Errores[] = "Retos Agregados: {$this->retosAgregados} 
          Empleados con Errores: {$this->retosError}";
        $datos = array(
          "errores" => $this->Errores,
          "resultado"=>array(
            "Retos Agregados:" => $this->retosAgregados, 
            "Empleados con Errores:" => $this->retosError
           ),
          "guardar"=>array(
           "0" => $this->retosAgregados, 
           "1" => 0,
           "2" => $this->retosError
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
  
  private function SumaStarsEmpleados($ALinea){
    $this->AsignaQuery("update {$this->ObtieneBaseDatos(4)}.empleados set
    stars = stars + ?
    where num_empleado = ?");
    $this->AsignaParametros(array(
      $this->linea[$this->columnasExcel[4]],
      $this->linea[$this->columnasExcel[1]])
    );
    $resultado = $this->EjecutaSentencia();
    if (isset($resultado->error)) {
      $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
      $this->retosError++;
    }
  }

  private function SumaStarsCajas($ALinea){
    $this->AsignaQuery("update {$this->ObtieneBaseDatos(4)}.empleados set
    stars = stars + ?
    where num_empleado = ?");
    $this->AsignaParametros(array(
      $this->linea[$this->columnasExcel[4]],
      $this->linea[$this->columnasExcel[1]])
    );
    $resultado = $this->EjecutaSentencia();
    if (isset($resultado->error)) {
      $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
      $this->retosError++;
    }
  }

  private function ValidaDatos()
  {
    if(count($this->Valores)==0){
     $this->Errores["error"]=array("error"=>"No se localizaron datos a procesar");
    }  
    if($this->tipoReto==0){
      $this->Errores["error"]=array("error"=>"No se localizo el tipo de retodatos a procesar");
    }   
  }

  /* Declaraciones Publicas */
   public function ActualizaRetos()
   {
    $this->ValidaDatos();
    if(count($this->Errores)>0){
      return $this->Errores;
    }else{  
     return $this->ProcesarRetos();
    }
   }
   public function ColocaValorFechaProceso(string $AFechaProceso)
   {
    $this->fechaProceso = $AFechaProceso;
   }
   
   public function ColocaValorIdReto(int $AIdReto)
   {
    $this->idReto = $AIdReto;
   }
    
   public function ColocaValorTipo(int $ATipo)
   {
    $this->tipo = $ATipo;
   }

   public function ColocaValorTipoReto(int $ATipoReto)
   {
    $this->tipoReto = $ATipoReto;
   }

   public function ColocaValorValores(array $AValores)
   {   
    $this->Valores = $AValores;
   }   
}