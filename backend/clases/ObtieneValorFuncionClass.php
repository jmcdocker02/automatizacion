<?php
require_once("../clases/conexionClass.php");

class TObtieneValorFuncion extends TConexion
{
 
	public  $funcion="";

 function __construct()
	{
		parent::__construct();
	}

	private function ArmaQuery()
	{
		$this->query = "select {$this->funcion}(";
  $coma = "";
		for ($i=0; $i < count($this->parametros); $i++) {
			$this->query .= "{$coma}?";
   $coma = ",";
		}
		$this->query .= ") as valor"; 
	}

 public function AsignaFuncion(string $AFuncion)
 {
  $this->funcion = $AFuncion;
 }

	public function ObtieneValorFuncion()
	{
		$this->ArmaQuery();
		$resulSet = $this->ObtieneResulSet();
		return $resulSet; 
	}

	public function VerQuery()
	{
		$this->ArmaQuery();
		return (object)array('query' => $this->query);
	}
}
