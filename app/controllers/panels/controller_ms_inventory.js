const express = require('express')
const router = express.Router()
const model = require('../../models/model_ms_inventory')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const compress_image = require('../../module/compress_image')


var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../../public/upload'))
        },
        filename: function (req, file, cb) {
            var now = Math.floor(new Date() / 1000)
            cb(null, "product_" + now + path.extname(file.originalname))
        }
    }),
}).single('picture')

//render views 
router.get("/", async function (req, res) {
    var [result, error] = await model.getSlider();

    res.render('panels/ms_inventory', {
        user: req.user
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
        direction: direction,
    })
    var [count, err] = await model.count({
        start: parseInt(start),
        length: parseInt(length),
        search: search,
        order: order,
        direction: direction,
        id_inventory: req.body.id_inventory,
        id_panel_users: req.body.id_panel_users
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: ret,
        recordsTotal: count,
        recordsFiltered: count,
    }));
})
//get
router.post("/get", async function (req, res) {
    var [result, error] = await model.getById(req.body.id_inventory);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: result
    }))
});
//add 
router.post('/add', async function (req, res) {
    var uploadPath = path.join(__dirname, '../../../public/upload')
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, "0777")
    }

    var tempPath = path.join(__dirname, '../../../public/upload/temp')
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, "0777")
    }
    upload(req, res, async function (err) {
        var file_path = path.join(__dirname, '../../../public/upload/temp/' + req.file.filename)
        compress_image.compress(file_path)
        if (err) {
            res.status(200).send(rm.generateError(1, rm.error.ERR_SERVER));
            return;
        }
        // No error
        if (!req.file) {
            res.status(200).send(rm.generateError(2, rm.error.ERR_IMAGE_NOT_FOUND));
            return;
        }
        var [position_count, error] = await model.count_position()
        var last_position = position_count + 1
        
        var [ret, err] = await model.addSlider({
            inventory_name: req.body.inventory_name,
            codeReference: req.body.codeReference,
            picture: req.file ? req.file.filename : undefined,
            inventory_price: req.body.inventory_price,
            amount: req.body.amount,
            position: last_position
        })
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/panels/ms_inventory')
    })
});
//update 
router.post('/update', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')

    var uploadPath = path.join(__dirname, '../../../public/upload')
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, "0777")
    }

    var tempPath = path.join(__dirname, '../../../public/upload/temp')
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, "0777")
    }
    upload(req, res, async function (err) {
        if (req.file) {
            var [data, err] = await model.getById(req.body.id_inventory)
            if (data) {
                var path_image = path.join(__dirname, '../../../public/upload/' + data.picture)
                if (fs.existsSync(path_image))
                    fs.unlinkSync(path_image);

                var file_path = path.join(__dirname, '../../../public/upload/temp/' + req.file.filename)
                compress_image.compress(file_path)
            }
        }

        var [curr, err] = await model.getById(req.body.id_inventory)
        var [lastPosition, err] = await model.count_position()
        lastPosition = lastPosition ? lastPosition : 0
        if (parseInt(req.body.position) < 1 || parseInt(req.body.position) > lastPosition) {
            res.status(200).send(JSON.stringify({ status: "FAILED", message: "Position must between 1 and " + lastPosition }))
            return
        }
        var oldPos = curr.position
        var newPos = parseInt(req.body.position)
        if (oldPos != newPos) {
            if (oldPos < newPos) {
                //NAIK
                var startIndex = oldPos
                var endIndex = newPos
                for (var index = startIndex; index < endIndex; index++) {
                    await model.changePosition({
                        position: index,
                        old_position: index + 1,
                    })
                }
            } else {
                var startIndex = oldPos
                var endIndex = newPos
                for (var index = startIndex; index > endIndex; index--) {
                    await model.changePosition({
                        position: index,
                        old_position: index - 1,
                    })
                }
            }
        }

        var [ret, err] = await model.updateSlider({
            id_inventory: req.body.id_inventory,
            inventory_name: req.body.inventory_name,
            codeReference: req.body.codeReference,
            picture: req.file ? req.file.filename : undefined,
            inventory_price: req.body.inventory_price,
            amount: req.body.amount,
            position: parseInt(req.body.position)
        })
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify({ status: "SUCCESS" }))
        return
    })
})

//delete
router.post('/delete', async (req, res) => {
    var [data, err] = await model.getById(req.body.id_inventory)
    if (data.picture) {
        var path_image = path.join(__dirname, '../../../public/upload/' + data.picture)
        if (fs.existsSync(path_image))
            fs.unlinkSync(path_image);
    }

    var [curr, err] = await model.getById(req.body.id_inventory)
    var [lastPosition, err] = await model.count_position()
    lastPosition = lastPosition ? lastPosition : 0
    var targetPos = curr.position
    var newPos = lastPosition
    //NAIK
    var startIndex = targetPos
    var endIndex = newPos
    for (var index = startIndex; index < endIndex; index++) {
        await model.changePosition({
            position: index,
            old_position: index + 1,
        })
    }

    var [result, error] = await model.deleteSlider(req.body.id_inventory);
    res.redirect('/panels/ms_inventory/');
});

//update position [Drag and Drop]
router.post('/update_pos', async function (req, res) {
    var [curr, err] = await model.getById(req.body.id_inventory)
    var [lastPosition, err] = await model.count_position()
    lastPosition = lastPosition ? lastPosition : 0
    var oldPos = curr.position
    var newPos = parseInt(req.body.position)
    if (oldPos != newPos) {
        if (oldPos < newPos) {
            var startIndex = oldPos
            var endIndex = newPos
            for (var index = startIndex; index < endIndex; index++) {
                await model.changePosition({
                    position: index,
                    old_position: index + 1
                })
            }
        }else{
            var startIndex = oldPos
            var endIndex = newPos
            for (var index = startIndex; index > endIndex; index--) {
                await model.changePosition({
                    position: index,
                    old_position: index - 1
                })
            }
        }
    }
    var [ret, err] = await model.updateAppPosition({
        id_inventory: req.body.id_inventory,
        position: parseInt(req.body.position)
    })
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        status: "SUCCESS"
    }));
})

module.exports = router
