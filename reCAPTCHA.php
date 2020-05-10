<?php
namespace akiyatkin\recaptcha;
use infrajs\load\Load;

class reCAPTCHA {
	public static $conf = array();
	public static function check(&$ans = array()) {
		$conf = static::$conf;
		$ans['post'] = $_POST;
		if (!empty($conf['off'])) return true;
		if (empty($conf['secret'])) return false;
		if (empty($_POST['g-recaptcha-token'])) return false;
		
		$paramsArray = array(
			'secret' => $conf['secret'], 
			'response' => $_POST['g-recaptcha-token'],
			'remoteip' => $_SERVER['REMOTE_ADDR']
		);
		$vars = http_build_query($paramsArray); // преобразуем массив в URL-кодированную строку
		$options = array( // создаем параметры контекста
			'http' => array(  
				'method'  => 'POST',  // метод передачи данных
				'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок 
				'content' => $vars,  // переменные
			)
		); 
		$ans['options'] = $options;
		$context = stream_context_create($options);  // создаём контекст потока
		$result = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context); //отправляем запрос
		$result = Load::json_decode($result, true);
		$ans['reCAPTCHA'] = $result;
		
		if (!$result || !$result['success']) {
			return false;
		}
		return true;
	}
}