const express = require('express')
const router = express.Router()

const c_change_password = require('./controller_change_password')
const c_inventory = require('./controller_ms_inventory')
const c_games = require('./controller_ms_transaction')
const c_privacy = require('./controller_privacy')


const c_admin = require('../admin/controller_admin')
const c_auth = require('./controller_auth')

router.use("/admin", c_admin)
router.use('/auth', c_auth)

router.use(async function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/panels/auth')
        return
    }
    next()
});

router.get('/', function (req, res) {
    res.render("pages/welcome", { user: req.user })
});

router.use('/change_password', c_change_password)
router.use('/ms_inventory', c_inventory)
router.use('/ms_transaction', c_games)
router.use('/privacy_policy', c_privacy)





module.exports = router