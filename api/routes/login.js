const { Router } = require("express")
const Cas = require('cas-authentication');

const CASOPTS = {
    cas_url: 'https://login.uconn.edu/cas',
    service_url: 'http//localhost/3000',
    cas_version: '2.0',
    renew: true,
    session_name: 'netid',
    is_dev_mode: process.env.NODE_ENV === 'development',
    dev_mode_user: process.env.CAS_DEV_USER,
}

const cas = new Cas(CASOPTS)
const router = Router()

/* GET users listing. */
router.get("/login", cas.bounce, ctx => {
    console.log('login')
    // ctx.cookies.set('user', ctx.session.netid, { httpOnly: false })
    // ctx.redirect('/admin')
})
router.get('/logout', ctx => {
    ctx.session = null
    ctx.redirect('/')
})

router.use(async (ctx, next) => {
    // The user cookie is sent to the frontend so it knows who's currently logged
    // in. If the session is invalid, then we'll want to invalidate that cookie
    // as well.
    if (!ctx.session.netid && ctx.cookies.get('user')) {
        ctx.cookies.set('user', null)
    }
    return await next()
})

module.exports = router
