const express = require('express')
const router = express.Router()
const model = require('../../models/model_change_password')
const bcrypt = require('bcrypt')

router.get("/", async function (req, res) {
    res.render("panels/change_password", { user: req.user })
})

router.post('/changePass', async function (req, res, next) {
    var [user, err] = await model.byid(req.body.id_panel_users)
    if (err || !user) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({
            status: "FAILED"
        }));
        return
    }
    var compare_password = bcrypt.compareSync(req.body.old_password, user.password)
    var compare_new_password = req.body.new_password == req.body.confirm_password
    if (!compare_password) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({
            status: "FAILED"
        }));
        return
    } else if (!compare_new_password) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({
            status: "NOT MATCH"
        }));
        return
    }
    var hash = bcrypt.hashSync(req.body.new_password, 10);
    await model.updatePass({
        id_panel_users: user.id_panel_users,
        password: hash
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        status: "SUCCESS"
    }));
});
module.exports = router