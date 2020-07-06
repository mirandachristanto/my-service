const express = require('express')
const router = express.Router()
const c_panels = require('./panels/controller_panel')
const c_api = require('./api/controller_api')

router.get('/app-status', async (req, res) => {
    var status = {status:"OK"}
    
    res.send(JSON.stringify(status));
})

router.get('/', function(req, res){
    res.redirect("/panels")
})

router.use("/panels", c_panels)
router.use("/api", c_api)


router.use(function(req, res){
    res.status(404).render("pages/page_404",{})
    return
});

module.exports = router