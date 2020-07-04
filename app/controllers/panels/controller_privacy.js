const express = require('express')
const router = express.Router()
const model = require('../../models/model_privacy')
const logs = require("../../module/file_log")

router.get("/", async function (req, res) {
    var [result, error] = await model.getPrivacy();
    res.render('panels/ms_privacy', {
        user: req.user,
        contents: "",
        // contents: result ? result.content : ""
    })
})

//ajax List
router.post("/list", async function (req, res) {

    var start = req.body.start
    var length = req.body.length
    var order = req.body.columns[req.body.order[0].column].data
    var direction = req.body.order[0].dir
    var search = req.body.search.value
    var [ret, err] = await model.getList({
        start: parseInt(start),
        length: parseInt(length),
        search: search,
        order: order,
        direction: direction
    })
    var [count, err] = await model.count({
        start: parseInt(start),
        length: parseInt(length),
        search: search,
        order: order,
        direction: direction
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: ret,
        recordsTotal: count,
        recordsFiltered: count,
    }));

}),

//get by id
router.post("/get", async function (req, res) {
    var [result, error] = await model.getSelectedPrivacy(req.body.name);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: {
            page: result,
        }
    }))
})

//add-edit data
router.post('/save', async function (req, res) {
    var [data, err] = await model.getSelectedPrivacy(req.body.name);
    
    var typeOfPrivacy = req.body.type
    if (typeOfPrivacy == "raw") {
        str =JSON.stringify(req.body.content)
        let newstr = str.replace(/'/g,"`");
        content_privacy = JSON.parse(newstr)
        content_privacy = content_privacy.slice(0, -1) + '';

    } else if (typeOfPrivacy == "html") {
        content_privacy = req.body.content
    }

    if (!data) {
        var [result, error] = await model.insertConfig({
            name: req.body.name,
            type: typeOfPrivacy,
            content: content_privacy
        })
        res.redirect('/panels/privacy_policy/');
    }
});

//update
router.post('/update', async function (req, res) {
    
    var typeOfPrivacy = req.body.type
    if (typeOfPrivacy == "raw") {
        str =JSON.stringify(req.body.content)
        let newstr = str.replace(/'/g,"`");
        content_privacy = JSON.parse(newstr)
        if (content_privacy.endsWith(",")){
            content_privacy = content_privacy.slice(0, -1) + '';
        }
    } else if (typeOfPrivacy == "html") {
        content_privacy = req.body.content
    }

    res.setHeader('Content-Type', 'application/json')
        var [ret, err] = await model.updatePrivacy({
            name: req.body.name,
            type: typeOfPrivacy,
            content: content_privacy
        })

        res.status(200).send(JSON.stringify({ status: "SUCCESS" }))
        return
});


//delete
router.post('/delete', async (req, res) => {    
    var [result, error] = await model.deletePrivacy(req.body.name);
    res.redirect('/panels/privacy_policy/');
});



module.exports = router