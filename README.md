# php обёртка для reCAPTCHA Google

После установки по умолчанию отключена. Нужно в конфиг добавить off:false.

# Установка

```composer require akiyatkin/recaptcha:~1```

# Использование

## Невидимая проверка на кнопке отправить
Справа снизу плавает иконка Google
```html
<button id="recaptcha" class="g-recaptcha" data-sitekey="{~conf.recaptcha.sitekey}" data-callback="onSubmit">Submit</button>
<script>
	domready(function () {
		Event.one('reCAPTCHA', function (){
			grecaptcha.render('recaptcha');
		});
	});
	function onSubmit(token) {
		var div = $('form').submit();
	}
</script>
```
## Галочка в форме
```html
<form>
	...
	<div id="recaptcha" class="g-recaptcha space"  data-sitekey="{~conf.recaptcha.sitekey}"></div>
</form>
<script>
	domready(function () {
		Event.one('reCAPTCHA', function (){
			grecaptcha.render('recaptcha');
		});
	});
</script>
```

## Проверка на сервере
```php
use akiyatkin\recaptcha\reCAPTCHA;

$r = reCAPTCHA.check();
```

Конфиг в data/.infra.json
```json
{
	"recaptcha":{
		"off":false,
		"sitekey":"...sitekey...",
		"secret":"...secret..."
	}
}
```

https://www.google.com/recaptcha
