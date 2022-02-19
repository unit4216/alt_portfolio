<?php

header('Access-Control-Allow-Origin: *');

//Get vars from HTML POST request 
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Get Gmail app passwd from file 
$myfile = fopen("gmail_app_pw.txt", "r") or die("Unable to open file!");
$pw = fgets($myfile);

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
$mail->SMTPDebug = SMTP::DEBUG_SERVER;

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

//Set the SMTP port number
$mail->Port = 587;

//Set the encryption mechanism to use
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication
$mail->Username = 'pf.paliza@gmail.com';

//Password to use for SMTP authentication
$mail->Password = $pw;

//Set who the message is to be sent from
$mail->setFrom('pf.paliza@gmail.com', 'Pablo Paliza-Carre');

//Set an alternative reply-to address
$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress('pf.paliza@gmail.com', 'John Doe');

//Set the subject line
$mail->Subject = $name . ' ' . $email;

//Set HTML message body
$mail->Body = $message;

//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}

?>
