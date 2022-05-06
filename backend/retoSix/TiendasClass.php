<?php
  require_once("../clases/ImportarExcelClass.php");
class Tiendas extends ImportarExcel
{
	 
 private $Valores = [];
 private $Errores = [];
 private $tiendasActualizadas = 0;
 private $tiendasAgregadas = 0;
 private $tiendasError = 0;

  /* Declaraciones privadas */
  private function ActualizaTienda(int $ALinea)
  {
    $this->ObtieneSentenciaUpdate();
    $this->AsignaParametros($this->ObtieneParametros(1,1));
    $resultado = $this->EjecutaSentencia(); 
   if (isset($resultado->error)) {
    $this->Errores[] = "{$resultado->error} Linea:{$ALinea}";
    $this->tiendasError++;
  }else{
    $this->tiendasActualizadas++;
  }  
}

  private function AgregaTienda(int $ALinea)
  {
    $this->ObtieneSentenciaInsert();
    $this->AsignaParametros($this->ObtieneParametros(1,0));
    $resultado = $this->EjecutaSentenciaInsert();
    if (isset($resultado->error)) {
      $this->Errores[] = "Error: {$resultado->error} Linea: {$ALinea}";
      $this->tiendasError++;
    }else{
     $this->tiendasAgregadas++; 
    }  
  }

  private function ExisteTienda()
  {
    $this->query = "select 
     pruebas_RetoSixV6.cat_tiendas.id_tienda 
     from pruebas_RetoSixV6.cat_tiendas 
     where  num_tienda={$this->linea[1]}";
    $resultado = $this->conexion->prepare($this->query);
    $resultado->execute();
    $resultSet = $resultado->fetch();
    return $resultSet;
  }

   function ObtieneSentenciaInsert()
  {
    $this->query = "insert into pruebas_RetoSixV6.cat_tiendas (
      cat_tiendas.num_tienda, 
      cat_tiendas.nom_tienda, 
      cat_tiendas.target, 
      cat_tiendas.dr, 
      cat_tiendas.gz, 
      cat_tiendas.ofv,
      cat_tiendas.pos,
      cat_tiendas.estatus)
      values (?,?,?,?,?,?,?,?)";
  } 

  function ObtieneSentenciaUpdate()
  {
    $this->query = "update pruebas_RetoSixV6.cat_tiendas set
      cat_tiendas.nom_tienda = ?, 
      cat_tiendas.target = ?, 
      cat_tiendas.dr = ?, 
      cat_tiendas.gz = ?, 
      cat_tiendas.ofv = ?, 
      cat_tiendas.pos = ?, 
      cat_tiendas.estatus = ? 
      where cat_tiendas.num_tienda = ?";
  }

  private function ProcesarTiendas()
  {
		try {
     $this->InicializaGuardado(); 
     $i=0;
     foreach ($this->Valores as $linea) {
      $i++;
      $this->linea = $linea; 
      $this->linea[21] = ($this->linea[21]=='No')?0:1;
      if($this->ExisteTienda() == true){
       $this->ActualizaTienda($i); 
      }else{
       $this->AgregaTienda($i);
     }
    }
    $this->AceptaTransaccion();
    $datos = array(
      "errores" => $this->Errores,
       "resultado"=>"Tiendas Agregadas: {$this->tiendasAgregadas} 
         Tiendas Actualizadas {$this->tiendasActualizadas} 
         Tiendas con Errores {$this->tiendasError}"
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
  public function ActualizaTiendas()
  {
    $this->ValidaDatos();
  	if(count($this->Errores)>0){
     return $this->Errores;
  	}else{
     return $this->ProcesarTiendas();
	  }
  }

  public function ColocaValorValores(array $AValores)
	{
    $this->Valores = $AValores;
	}
}