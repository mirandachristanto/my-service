const express = require('express')
const router = express.Router()

const c_panel_users= require('./controller_ms_panel_users')
const c_panel_users_groups= require('./controller_ms_panel_users_groups')

router.use(async function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect('/panels/auth')
        return
    }
    next()
})

router.use('/ms_panel_users', c_panel_users)
router.use('/ms_panel_users_groups',c_panel_users_groups)
module.exports = router