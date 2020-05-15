import { Fire } from '/vendor/akiyatkin/load/Fire.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'
import { Layer } from '/vendor/infrajs/controller/src/Layer.js'
import { Submit } from '/vendor/infrajs/layer-onsubmit/Submit.js'
/*
Если события не нужны, то и не надо их использовать
У событий
- Количесто запусков
- Независимое использование
- Расширяемость новым кодом-обработчиками
init() - 
activate()
on.ready

*/

let reCAPTCHA = {
    on: (...params) => Fire.on(reCAPTCHA, ...params),
    hand: (...params) => Fire.hand(reCAPTCHA, ...params),
    wait: (...params) => Fire.wait(reCAPTCHA, ...params),
    init: async (context, name) => {
        reCAPTCHA.activate()
		let div = context.parentElement
        let tag = tag => div.getElementsByTagName(tag)[0]
        let form = tag('form')
        let cls = cls => form.getElementsByClassName(cls)[0]
		
		Submit.hand('form', async (f) => {
            if (f != form) return
            let name = "g-recaptcha-token"
            let inp = cls(name)
            if (!inp) {
                inp = document.createElement("input")
                inp.type = "hidden"
                inp.class = inp.name = name 
                form.appendChild(inp)
            }
            inp.value = await reCAPTCHA.execute(name)
		})
    },
    execute: async (action) => {
        await reCAPTCHA.wait('ready')
        let sk = Config.get('recaptcha').sitekey
        return await grecaptcha.execute(sk, { action: action })
    },
    activate: async() => {
        let sk = Config.get('recaptcha').sitekey
        let src = 'https://www.google.com/recaptcha/api.js?render=' + sk
        await CDN.js('recaptcha', src)
        grecaptcha.ready(() => reCAPTCHA.on('ready'))
    }
}

// reCAPTCHA.hand('activate', async () => {
    
// }, obj, '', [], true) 
// obj - подписка на null-объект или на все объекты?

// '', ['тег'], true - Имя, зависимости, куда - перыми после тега
// '', ['тег'], false - Имя, зависимости, куда - последними после тега
// '', [], true - Имя, зависимости, куда - перыми вообще

export {reCAPTCHA}