<?php
require_once("../clases/conexionClass.php");

class TEliminaRegistro extends TConexion
{
  
	function __construct(){
		parent::__construct();
	}
 
 public function ArmaQuery()
 {
  $result = "delete from {$this->tabla} where ";
		$coma = "";
		for ($i = 1; $i<=$this->llave; $i++) {
			$result .= $coma . $this->prefijo . substr('0' . $i, -2)." = ?";
			$coma = " and ";
		}
  $this->AsignaQuery($result);
	}

	public function EliminaRegistro()
	{
		try {
 		$this->ArmaQuery();
			return $this->EjecutaSentenciaDelete();
		} catch (Exception $e) {
			return (object)array("error", $e->getMessage());
		}	
 }

public function ObtieneVariables()
	{
		$this->campos = $this->ObtieneRequest("campos", "*");
		$this->distinct = intval($this->ObtieneRequest("distinct", "0"));
		$this->inner = $this->ObtieneRequest("inner", "");
		$this->order = $this->ObtieneRequest("order", "");
		$this->tabla = $this->ObtieneRequest("tabla", "");
		$this->where = $this->ObtieneRequest("condicion", "");
		$this->parametros = explode(",",$this->ObtieneRequest("parametros","0"));
		$this->llave = $this->ObtieneRequest("llave", "0");
		$this->prefijo = $this->ObtieneRequest("prefijo", "");
	}

 public function VerQuery(){
	 $this->ArmaQuery();
	 return (object)array('query' => $this->query);
	}

}