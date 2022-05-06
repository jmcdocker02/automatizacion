<?php
 require_once("../clases/funcionesClass.php");

 abstract class TConexion extends TFunciones
 {

   private $host = "decode.cwuio3rpvqnp.us-east-1.rds.amazonaws.com";
   private $usuario = "decodedba";
   private $passwd = "VMWEbNDUUCFK4xj8VHXX";
   private $schema = "automatizacion"; 

//  private $host = "192.168.3.108";
//  private $usuario = "root";
//  private $passwd = "20CfdI11";
//  private $schema = "automatizacion";

  private $firme = true;
  public $conexion;
  public $campos = "*";
  public $distinct = "";
  public $inner = "";
  public $llave;
  public $numeroCampos = 0;
  public $order = "";
  public $parametros = [];
  public $prefijo = "";
  public $query = "";
  public $sentencias = [];
  public $tabla = "";
  public $where = ""; 
	
  function __construct()
  {
   parent::__construct();
  }

  public function AsignaCampos(string $ACampos)
  {
   $this->campos = $ACampos;
  }

  public function AsignaDistinct(bool $ADistinct)
  {
   if($ADistinct){
    $this->distinct = "distinct";
   }else{
	$this->distinct = "";
   }
  }

   public function AsignaInner(string $AInner)
   { 
	$this->inner = $AInner;
   }

	public function AsignaLlave(int $ALlave)
	{
		$this->llave = $ALlave;
	}

 public function AsignaNumeroCampos(int $ANumeroCampos)
	{
		$this->numeroCampos = $ANumeroCampos;
	} 
	 public function AsignaOrder(string $AOrder)
	 {
	 	$this->order = $AOrder;
	 }

	 public function AsignaParametros(array $AParametros)
	 {
	 	$this->parametros = $AParametros;
	 }

	 public function AsignaPrefijo(string $APrefijo)
	 {
	 	$this->prefijo = $APrefijo;
	 }

		public function AsignaQuery(string $AQuery)
		{
			$this->query = $AQuery;
		}

  public function AsignaSentencias(array $ASentencias)
	 {
    $this->sentencias = $ASentencias;
 	} 

	 public function AsignaTabla(string $ATabla)
	 {
	 	$this->tabla = $ATabla;
	 }

	 public function AsignaWhere(string $AWhere)
	 {
	 	$this->where = $AWhere;
	 }

 	public function DestruyeConexion()
	 {
	  if($this->firme){
       unset($this->conexion);
	  }
	 }

  public function EstableceConexion() 
  {
  	try {
		  if($this->firme){
		 	$this->conexion = new PDO(
				 "mysql:host={$this->host};dbname={$this->schema}",
				 $this->usuario,
				 $this->passwd
			 );
		 	$this->conexion->setAttribute(PDO::MYSQL_ATTR_LOCAL_INFILE, 1);
			$this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					return true;
		  }
		 } catch (PDOException $e) {
		 	return (object)array("error" => 'conexion '.$e->getMessage());
		 }
  }
  
  public function InicializaGuardado()
	{
		$this->EstableceConexion();
		$this->InicializaTransaccion();
	} 

		public function InicializaTransaccion()
		{
  		 $this->conexion->beginTransaction();
		 $this->firme = false;
		}

  public function ObtieneRegistro()
	 {
		 try {
  	 	 $this->EstableceConexion();
		 	$resultado = $this->conexion->prepare($this->query);
		 	$resultado->execute($this->parametros);
		 	$resultSet = $resultado->fetch();
		 	if ($resultSet == false) {
		 		return (object)array("error" => "No se localizaron datos ");
		 	} else {
		 		return $resultSet;
		 	}
		 } catch (PDOException $e) {
		 	return (object)array("error" => $e->getMessage());
	 	} finally {
			 $this->DestruyeConexion();
		 }
 	}  

  public function ObtieneResulSet() 
  {
 	if ($this->EstableceConexion()) {
	  try {
		  $resultado = $this->conexion->prepare($this->query);
		  $resultado->execute($this->parametros);
		  $resultSet = $resultado->fetchAll(); 
    if( $resultSet==false){
      return (object)array("error" => "No se localizaron datos ");
	   }else{
		  	return $resultSet;
		  }
	  } catch	(PDOException $e) {
		  return (object)array("error"=>$e->getMessage());
  	} finally {
			 $this->DestruyeConexion();
		 }
	 	}else{
				return false;
			}
  }

	public function ObtieneResulSetAsociativo()
	{
		try {
			$this->EstableceConexion();
			$resultado = $this->conexion->prepare($this->query);
			$resultado->execute($this->parametros);
			$resultSet = $resultado->fetchAll(PDO::FETCH_ASSOC);
			if ($resultSet == false) {
				return (object)array("error" => "No se localizaron datos ");
			} else {
				return $resultSet;
			}
		} catch (PDOException $e) {
			return (object)array("error" => $e->getMessage());
		} finally {
			$this->DestruyeConexion();
		}
	}

  public function EjecutaSentencia()
  {
			try {
			 $pst = $this->conexion->prepare($this->query);
             $pst->execute($this->parametros);
             //if($this->llave==1){
             // $id = count($this->parametros)-1;
 			 // return(object)array("resultado" => "Solicitud procesada Correctamente","id"=>$this->parametros[$id]);
             //}else{
	 		 // return(object)array("resultado" => "Solicitud procesada Correctamente");
            //};
			return  $pst;
  	} catch (PDOException $e){
 			return  (object)array("error" => $e->getMessage());
			}	
  }

 public function EjecutaSentenciaDelete()
  {
   try {
    $this->EstableceConexion();
	$pst = $this->conexion->prepare($this->query);
    $pst->execute($this->parametros);
	return(object)array("resultado" => "Solicitud procesada Correctamente ");
   } catch (PDOException $e){
	return  (object)array("error" => $e->getMessage());
   }	
  }


	public function EjecutaSentenciaInsert()
	{
		try {
			$result = $this->conexion->prepare($this->query);
			 $i = 0;	
			 $result->execute($this->parametros);
		  return (object)array("resultado" => "Registro Guardado Correctamente", "id" => $this->conexion->lastInsertId());
		} catch (PDOException $e) {
			return  (object)array("error" => $e->getMessage());
		}
	}

 public function AceptaTransaccion()
	{
		$this->conexion->commit();
		$this->firme = true;
 }

 public function ObtieneBaseDatos(int $AIdBase)
 {
  return $this->ObtieneValorCampo(
   "menus",
   "men04",
   "where men01 = ?",
   array($AIdBase)
  );	 
 }
 public function ObtieneFormulario($idFormulario)
	{
		$this->AsignaTabla("formularios");
		$this->AsignaInner("inner join menus on (formularios.for02 = menus.men01)");
		$this->AsignaWhere("where for01 = ?");
		$this->AsignaParametros(array($idFormulario));
		$this->AsignaQuery("select  {$this->campos} from {$this->tabla}	{$this->inner}	{$this->where}"	);
		return $this->ObtieneRegistro();
	}

	public function ObtieneValorCampo(string $ATabla, string $ACampo, string $ACondicion, array $AParametros)
	{
		$this->query = "select {$ACampo} from {$ATabla} {$ACondicion}";
		$this->AsignaParametros($AParametros);	 
		$registro = $this->ObtieneRegistro();
		return (isset($registro->error)) ? $registro->error : $registro[$ACampo];
	}

    public function ObtieneHoraActual()
    {
      $this->query = "select time(now()) as hora";
	  $registro = $this->ObtieneRegistro();
	  return (isset($registro->error)) ? $registro : $registro["hora"];
    }
	public function RechazaTransaccion()
	{
		$this->conexion->rollBack();
		$this->firme = true;
	}

	public function ValidarUsuario()
	{
		$datos = "";
		if ($this->ObtieneToken() == "") {
			$datos = "No existe token ";
		} else {
			$this->DecodificarToken();
			if (strlen($this->ObtieneErrorToken()) > 0) {
				$datos = $this->ObtieneErrorToken();
			} else {
				$this->AsignaQuery("select LoginUsuario(?,?) as id");
				$this->AsignaParametros(array($this->ObtieneClaveUsuario(), $this->ObtienePwd()));
				$resultado = $this->ObtieneResulSet();
				if (isset($resultado->error)) {
					$datos = $resultado->error;
				} else {
					$datos = ($resultado[0]["id"] == $this->ObtieneIdUsuario()) ? "" : "Error en Credenciales $resultado[0]['id'] $this->ObtieneIdUsuario()";
				}
			}
		}
		return $datos;
	}


}

