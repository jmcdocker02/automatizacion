<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

function EnviaCorreo($AReceptor,$ACorreo,$AAsunto,$AMensaje,$AAdjunto){
 $mail = new PHPMailer(true);
 $datos = [];
 if(strlen($AReceptor) > 0 && strlen($ACorreo) > 0){
  try {
   $mail->isSMTP();   
   $mail->Host       = 'mail.dcsr.com.mx';   
   $mail->SMTPAuth   = true;  
   $mail->SMTPSecure = 'tls'; 
   $mail->Username   = 'soporte.dcsr@dcsr.com.mx';  
   $mail->Password   = 'r0+BIizk#C6r';
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   
   $mail->Port       = 587; 
   $mail->setFrom('soporte.dcsr@dcsr.com.mx', 'Soporte DCSR');
   $mail->addAddress($ACorreo, $AReceptor); 
   $mail->addCC('pamela.flores@decode.mx', 'Pamela Flores');
   $mail->addAttachment($AAdjunto); 
   $mail->isHTML(true); 
   $mail->CharSet = 'UTF-8';
   $mail->Subject = $AAsunto;
   $mail->Body    = $AMensaje;
   $mail->send();
   $datos["resultado"] = "Mensaje enviado : {$mail->ErrorInfo}";
  } catch (Exception $e) {
   $datos["error"] = "El mensaje no se pudo enviar : {$mail->ErrorInfo}";
  }
 }else{
  $datos["error"] = "No se recibio informacion suficiente, para el envio";
 }
 return $datos;
}
