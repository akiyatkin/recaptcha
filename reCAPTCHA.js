import { Fire } from '/vendor/akiyatkin/load/Fire.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'

let reCAPTCHA = { ...Fire }

reCAPTCHA.hand('execute', async action => {
    await reCAPTCHA.on('init')
    let sk = Config.get('recaptcha').sitekey
    return await grecaptcha.execute(sk, { action: action })
})

reCAPTCHA.hand('apply', async form => {
    if (!form.dataset.recaptcha) return
    let name = "g-recaptcha-response"
    let cls = cls => form.getElementsByClassName(cls)[0]
    let inp = cls(name)
    if (!inp) {
        inp = document.createElement("input")
        inp.type = "hidden"
        inp.class = inp.name = name
        form.appendChild(inp)
    }
    inp.value = await reCAPTCHA.tikon('execute', form.dataset.recaptcha)
})

reCAPTCHA.hand('init', () => {
    return new Promise(async resolve => {
        let sk = Config.get('recaptcha').sitekey
        let src = 'https://www.google.com/recaptcha/api.js?render=' + sk
        await CDN.js('recaptcha', src)
        grecaptcha.ready(resolve)
    })
})

window.reCAPTCHA = reCAPTCHA
export { reCAPTCHA }