const { Router } = require("express")
const Cas = require('cas-authentication');
console.log(process.env.NODE_ENV)
const CASOPTS = {
    cas_url: 'https://login.uconn.edu/cas',
    service_url: process.env.NODE_ENV === "development" ?
        'http://localhost:3000' : process.env.URL,
    cas_version: '2.0',
    renew: true,
    session_name: 'netid',
    //is_dev_mode: process.env.NODE_ENV === 'development',
    //dev_mode_user: process.env.CAS_DEV_USER,
}

const cas = new Cas(CASOPTS)
const router = Router()

/* GET users listing. */
router.get("/login", cas.bounce, (req, res) => {
    console.log(req.session)
    res.cookie('user', req.session.netid, { httpOnly: false })
    res.render('admin')
})
router.get('/logout', (req, res) => {
    res.redirect('/')
})

router.use(async (req, res, next) => {
    // The user cookie is sent to the frontend so it knows who's currently logged
    // in. If the session is invalid, then we'll want to invalidate that cookie
    // // as well.
    if (!req.session.netid) {
        res.cookie('user', null)

    }
    if (req.path !== '/admin') return next();
    cas.bounce(req, res, next )
    
    
})

module.exports = router
