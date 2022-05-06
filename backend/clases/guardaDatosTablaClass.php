<?php
require_once("../clases/conexionClass.php");

class TGuardarDatos extends TConexion
{

	function __construct(){
		parent::__construct();
	}

	private $tipoGuardado=0;
	private  $funcion = "";

	public function Actualiza()
	{
		try {
			$this->AsignaQuery($this->ArmaSentenciaUpdate());
			$this->EstableceConexion();
			$this->InicializaTransaccion();
			$result = $this->EjecutaSentencia();
	 	$this->AceptaTransaccion();
			return $result;
		} catch (PDOException $e) {
			$this->RechazaTransaccion();
			return  (object)array("error" => $e->getMessage());
		} finally {
			$this->DestruyeConexion();
		}
	}

	public function ActualizaRegistro()
	{
		try {
			$this->AsignaQuery($this->ArmaSentenciaUpdate());
			return $this->EjecutaSentencia();
		} catch (Exception $e) {
			return (object)array("error", $e->getMessage());
		}
	}  


	public function Agrega()
	{
		try {
			$this->AsignaQuery($this->ArmaSentenciaInsert());
			$this->InicializaGuardado();
	 	    $result = $this->EjecutaSentenciaInsert();
			$this->AceptaTransaccion();
			return $result;
		} catch (PDOException $e) {
			$this->RechazaTransaccion();
			return  (object)array("error" => $e->getMessage());
		} finally {
			$this->DestruyeConexion();
		}
	}

    public function AgregaActualizaRegistro()
	{
		try {
			$this->AsignaQuery($this->ArmaSentenciaDuplicate());
			return $this->EjecutaSentencia();
		} catch (Exception $e) {
			return (object)array("error",$e->getMessage());
		}
	}

	public function AgregaRegistro()
	{
		try {
			$this->AsignaQuery($this->ArmaSentenciaInsert());
			return $this->EjecutaSentenciaInsert();
		} catch (Exception $e) {
			return (object)array("error",$e->getMessage());
		}
	}

	private function ArmaQuery()
	{
		$this->query = "select {$this->funcion}(";
		$coma = "";
		for ($i = 0; $i < count($this->parametros); $i++) {
			$this->query .= "{$coma}?";
			$coma = ",";
		}
		$this->query .= ") as valor";
	}

	public function AsignaFuncion(string $AFuncion)
	{
		$this->funcion = $AFuncion;
	}

	public function ArmaSentenciaDuplicate()
	{
	 $result = $this->ArmaSentenciaInsert() . ' on duplicate key update ';
	 $coma = "";
	 for ($i = $this->llave + 1; $i <= $this->numeroCampos; $i++){
      $result .= $coma . $this->prefijo . substr('0' . $i, -2)." = ?";
      $coma = ",";
     }
	 return $result;
	}
 
	public function ArmaSentenciaInsert()
	{
		$result = "insert into {$this->tabla} (";
		$coma = "";
		for ($i = 1; $i <= $this->numeroCampos; $i++) {
			$result .= $coma . $this->prefijo . substr('0' . $i, -2);
			$coma = ",";
		}
		$result .= ") values (";
		$coma = "";
		for ($i = 1; $i <= $this->numeroCampos; $i++) {
			$result .= "{$coma}?";
			$coma = ",";
		}
		return "{$result}) ";
	}

	public function ArmaSentenciaUpdate()
	{
		$result = "update {$this->tabla} set ";
		$coma = "";
		for ($i = $this->llave + 1; $i <= $this->numeroCampos; $i++) {
			$result .= $coma . $this->prefijo . substr('0' . $i, -2)." = ?";
			$coma = ",";
		}
       $result .=" where ";
		$coma = "";
		for ($i = 1; $i<=$this->llave; $i++) {
			$result .= $coma . $this->prefijo . substr('0' . $i, -2)." = ? ";
			$coma = " and ";
		}
		return $result;
	}
 
	public function EjecutaActualizacion()
	{
		try {
			return $this->EjecutaSentencia();
		} catch (Exception $e) {
			return (object)array("error", $e->getMessage());
		}
	}  

	public function EjecutaInsercion()
	{
		try {
			return $this->EjecutaSentenciaInsert();
		} catch (Exception $e) {
			return (object)array("error", $e->getMessage());
		}
	}
 public function Guardar()
	{
		return ($this->tipoGuardado==0) ? $this->Agrega() : $this->Actualiza();		
	}


	public function ObtieneValorFuncion()
	{
		$this->ArmaQuery();
		try {
			$resultado = $this->conexion->prepare($this->query);
			$resultado->execute($this->parametros);
			$resultSet = $resultado->fetchAll();
			if ($resultSet == false) {
				return (object)array("error" => "No se localizaron datos ");
			} else {
				return $resultSet;
			}
		} catch (PDOException $e) {
			return (object)array("error" => $e->getMessage());
		}		
	}


	public function VerQuery()
	{
		$this->query = ($this->tipoGuardado == 0) ? $this->ArmaSentenciaInsert() : $this->ArmaSentenciaUpdate();
		return  (object)array('query' => $this->query);
	}

}