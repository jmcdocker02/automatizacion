<?php
require_once("../clases/guardaDatosTablaClass.php");
require_once("../clases/EliminaRegistroClass.php");
$datos = [];
$GuardarDatos = new TGuardarDatos;
$valores = json_decode(file_get_contents("php://input"), true);
if ($valores["imp01"] == -1 || $valores["imp02"] == "0") {
	$datos["error"] = (object)array("error" => "Tienes que indicar, El id y campo a guardar");
} else {
	$campos = explode(";", trim($valores["campos"]));
	$GuardarDatos->AsignaTabla("importacionexcel");
	$GuardarDatos->AsignaPrefijo("imp");
	$GuardarDatos->AsignaLlave(1);
	$GuardarDatos->AsignaNumeroCampos(8);
	$GuardarDatos->InicializaGuardado();
	if ($valores["imp01"] == 0) {
		$GuardarDatos->AsignaParametros(
            array(
                $valores["imp01"], 
                $valores["imp02"],
                $valores["imp03"], 
                $valores["imp04"], 
                $valores["imp05"], 
                $valores["imp06"], 
                $valores["imp07"], 
                $valores["imp08"])
            );
		$GuardarDatos->AsignaQuery($GuardarDatos->ArmaSentenciaInsert());
		$resulSet = $GuardarDatos->EjecutaSentenciaInsert();
		$valores["imp01"] = $resulSet->id;
	} else {
		$GuardarDatos->AsignaParametros(
            array(
				$valores["imp02"],
				$valores["imp03"], 
                $valores["imp04"], 
                $valores["imp05"], 
                $valores["imp06"], 
                $valores["imp07"], 
                $valores["imp08"],
				$valores["imp01"]) 
            );
		$GuardarDatos->AsignaQuery($GuardarDatos->ArmaSentenciaUpdate());
		$resulSet = $GuardarDatos->EjecutaSentencia();
	}
 	if (isset($resulSet->error)) {
 		$datos["error"] = $resulSet;
 	} else {
		$EliminaRegistro = new TEliminaRegistro;
		$EliminaRegistro->AsignaTabla("dimportacionexcel");
		$EliminaRegistro->AsignaPrefijo("dim");
		$EliminaRegistro->AsignaLlave(1);
		$EliminaRegistro->AsignaParametros(array($valores["imp01"]));
		$EliminaRegistro->EliminaRegistro();
        $GuardarDatos->AsignaTabla("dimportacionexcel");
        $GuardarDatos->AsignaPrefijo("dim");
        $GuardarDatos->AsignaLlave(2);
        $GuardarDatos->AsignaNumeroCampos(9);
 	  foreach ($campos as $campo) {
 			$detalle = explode(",", $campo);
            $GuardarDatos->AsignaParametros(array(
                $valores["imp01"],
                $detalle[0],
                $detalle[1],
                "0",
                $detalle[2],
                "",
                "0",
                "",
                ""));
            $GuardarDatos->AsignaQuery($GuardarDatos->ArmaSentenciaInsert());
            $resulSet = $GuardarDatos->EjecutaSentenciaInsert();
	 		if (isset($resultSet->error)) {
	 			$datos["error"] = $resultSet;
					$datos['paramaetros'] =$GuardarDatos->parametros;
	 			break;
	 		}
			}
		}
	}
	if (isset($datos["error"])) {
		$GuardarDatos->RechazaTransaccion();
	} else {
		$GuardarDatos->AceptaTransaccion();
		$datos["resultado"] = (object)array("resultado" => "Importacion Guardada Correctamente");
	}
header('Content-Type: application/json');
echo json_encode($datos);
