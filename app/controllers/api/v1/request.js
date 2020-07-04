const express = require('express')
const router = express.Router()
const privacy_module = require('../../../module/api_privacy')
const api_response = require('../../../module/api_response')

router.post("/request", async function(req, res){
    var menu;
    var callback={};
    var response;

    try{
        menu = req.body.req_type.split(".");
    }catch(e)
    {
        console.log(e)
        response = await api_response.create_response(1002,"Error : Wrong body Data",null);
        res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
        return;
    }
    switch(menu[0]){
    case "get_privacy" :
        console.log("privacy")
        try{
            callback = await privacy_module[menu[0]](req.body)
            response = await api_response.create_response(callback.error,callback.message,callback.data);
        }catch(e){
            console.log(e)
            response = await api_response.create_response(1003,"Error : Function "+ menu[1]+" not Found",null);
            res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
            return;
        }
        break;
    default:
        console.log("default")
        response = await api_response.create_response(1003,"Error : Function "+ menu[0]+" not Found",null);
        res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
        return;
    }
    
    res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
})

module.exports = router