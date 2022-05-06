<?php
require_once("../clases/conexionClass.php");

class TObtieneDatosTabla  extends TConexion
{

 public function ArmaQuery(){
		$distinct = $this->distinct == true ? "distinct" : "";
		$this->query = "select {$distinct}
			 {$this->campos}
				from {$this->tabla}
    {$this->inner}
				{$this->where}	
				{$this->order}			
			";		
	}

	public function ArmaQueryRegistro()
	{
		$where = "where ";
		$coma = "";
		for ($i = 1; $i <= $this->llave; $i++) {
			$where .= $coma . $this->prefijo . substr('0' . $i, -2) . " = ?";
			$coma = " and ";
		}
		$this->AsignaWhere($where);
		$this->ArmaQuery();
	}

	public function LimpiaVariables()
	{
		$this->campos = "*";
		$this->distinct = "";
		$this->inner = "";
		$this->order = "";
		$this->tabla = "";
		$this->where = "";
		$this->parametros = [];
	}

	public function ObtieneDatosTabla()
	{
		$this->ArmaQuery();
        $result = $this->ObtieneResulSet();
		if (isset($result->error)) {
			return $result;
		} else {
		 return $this->ObtieneRegistros($result);
		}
 } 

	public function ObtieneDatosTablaAsociativo()
	{
		$this->ArmaQuery();
		$result =	$this->ObtieneResulSetAsociativo();
		if (isset($result->error)) {
		 return $result;
		} else {
		 return $this->ObtieneRegistros($result);
		}
	}

	public function ObtieneRegistroTabla()
	{
		$this->ArmaQueryRegistro();
		$result = $this->ObtieneRegistro();
		if (isset($result->error)) {
			return $result;
		} else {
	 	return $this->ObtieneDatosRegistro($result);
		}
	}

	public function ObtieneVariables()
	{
		$this->campos = $this->ObtieneRequest("campos", "*");
		$this->distinct = intval($this->ObtieneRequest("distinct", "0"));
		$this->inner = $this->ObtieneRequest("union", "");
		$this->order = $this->ObtieneRequest("order", "");
		$this->tabla = $this->ObtieneRequest("tabla", "");
		$this->where = $this->ObtieneRequest("condicion", "");
		$this->parametros = explode(",",$this->ObtieneRequest("parametros","0"));
	}

 public function VerQuery(){
		$this->ArmaQuery();
		return (object)array('query' => $this->query);
	}

}
