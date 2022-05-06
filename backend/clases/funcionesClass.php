<?php
 declare(strict_types=1);
 require_once("../clases/corsClass.php");
 require_once("../jwt/ExpiredException.php");
 require_once "../jwt/JWT.php";

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;

 abstract class TFunciones
 {


  private $claveUsuario = "";
  private $errorToken = "";
  private $idUsuario = 0;
  private $llavePrivada = "MDPCUSHR2K34LHBBOQWSJQ8";
  private $pwd = "";
  private $token = "";
  
  public $idEmpresa = 0;


  function __construct()
  {
//		
  }

  public function AsignaClaveUsuario(string $AClaveUsuario)
  {
   $this->claveUsuario = $AClaveUsuario;
  }

  public function AsignaErrorToken($AErrorToken){
    $this->errorToken = $AErrorToken;
  }

  public function AsignaIdEmpresa($AIdEmpresa)
  {
   $this->idEmpresa = $AIdEmpresa;
  }

  public function AsignaIdUsuario(int $AIdUsuario)
  {
   $this->idUsuario = $AIdUsuario;
  }

  public function AsignaPwd(string $pwd)
  {
   $this->pwd = $pwd;
  }

   public function AsignaToken($AToken)
   {
	$this->token = $AToken;
   }

   public function ContresenaSegura()
   {
	$caracteres=[];
	$caracteres[] = "0123456789";
	$caracteres[] = "!@#$%&*()_+,.;:";
	$caracteres[] = "abcdefghijklmnopqrstuvwxyz";
	$caracteres[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	$contrasena = "";
    for ($j=0; $j <4 ; $j++) { 
	 $contrasena .= substr(str_shuffle($caracteres[$j]),0,1);
	}
	$contrasena .= substr(str_shuffle($caracteres[0].$caracteres[3].$caracteres[2]),0,4);
    return str_shuffle($contrasena);
   }

   function Decodificar($encoded)
   { // <-- encoded string from the request
	$decoded = "";
	for ($i = 0; $i < strlen($encoded); $i++) {
	 $b = ord($encoded[$i]);
	 $a = $b ^ 123;  // <-- must be same number used to encode the character
	 $decoded .= chr($a);
	}
	return $decoded;
   }
	
   public function DecodificarToken()
   {
	try {
	 $datos = json_decode(json_encode(JWT::decode($this->token, $this->llavePrivada, array('HS256'))), true);
	 $this->claveUsuario = $datos["userData"]["clave"];
	 $this->pwd = $datos["userData"]["pwd"];
	 $this->idUsuario =		$datos["userData"]["id"];
//     $this->errorToken = "";
	} catch (Exception $e) {
	 $this->claveUsuario = 0;
	 $this->pwd ="xunox";
	 $this->errorToken = $e->getMessage();
	}
   }

   public function EnviaRespuesta(array $datos)
   {
	$datos['errorToken']=$this->errorToken;   
	if(strlen($this->errorToken)>0){
     $datos["token"]= $this->errorToken;
    }else{
  	 $this->GeneraToken();
	 $datos["token"]=$this->token;
	}
	$cors = new CorsAccessControl();
	$cors->send();
	header('Content-Type: application/json');
	echo json_encode($datos); 
   }

   public function GeneraToken()
   {
	$horaActual = time();
	$limite = $horaActual + 1800;
	$token = array(
	 'iat' => $horaActual, // Tiempo que inició el token
	 'exp' => $limite, // Tiempo que expirará el token (+1 hora)
	 'userData' => [ // información del usuario
	  'clave' => $this->claveUsuario,
	  'id' => $this->idUsuario,
	  'pwd' => $this->pwd,
	 ]
	);
	try {
     $this->token = @JWT::encode($token, $this->llavePrivada, 'HS256');
	 $this->errorToken = "";
	} catch (Exception $e) {
	 $this->errorToken = $e->getMessage();
	 $this->token = "";
	}
   }

   public function ObtieneBotones(int $ATipoBoton, int $AIdFormulario)
   {
/**
* 1=Obtener botones
* 2=Si no Existieran un arreglo en blanco
* 3=Obtener las importaciones
* 4=si existen las agrego al arreglo con el formato de acciones
* devolvera un arreglo vacio o con los botones
*/
	$datos = [];
	$DatosTabla = new TObtieneDatosTabla;
	$DatosTabla->AsignaTabla("acciones");
	$DatosTabla->AsignaInner("inner join iconos on acciones.acc05 = iconos.ico01");
	$DatosTabla->AsignaWhere("where acc02 = ? and acc06=?");
	$DatosTabla->AsignaParametros(array($AIdFormulario, $ATipoBoton));
	$registros = $DatosTabla->ObtieneDatosTablaAsociativo();
	if (!isset($registros->error)) {
     $datos = $registros;
	}
	if($ATipoBoton==1){
 	 $importaciones = $this->ObtieneImportaciones($AIdFormulario);
	 foreach($importaciones as $importacion){
	  $idImportacion = $importacion["imp01"];
      $textoBoton = $importacion["imp09"];
	  $datos[] = array(
	   "acc01"=> "0",
	   "acc02"=> $AIdFormulario,
	   "acc03"=> $textoBoton,
	   "acc04"=> "Importa los datos de un archivo de excel a una base de datos",
	   "acc05"=> "0",
	   "acc06"=> "1",
	   "acc07"=> "btn-primary",
	   "acc08"=> '{"0":{"atributo":"data-id-importacion","valor":'.$idImportacion.'}}',
	   "ico01"=> "0",
	   "ico02"=> "<i class=\"fas fa-file\"></i>",
	   "ico03"=> "f15b"
	  );
     }
	}
	return $datos;
   }	

   public function ObtieneClaveUsuario()
   {
	return $this->claveUsuario;
   }

   public function ObtieneColumnasFormulario(int $AIdFormulario)
   {
	$DatosTabla = new TObtieneDatosTabla;
	$DatosTabla->AsignaTabla("columnasformulario");
	$DatosTabla->AsignaWhere("where col01 = ?");
	$DatosTabla->AsignaParametros(array($AIdFormulario));
	$registros =	$DatosTabla->ObtieneDatosTablaAsociativo();
	if (!isset($registros->error)) {
 	 return $registros;
	} else {
	 return  json_decode(json_encode($registros), true);
	}
   }

   public function ObtieneErrorToken()
   { 
    return $this->errorToken;
   }

   function ObtieneFechaActual()
   {
	date_default_timezone_set('America/Mexico_City');
	setlocale(LC_TIME, 'es_MX.UTF-8');
	return date("Y-m-d");
   }

	public function ObtieneFiltros(int $ATipoFiltro, int $AIdFormulario)
	{
	 $DatosTabla = new TObtieneDatosTabla;
	 $DatosTabla->AsignaTabla("filtrosformulario");
	 $DatosTabla->AsignaInner("inner join formularios on (filtrosformulario.fil06 = formularios.for01)");
	 $DatosTabla->AsignaWhere("where fil02 = ? and fil03=?");
	 $DatosTabla->AsignaParametros(array($AIdFormulario, $ATipoFiltro));
	 $registros = $DatosTabla->ObtieneDatosTablaAsociativo();
	 if (!isset($registros->error)) {
	  $DatosTabla = new TObtieneDatosTabla;
	  for ($i = 0; $i < count($registros); $i++) {
	   $tabla = $registros[$i]["for06"];
	   $DatosTabla->AsignaTabla($tabla);
	   $DatosTabla->AsignaCampos($registros[$i]['for11'] . "," . $registros[$i]['for12']);
	   $DatosTabla->AsignaOrder(" order by {$registros[$i]['for12']}");
	   if (strlen($registros[$i]['for13']) > 0) {
		$DatosTabla->AsignaWhere("where {$registros[$i]['for13']} = {$this->idEmpresa}");
	   }
	   $registros[$i][$tabla] = $DatosTabla->ObtieneDatosTablaAsociativo();
	   $DatosTabla->LimpiaVariables();
	  }
	 } else {
	  return  json_decode(json_encode($registros), true);
 	 }
	 return  $registros;
	}

	public function ObtieneFiltrosFormulario(int $AIdFormulario)
	{
     $datos = [];
	 if ($AIdFormulario == 0) {
	  $datos["error"] = array("error" => "Tiene que Indicar el Formulario");
	 } else {
	  $datos["botones"] = $this->ObtieneBotones(1, $AIdFormulario);
	  $datos["listas"] = $this->ObtieneFiltros(1, $AIdFormulario);
	  $datos["periodos"] = $this->ObtieneFiltros(3, $AIdFormulario);
	 }
	 return $datos;
	}

    public function ObtieneIdUsuario()
	{
	 return $this->idUsuario;
	}

    public function ObtieneImportaciones(int $AIdFormulario)
    {
 	 $datos = [];
	 $DatosTabla = new TObtieneDatosTabla;
	 $DatosTabla->AsignaTabla("importacionexcel");
	 $DatosTabla->AsignaWhere("where imp02 = ? ");
	 $DatosTabla->AsignaParametros(array($AIdFormulario));
	 $registros = $DatosTabla->ObtieneDatosTablaAsociativo();
	 if (!isset($registros->error)) {
      $datos = $registros;
	 }
	 return $datos;
    }

    public function ObtienePwd()
	{
	 return $this->pwd;
	}

	public function ObtieneDatosRegistro(array $linea)
	{
		$registro = [];
		foreach ($linea as $campo => $valor) {
			$registro[$campo] = $valor;
		}
		return $registro;
	}

	public function ObtieneRegistros(array $resulSet)
	{
	 $registros = [];
	 $i = 0;
	 foreach ($resulSet as $linea) {
	  $registro = [];
	  foreach ($linea as $campo => $valor) {
	   if ($valor == NULL){
		$registro[$campo] = "";
	   }else{
		$registro[$campo] = $valor;
	   }
 	  }
	  $registros[$i] = $registro;
	  $i++;
	 }
	 return $registros;
	}  
	
	public function ObtieneRequest(string $AParametro, string $AValorDefault)
	{
	 $parametro = isset($_REQUEST[$AParametro]) ? 
	 addslashes($_REQUEST[$AParametro]) :
	 $AValorDefault;
	 return $parametro;
	}

	public function ObtieneToken()
	{
	 return $this->token;
	}


	
}

