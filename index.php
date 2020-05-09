<?php
namespace akiyatkin\recaptcha;
use infrajs\rest\Rest;
use infrajs\ans\Ans;
use infrajs\access\Access;
use infrajs\config\Config;
use infrajs\template\Template;

Access::debug(true);

return Rest::get( function () {
	$conf = Config::get('recaptcha');
	$html = Rest::parse('-recaptcha/layout.tpl', $conf);
	return Ans::html($html);
}, 'submit', function () {
	$ans = array();
	$r = reCAPTCHA::check($ans);//$ans передаётся для дебага
	if(!$r) return Ans::err($ans,'Ошибка, не пройдена проверка антибот.');
	else return Ans::ret($ans, 'Проверка пройдена.');
});

