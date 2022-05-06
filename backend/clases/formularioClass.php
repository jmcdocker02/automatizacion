<?php

use JetBrains\PhpStorm\Internal\ReturnTypeContract;

 require_once("../clases/funcionesClass.php");
 require_once("../clases/guardaDatosTablaClass.php");
 require_once("../clases/obtieneDatosTablaClass.php");
 require_once("../clases/EliminaRegistroClass.php");

 class TFormulario extends TFunciones
 {
 
  private $idFormulario = 0;
  private $idCatalogo = 0;
  private $idTabla = "";
  private $fechaInicio = "";
  private $fechaFin = "";
  private $valores = [];
  private $lastInsertId = 0;
  
  function __construct()
  {
   parent::__construct();
  }

/**
* Declaraciones Privadas
*/

  private function ObtieneCondicionFiltrado()
  {
   $resultado = "";
   $filtros = $this->ObtieneFiltros(1,$this->idFormulario);
   $and = "";
   if (!isset($filtros["error"])) {
    foreach ($filtros as $linea) {
     $campo = $linea["fil09"];
	 $valor = $this->ObtieneRequest($campo,"");
	 $resultado .= ($valor == "") ? "" : "{$and} {$campo} = '{$valor}'";
	 $and = " and ";			
	} 
   }
   $filtros = $this->ObtieneFiltros(3,$this->idFormulario);
   if (!isset($filtros["error"])) {
	foreach ($filtros as $linea) {
 	 $campo = $linea["fil09"];
	 $valor = "'{$this->fechaInicio}' and '{$this->fechaFin}'";
	 $resultado .= ($valor == "") ? "" : "{$and} {$campo} between {$valor}";
	 $and = " and ";
	}
   }
   return $resultado;	
  }

  private function ObtieneValoresActualizar(int $campos,int $llave, string $prefijo)
  {
   $valores = [];
   for ($i = $llave+1; $i <= $campos; $i++) {
	$campo = $prefijo . substr('0' . $i, -2);
    $valores  [] = $this->valores[$campo];
   }
   for ($i = 1; $i <= $llave; $i++) {
	$campo = $prefijo . substr('0' . $i, -2);
	$valores[] = $this->valores[$campo];
   }
   return $valores;
  }
   
  private function ObtieneValoresGuardar(int $campos, string $prefijo)
  {
   $valores = [];
   for ($i=1; $i <=$campos ; $i++) { 
    $campo = $prefijo.substr('0'.$i,-2);
    $valores[] = $this->valores[$campo];
   }
   return $valores;
  }

/**
* Declaraciones publicas
*/

  public function ActualizarDatosFormulario()
  {
   $datos = [];
   $GuardarDatos = new TGuardarDatos;
   $elementos = count($this->valores);
   if ($elementos < 2) {
    $datos["error"] = array("error" => "Tiene que Indicar al menos dos campos");
   } else {
    $formulario = $GuardarDatos->ObtieneFormulario($this->idFormulario);
	 if (isset($formulario->error)) {
     $datos["error"] = $formulario;
	 } else {
	  $parametros = $this->ObtieneValoresActualizar($formulario["for08"],$formulario["for09"], $formulario["for10"]);
 	  $GuardarDatos->AsignaNumeroCampos($formulario["for08"]);
	  $GuardarDatos->InicializaGuardado();
	  $GuardarDatos->AsignaTabla($formulario["for06"]);
	  $GuardarDatos->AsignaPrefijo($formulario["for10"]);
	  $GuardarDatos->AsignaLlave($formulario["for09"]);
	  $GuardarDatos->AsignaParametros($parametros);
  	  $resulSet = $GuardarDatos->ActualizaRegistro();
	  if (isset($resulSet->error)) {
	   $datos["error"] = $resulSet;
	   $GuardarDatos->RechazaTransaccion();
	  } else {
	   $GuardarDatos->AceptaTransaccion();
	   $datos["resultado"] = (object)array("resultado" => "Datos Actualizados Correctamente");
	  }
	 }
   }
   return $datos;
  }

  public function AsignaFechaInicio($AFechaInicio)
  {
   $this->fechaInicio = $AFechaInicio;
  }
	
  public function AsignaFechaFin($AFechaFin)
  {
   $this->fechaFin = $AFechaFin;
  }

  public function AsignaIdCatalogo($AIdCatalogo)
  {
	$this->idCatalogo = $AIdCatalogo;
  }

  public function AsignaIdFormulario($AIdFormulario)
  {
   $this->idFormulario = $AIdFormulario;
  }

  public function AsignaIdTabla($AIdTabla)
  {
   $this->idTabla = $AIdTabla;
  }

  public function AsignaValores($AValores)
  {
   $this->valores = $AValores;
  }

  public function EliminaRegistroFormulario()
  {
   $datos = [];
   $Eliminar = new TEliminaRegistro;
   if ($this->idTabla == "") {
	 $datos["error"] = (object)array("error" => "Tienes que indicar: id a eliminar");
   } else {
	 $formulario = $Eliminar->ObtieneFormulario($this->idFormulario);
	 if (isset($formulario->error)) {
	  $datos["error"] = $formulario;
	 } else {
 	  $parametros = explode(",",$this->idTabla);
 	  $Eliminar->AsignaTabla($formulario["for06"]);
	  $Eliminar->AsignaPrefijo($formulario["for10"]);
	  $Eliminar->AsignaLlave($formulario["for09"]);
 	  $Eliminar->AsignaParametros($parametros);
	  $resultado = $Eliminar->EliminaRegistro();
	  if (isset($resultado->error)) {
	   $datos["error"] = $resultado;
	  } else {
	   $datos["resultado"] = (object)array("resultado" => "Registro eliminado correctamente");
	  }
 	 }
   }
   return $datos;
  }

  public function GuardarDatosFormulario()
  {

   $datos = [];
   $GuardarDatos = new TGuardarDatos;
   $elementos = count($this->valores);
   if ($elementos < 1) {
 	$datos["error"] = array("error" => "Tiene que indicar mas de un campo");
   } else {
	 $formulario = $GuardarDatos->ObtieneFormulario($this->idFormulario);
	 if (isset($formulario->error)) {
 	  $datos["error"] = $formulario;
	 } else {
 	  $parametros = $this->ObtieneValoresGuardar($formulario["for08"],$formulario["for10"]);
	  $GuardarDatos->InicializaGuardado();
	  $GuardarDatos->AsignaTabla($formulario["for06"]);
	  $GuardarDatos->AsignaPrefijo($formulario["for10"]);
	  $GuardarDatos->AsignaLlave($formulario["for09"]);
	  $GuardarDatos->AsignaNumeroCampos($formulario["for08"]);
	  $GuardarDatos->AsignaParametros($parametros);
	  $resulSet = $GuardarDatos->AgregaRegistro();
	  if (isset($resulSet->error)) {
	   $datos["error"] = $resulSet;
	   $GuardarDatos->RechazaTransaccion();
	  } else {
	   $GuardarDatos->AceptaTransaccion();
     $this->lastInsertId = $resulSet->id;
	   $datos["resultado"] = (object)array("resultado" => "Datos Guardados Correctamente","id" => $this->lastInsertId);
	  }
    }
   }
   return $datos;
  }	

  public function ObtieneDatosCatalogo()
  {
   $DatosTabla = new TObtieneDatosTabla;
   $DatosTabla->AsignaTabla("formularios");
   $DatosTabla->AsignaWhere("where for01 = ? ");
   $DatosTabla->AsignaParametros(array($this->idCatalogo));
   $registros = $DatosTabla->ObtieneDatosTablaAsociativo();
   if (!isset($registros->error)) {
	$DatosTabla = new TObtieneDatosTabla;
	for ($i = 0; $i < count($registros); $i++) {
	 $tabla = $registros[$i]["for06"];
	 $DatosTabla->AsignaTabla($tabla);
	 $DatosTabla->AsignaCampos($registros[$i]['for11'] . "," . $registros[$i]['for12']);
	 if(strlen($registros[$i]["for13"])>0){
	  $DatosTabla->AsignaWhere("where {$registros[$i]["for13"]} = {$this->idEmpresa}");
	 }
	 $DatosTabla->AsignaOrder(" order by {$registros[$i]['for12']}");
	 $registros[$i][$tabla] = $DatosTabla->ObtieneDatosTablaAsociativo();
	}
   }
   return  $registros;
  }

  public function ObtieneDatosFormulario()
  {
   $datos = [];
   $DatosTabla = new TObtieneDatosTabla;
   if ($this->idFormulario == 0) {
    $datos["error"] = array("error" => "Tiene que Indicar el Formulario");
   } else {
	$formulario = $DatosTabla->ObtieneFormulario($this->idFormulario);
	if (isset($formulario->error)) {
	 $datos["error"] = $formulario;
	} else {
	 $datos['formulario'] = $formulario;
 	 $where = $this->ObtieneCondicionFiltrado();
	 if(strlen($formulario["for13"])>0){
 	  $where .= (strlen($where) > 0) ? " and " : ""; 
	  $where .= " {$formulario["for13"]} = {$this->idEmpresa} ";
	 }
	 $DatosTabla->LimpiaVariables();
	 $tabla = (strlen($formulario["for07"]) > 0) ? $formulario["for07"] : $formulario["for06"];
	 $DatosTabla->AsignaTabla($tabla);
	 if(strlen($where)>0){$DatosTabla->AsignaWhere("where {$where}");};   
 	 $registros = $DatosTabla->ObtieneDatosTabla();
	 $datos['registros'] = $registros;
	 $datos['titulos'] =	$this->ObtieneColumnasFormulario($this->idFormulario);
	 $registros = $this->ObtieneBotones(2,$this->idFormulario);
	 if (isset($registros->error)) {
	  $datos["error"] = $registros;
	 } else {
	  $datos['botones'] = $registros;
	 }
	}
   }		
   return $datos;
  }

  public function ObtieneIdCatalogo()
  {
   return $this->idCatalogo;
  }

  public function ObtieneIdFormulario()
  {
   return $this->idFormulario;
  }

  public function ObtieneIdTabla()
  {
   return $this->idTabla;
  }

  public function ObtieneLastInsertId(){
    return $this->lastInsertId;
  }

  public function ObtieneValores()
  {
   return $this->valores;
  }

  public function ObtieneDatosRegistroFormulario()
  {
   $datos = [];
   $DatosTabla = new TObtieneDatosTabla;
   if ($this->idTabla == "") {
  	$datos["error"] = array("error" => "Tiene que Indicar el id a consultar");
   } else {
 	$formulario = $DatosTabla->ObtieneFormulario($this->idFormulario);
 	if (isset($formulario->error)) {
  	 $datos["error"] = $formulario;
	} else {
	 $parametros = explode(",", $this->idTabla);
 	 $DatosTabla->LimpiaVariables();
	 $DatosTabla->AsignaTabla($formulario["for06"]);
	 $DatosTabla->AsignaPrefijo($formulario["for10"]);
	 $DatosTabla->AsignaLlave($formulario["for09"]);
	 $DatosTabla->AsignaParametros($parametros);
 	 $registro = $DatosTabla->ObtieneRegistroTabla();
	 $datos['registro'] = $registro;
  	}
   }
   return $datos;
  }

  public function ValidarUsuario()
  {
   $DatosTabla = new TObtieneDatosTabla;
   $DatosTabla->AsignaToken($this->ObtieneToken());  
   $usuario = $DatosTabla->ValidarUsuario();
   $this->AsignaIdUsuario($DatosTabla->ObtieneIdUsuario());
   $this->AsignaClaveUsuario($DatosTabla->ObtieneClaveUsuario());
   $this->AsignaPwd($DatosTabla->ObtienePwd());
   return $usuario;
  }

}