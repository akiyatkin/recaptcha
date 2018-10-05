<?php
namespace infrajs\contacts;
use infrajs\ans\Ans;
use infrajs\config\Config;
use akiyatkin\boo\Cache;

$conf = Config::get('recaptcha');

/*$js = Cache::func( function () {
	return file_get_contents('https://www.google.com/recaptcha/api.js?onload=grecaptchaOnload&render=explicit&hl=ru');
}, [], ['akiyatkin\boo\Cache','getDurationTime'], array('last friday'));*/

$js = file_get_contents('https://www.google.com/recaptcha/api.js?onload=grecaptchaOnload&render=explicit&hl=ru');
$js .= 'window.grecaptchaOnload=function(){ Event.fire("reCAPTCHA") };';

return Ans::js($js);