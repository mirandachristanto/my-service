const express = require('express')
const router = express.Router()
const groups = require("../../config/access_groups")

router.get("/", async function (req, res) {
    var result = groups.list
    res.render('admin/ms_panel_users_groups', { user: req.user, groups:result})
})

module.exports = router

