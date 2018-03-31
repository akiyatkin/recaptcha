# php обёртка для reCAPTCHA Google

После установки по умолчанию отключена. Нужно в конфиг добавить off:false.

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
		"off":false,
		"sitekey":"...sitekey...",
		"secret":"...secret..."
	}
}
```

https://www.google.com/recaptcha
