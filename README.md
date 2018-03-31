# php обёртка для reCAPTCHA Google



# Установка

```composer require akiyatkin/recaptcha:~1```

# Использование

Кнопка в форме
```html
<button class="g-recaptcha" data-sitekey="{~conf.recaptcha.sitekey}" data-callback='onSubmit'>Submit</button>

```

Проверка на сервере
```php
use akiyatkin\recaptcha\Recaptcha;

$r = Recaptcha.check();
```

Конфиг в data/.infra.json
```json
{
	"recaptcha":{
		"sitekey":"6LfWZTQUAAAAACvx6Wkf0xw5yFh-cOyQEQ_BwVfF",
		"secret":"6LfWZTQUAAAAAFlua_PuIfoHXmx12ZpzAz53sk4t"
	}
}
```