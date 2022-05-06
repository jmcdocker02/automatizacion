<?php
require_once("../clases/formularioClass.php");


class TUsuarios extends TFormulario
{

    private $idMenu = 0;
    private $emp01 = 0;

    function __construct()
 	{
	 	parent::__construct();
    }
    /*
    *   Declaraciones privadas
    */

     private function ObtieneRegistrosPermisos($ADatosTabla)
	{
		$ADatosTabla->ArmaQuery();
        $result = $ADatosTabla->ObtieneResulSet();
		if (isset($result->error)) {
			return $result;
		} else {
            $registros = [];
            $i = 0;
            foreach ($result as $linea) {
                $registro = [];
                $registro = array(
                    "for01"=>$linea["for01"],
                    "for03"=>$linea["for04"],
                    "per03"=>$linea["per03"]
                );
                $registros[$i] = $registro;
                $i++;
            }
            return $registros;
		}
    }

    private function ObtieneRegistrosUsuarios($ADatosTabla)
	{
		$ADatosTabla->ArmaQuery();
        $result = $ADatosTabla->ObtieneResulSet();
		if (isset($result->error)) {
			return $result;
		} else {
            $registros = [];
            $i = 0;
            foreach ($result as $linea) {
                $registro = [];
            
                $registro = array(
                    "usu01"=>$linea["usu01"],
                    "usu02"=>$linea["usu02"],
                    "usu04"=>$linea["usu04"],
                    "usu05"=>$linea["usu05"],
                    "usu06"=>$linea["usu06"]
                );
                
                $registros[$i] = $registro;
                $i++;
            }
            return $registros;
		}
    }

    private function ObtieneRegistroUsuario($ADatosTabla)
	{
		$ADatosTabla->ArmaQueryRegistro();
		$result = $ADatosTabla->ObtieneRegistro();
		if (isset($result->error)) {
			return $result;
		} else {
            $registro = [];
            $registro = array(
                "usu01"=>$result["usu01"],
                "usu02"=>$result["usu02"],
                "usu04"=>$result["usu04"],
                "usu05"=>$result["usu05"],
                "usu06"=>$result["usu06"]
            );
            return $registro;
		}
	}
    private function ObtieneValoresActualizar()
 	{
      $valores = $this->ObtieneValores();
      $parametros = array(
       $valores["usu02"],
       $valores["usu04"],
       $valores["usu05"],
       $valores["usu06"],
       $valores["usu01"],
      );
      return $parametros;
    }

    private function ObtieneValoresGuardar()
		{
	       $valores = $this->ObtieneValores();
           $parametros = array(
            $valores["usu01"],
            $valores["usu02"],
            "",
            $valores["usu04"],
            $valores["usu05"],
            $valores["usu06"],
            ""
           );
           return $parametros;
		}
    /*
    *   Declaraciones publicas
    */
    public function ActualizarDatosUsuarios()
    {
        $datos = [];
        $valores = $this->ObtieneValores();
        $GuardarDatos = new TGuardarDatos;
 	 	$elementos = count($valores);
	 	if ($elementos < 2) {
	 		$datos["error"] = array("error" => "Tiene que Indicar al menos dos campos");
	 	} else {
  		 $GuardarDatos->InicializaGuardado();
	 	 $GuardarDatos->AsignaQuery("update usuarios set 
          usuarios.usu02 = ?, 
          usuarios.usu04 = ?,
          usuarios.usu05 = ?,
          usuarios.usu06 = ?
          where usu01 = ?
         ");
         $GuardarDatos->AsignaParametros($this->ObtieneValoresActualizar());
         $resulSet = $GuardarDatos->EjecutaActualizacion();
 		 if (isset($resulSet->error)) {
		  $datos["error"] = $resulSet;
		  $GuardarDatos->RechazaTransaccion();
		 } else {
          $GuardarDatos->AceptaTransaccion();
          $datos["resultado"] = (object)array("resultado" => "Datos Actualizados Correctamente");
	     }
		}
        return $datos;
    }

    public function ActualizaPermisos()
    {
      $datos = [];
	  $GuardarDatos = new TGuardarDatos;
      $valores = $this->ObtieneValores();
      $GuardarDatos->InicializaGuardado();
      $GuardarDatos->AsignaQuery("delete from ".$GuardarDatos->ObtieneBaseDatos(1).".permisos".
      " where permisos.per01 = ? and permisos.per02 = ? and permisos.per03 in ( ".
      " select formularios.for01 from formularios where for02 = ? )");  
      $GuardarDatos->AsignaParametros(array($this->emp01,$this->ObtieneIdCatalogo(),$this->idMenu));
      $resultado = $GuardarDatos->EjecutaSentenciaDelete();         
      if (isset($resultado->error)) {
       $datos["error"] = $resultado;
      } else {
       if(isset($valores["checkBox"])){
        foreach ($valores["checkBox"] as $value) {
         $GuardarDatos->AsignaQuery("insert into ".$GuardarDatos->ObtieneBaseDatos(1).".permisos".
          " select ?,?,?,acc01 from ".$GuardarDatos->ObtieneBaseDatos(1).".acciones".
          " where acciones.acc02 = ?");  
         $GuardarDatos->AsignaParametros(array($this->emp01,$this->ObtieneIdCatalogo(),$value,$value));
         $resulSet = $GuardarDatos->EjecutaSentenciaInsert();
  	      if (isset($resulSet->error)) {
 	 	   $datos["error"] = $resulSet;
             break;
 	 	   }
          }             
         }
       } 
        if(isset($datos["error"])){
         $GuardarDatos->RechazaTransaccion();
        }else{
         $GuardarDatos->AceptaTransaccion();
         $datos["resultado"]=Array("resultado"=>"Accesos Guardados Satisfactoriamente");
        } 
      return $datos;
        
    }

    public function AsignaEmp01(int $AEmp01)
    {
     $this->emp01 = $AEmp01;
    }
  
    public function AsignaIdMenu(int $AIdMenu)
    {
     $this->idMenu = $AIdMenu;
    }

    public function GuardarDatosUsuarios()
    {
        $datos = [];
        $GuardarDatos = new TGuardarDatos;
        $valores = $this->ObtieneValores();
        $elementos = count($valores);
        if ($elementos < 1) {
            $datos["error"] = array("error" => "Tiene que indicar mas de un campo");
        } else {
         $GuardarDatos->InicializaGuardado();
         $GuardarDatos->AsignaQuery("insert into usuarios values (?,?,?,?,?,?,?)");
         $GuardarDatos->AsignaParametros($this->ObtieneValoresGuardar());
         $resulSet = $GuardarDatos->EjecutaInsercion();
         if (isset($resulSet->error)) {
          $datos["error"] = $resulSet;
          $GuardarDatos->RechazaTransaccion();
         } else {
          $GuardarDatos->AceptaTransaccion();
          $datos["resultado"] = (object)array("resultado" => "Datos Actualizados Correctamente");
         }
        }
        return $datos;   
    }

    public function ObtieneDatosUsuarios()
    {
        $datos = [];
	 	$DatosTabla = new TObtieneDatosTabla;
        $idFormulario = $this->ObtieneIdFormulario();
 		if ($idFormulario == 0) {
	 		$datos["error"] = array("error" => "Tiene que Indicar el Formulario");
	 	} else {
	 		$formulario = $DatosTabla->ObtieneFormulario($idFormulario);
	 		if (isset($formulario->error)) {
		 		$datos["error"] = $formulario;
		 	} else {
			 	$datos['formulario'] = $formulario;
			 	$DatosTabla->LimpiaVariables(); 
                $tabla = (strlen($formulario["for07"]) > 0) ? $formulario["for07"] : $formulario["for06"];
			 	$DatosTabla->AsignaTabla($tabla);
                $registros = $this->ObtieneRegistrosUsuarios($DatosTabla);
                $datos['registros'] = $registros;
                $datos['titulos'] =	$this->ObtieneColumnasFormulario($idFormulario);
                $registros = $this->ObtieneBotones(2,$idFormulario);
                if (isset($registros->error)) {
                    $datos["error"] = $registros;
                } else {
                    $datos['botones'] = $registros;
                }
            }
        }		
        return $datos;  
    }

    public function ObtieneDatosRegistroUsuarios()
    {
        $datos = [];
        $DatosTabla = new TObtieneDatosTabla;
        $idFormulario = $this->ObtieneIdFormulario();
        $idTabla = $this->ObtieneIdTabla();
        if ($idTabla == "") {
            $datos["error"] = array("error" => "Tiene que Indicar el id a consultar");
        } else {
            $formulario = $DatosTabla->ObtieneFormulario($idFormulario);
            if (isset($formulario->error)) {
                $datos["error"] = $formulario;
            } else {
                $parametros = explode(",", $idTabla);
                $DatosTabla->LimpiaVariables();
                $DatosTabla->AsignaTabla($formulario["for06"]);
                $DatosTabla->AsignaPrefijo($formulario["for10"]);
                $DatosTabla->AsignaLlave($formulario["for09"]);
                $DatosTabla->AsignaParametros($parametros);
                $registro = $this->ObtieneRegistroUsuario($DatosTabla);
                $datos['registro'] = $registro;
            }
        }
        return $datos;
    }

    public function ObtienePermisos()
    {
     $datos = [];
	 $DatosTabla = new TObtieneDatosTabla;
     $DatosTabla->LimpiaVariables(); 
     $DatosTabla->AsignaDistinct(true);
     $DatosTabla->AsignaCampos("for01,for04,per03");
     $DatosTabla->AsignaTabla("formularios");
     $DatosTabla->AsignaInner("inner join acciones on (formularios.for01 = acciones.acc02) ".
     "left join permisos ON (permisos.per01=? and permisos.per02=? and permisos.per03=formularios.for01)");
     $DatosTabla->AsignaWhere("where  for02 = ? and length(for04)>0");
     $DatosTabla->AsignaParametros(array($this->emp01,$this->ObtieneIdCatalogo(),$this->idMenu));
     $registros = $this->ObtieneRegistrosPermisos($DatosTabla);
     $datos["query"]=$DatosTabla->query;
     $datos['registros'] = $registros;
     $datos['titulos'] =	$this->ObtieneColumnasFormulario($this->ObtieneIdFormulario());
     return $datos;  
    }

}