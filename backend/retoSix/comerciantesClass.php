<?php
  require_once("../clases/ImportarExcelClass.php");

class Comerciantes extends ImportarExcel
{
  private $comerciantesActualizados = 0;
  private $comerciantesAgregados = 0;
  private $comerciantesError = 0;
  private $Errores=[];
  private $IdComerciante=0;
  private $nombreArchivo = "../archivos/comerciantes.csv";
  private $NumComerciante = 0;
  private $Valores=[];
  private $totalVacantes=0;

  /*  Declaraciones privadas */
  private function ActualizaComerciante(int $ALinea)
  {
    $this->comerciantesActualizados++;
  }

  private function ActualizaComerciante_CatTiendas()
  {
    $this->ObtieneSentenciaUpdate_CatTiendas();
    $this->AsignaParametros(array(
      $this->IdComerciante,
      $this->NumComerciante,
      $this->linea[4]
    ));
    $resultado = $this->EjecutaSentencia(); 
    if (isset($resultado->error)) {
      $this->Errores[] = $resultado;
      return false;
    }else{
      return true;
    }  
  }
  
  private function AgregaComerciante(int $ALinea)
  {
    $this->ObtieneSentenciaInsert();
    //$this->AsignaParametros($this->ObtieneParametros(1,0));
    $this->AsignaParametros(array(
      $this->LimpiarCaracteresAcentuados(utf8_decode($this->linea[8]))
    ));
    $resultado = $this->EjecutaSentenciaInsert();
    if (isset($resultado->error)) {
      $this->Errores[] = array("error"=>$resultado,"Linea"=>$ALinea);
      $this->comerciantesError++;
    }else{
      $this->comerciantesAgregados++;
      $this->NumComerciante = $this->linea[7];
      $this->IdComerciante = $this->conexion->lastInsertId();
    }
  }

  private function AgregaComerciante_CatTiendas()
  {
    $this->ObtieneSentenciaInsert_CatTiendas();
    $this->AsignaParametros(array(
      $this->linea[4],
      $this->LimpiarCaracteresAcentuados($this->linea[5]),
      $this->IdComerciante,
      $this->NumComerciante
    ));
    $resultado = $this->EjecutaSentenciaInsert();
    if (isset($resultado->error)) {
      $this->Errores[] = $resultado;
    }else{
      //$this->comerciantesAgregados++;
      //-------------------------------
      //$this->NumComerciante = $this->linea[7];
      //$this->IdComerciante = $this->conexion->lastInsertId();
      //$this->Errores[] = $this->IdComerciante;
      //-------------------
    }  
    return true;
  }

  private function AgregaComerciante_NumComerciante()
  {
    $this->ObtieneSentenciaInsert_NumComerciante();
    $this->AsignaParametros(array(
      $this->IdComerciante,
      $this->NumComerciante
    ));
    $resultado = $this->EjecutaSentenciaInsert();
    if (isset($resultado->error)) {
      $this->Errores[] = $resultado;
    }else{
      //$this->comerciantesAgregados++;
      //$this->Errores[] = $this->IdComerciante;
      //-------------------
    }  
    return true;
  }

  private function CargaComerciantes()
  {
    if($this->GuardaArchivoDatosSeparadosComas($this->nombreArchivo, $this->Valores)){
      return true; //array("respuesta"=>"se almaceno el archivo");
    }else{
      return false; //array("error"=>"No se logro guardar el archivo");		
    }   
  }

  private function ExisteComerciante()
  {
    $this->query = "select 
      pruebas_RetoSixV6.cat_comerciante.id_comerciante 
      from pruebas_RetoSixV6.cat_comerciante 
      where  nom_comerciante='{$this->LimpiarCaracteresAcentuados($this->linea[8])}'";
    $resultado = $this->conexion->prepare($this->query);
    $resultado->execute();
    $resultSet = $resultado->fetch();
    return $resultSet;
  }

  private function ExisteComerciante_CatTiendas()
  {
    $this->query = "select 
      num_tienda 
      from pruebas_RetoSixV6.cat_tiendas 
      where  num_tienda='{$this->linea[4]}'";
    $resultado = $this->conexion->prepare($this->query);
    $resultado->execute();
    $resultSet = $resultado->fetch();
    return $resultSet;
  }

  private function ExisteComerciante_NumComerciante()
  {
    $this->query = "select 
    id_comerciante 
    from pruebas_RetoSixV6.cat_comerciante 
    where  nom_comerciante='{$this->LimpiarCaracteresAcentuados($this->linea[8])}'";
    $resultado = $this->conexion->prepare($this->query);
    $resultado->execute();
    $Renglon = $resultado->fetch();
    $this->IdComerciante = $Renglon['id_comerciante'];

    $this->query = "select 
      id_comerciante, num_comerciante 
      from pruebas_RetoSixV6.num_comerciante 
      where id_comerciante = '{$this->IdComerciante}'
        and num_comerciante='{$this->NumComerciante}'";
    $resultado = $this->conexion->prepare($this->query);
    $resultado->execute();
    $resultSet = $resultado->fetch();
    return $resultSet;
  }

  function ObtieneSentenciaInsert()
  {
    $this->query = "insert into pruebas_RetoSixV6.cat_comerciante (
      cat_comerciante.nom_comerciante, 
      cat_comerciante.saldo, 
      cat_comerciante.telefono, 
      cat_comerciante.celular, 
      cat_comerciante.fecha_registro, 
      cat_comerciante.fecha_confirmacion)
      values (?,0,null,null,null,null)";
  } 

  function ObtieneSentenciaInsert_CatTiendas()
  {
    $this->query = "insert into pruebas_RetoSixV6.cat_tiendas (
      cat_tiendas.num_tienda, 
      cat_tiendas.nom_tienda, 
      cat_tiendas.id_comerciante, 
      cat_tiendas.num_comerciante, 
      cat_tiendas.target)
      values (?,?,?,?,1)";
  } 

  function ObtieneSentenciaInsert_NumComerciante()
  {
    $this->query = "insert into pruebas_RetoSixV6.num_comerciante (
      num_comerciante.id_num, 
      num_comerciante.id_comerciante, 
      num_comerciante.num_comerciante)
      values (0,?,?)";
  } 

  function ObtieneSentenciaUpdate_CatTiendas()
  {
    $this->query = "update pruebas_RetoSixV6.cat_tiendas set 
      cat_tiendas.id_comerciante = ?, 
      cat_tiendas.num_comerciante = ? 
      where cat_tiendas.num_tienda = ?";
  }

  private function ProcesarComerciantes()
  {
    try {
      $this->InicializaGuardado(); 
      $i=0;
      foreach ($this->Valores as $linea) {
        $i++;
        $this->linea = $linea; 
        $this->NumComerciante = $this->linea[7];
        if (strtoupper($linea[8]) <> "VACANTE") {
          if($this->ExisteComerciante() == true){
            $this->ActualizaComerciante($i); 
          }else{
            $this->AgregaComerciante($i);
          }
          // paso 2 actualiza num_comerciante
          if($this->ExisteComerciante_NumComerciante() == true){
            //$this->ActualizaComerciante_NumComerciante();
          }else{
            $this->AgregaComerciante_NumComerciante();
          }
          // paso 3 actualiza cat_tiendas
          if($this->ExisteComerciante_CatTiendas() == true){
            $this->ActualizaComerciante_catTiendas();
          }else{
            $this->AgregaComerciante_CatTiendas();
          }
        }else{
          $this->totalVacantes++;
        }
      }

      $this->AceptaTransaccion();
      $datos = array(
        "errores" => $this->Errores,
        "resultado"=>"Comerciantes Agregados: {$this->comerciantesAgregados} 
        Comerciantes Actualizados: {$this->comerciantesActualizados} 
        Total Vacantes encontradas: {$this->totalVacantes}
        Comerciantes con Errores: {$this->comerciantesError}"
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
  public function ActualizaComerciantes()
  {
    $this->ValidaDatos();
    if(count($this->Errores)>0){
      return $this->Errores;
    }else{  
      return $this->ProcesarComerciantes();
    }
  }

  public function ColocaValorValores(array $AValores)
	{
    $this->Valores = $AValores;
	}
}