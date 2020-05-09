import { Fire } from '/vendor/akiyatkin/load/Fire.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'

let reCAPTCHA = {
    on: (...params) => Fire.on(reCAPTCHA, ...params),
    hand: (...params) => Fire.hand(reCAPTCHA, ...params),
    get: (...params) => Fire.get(reCAPTCHA, ...params),
    execute: async (action) => {
        await reCAPTCHA.get('ready')
        let sk = Config.get('recaptcha').sitekey
        let token = await grecaptcha.execute(sk, { action: action })
        return token
    }
}

reCAPTCHA.hand('init', async () => {
    let sk = Config.get('recaptcha').sitekey
    let src = 'https://www.google.com/recaptcha/api.js?render=' + sk
    await CDN.js('recaptcha', src)
    grecaptcha.ready(() => reCAPTCHA.on('ready'))
}, '', [], true) 

//'', ['тег'], true - Имя, зависимости, куда - перыми после тега
//'', ['тег'], false - Имя, зависимости, куда - последними после тега
//'', [], true - Имя, зависимости, куда - перыми вообще

export {reCAPTCHA}