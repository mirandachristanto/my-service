const express = require('express')
const router = express.Router()
const model = require('../../models/model_ms_inventory')
const compress_image = require('../../module/compress_image')


//render views 
router.get("/", async function (req, res) {
    res.render('panels/ms_transaction', {
        user: req.user,
        products: "",
    })
})

//get
router.post("/get", async function (req, res) {
    str = req.body.code
    var strings = str.split("\t");
    // str2 = strings
    // var strings = str2.split(" "); 

    strings = strings.filter(item => item);
    // console.log(strings)

    var data = [{}];  
    var totals = 0  
    for (let i=0;i<strings.length;i++){
        var count = 1
        var [result,err] = await model.getByCode(strings[i]);

        data[i] = {};
        data[i]['inventory_name'] = result.inventory_name;
        data[i]['codeReference'] = result.codeReference;
        data[i]['inventory_price'] = result.inventory_price;   
        data[i]['amount'] = count; 
        var harga =  data[i]['inventory_price'].replace('Rp.','')
        var harga =  harga.replace('.','') 

        harga = parseInt(harga)
        totals += harga
        
        var [addedCart, error] = await model.addToCart({
            username: req.user.username,
            id_merchant:1,
            id_branch:1,
            codeReference:result.codeReference
        })
    }

    // console.log(data)
    // console.log(totals)

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        data: {
            products: data,
            totalPayment: totals
        }
    }))

});

module.exports = router
