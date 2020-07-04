const basicAuth = require('basic-auth')
const express = require('express')
const router = express.Router()
const api_log = require('../../module/log')
const api_response = require('../../module/api_response')
const api_config = require('../../config/config_api')
const c_v1 = require('./v1/request')

router.use(async function(req, res){
    api_log.log_request(req);
    req.next();
})

router.use(async function(req, res, next){
    try{
        var user = basicAuth(req)
        if(user.name == api_config.username_basic && user.pass == api_config.password_basic){
            next()
        }else{
            response = await api_response.create_response(1002,"Error : Wrong Header Data",null);
            res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
        }
    }
    catch(e){
        console.log(e)
        response = await api_response.create_response(1002,"Error : Wrong Header Data",null);
        res.setHeader('Content-Type', 'application/json');res.status(200).send(JSON.stringify(response));
    }
})

router.use("/v1", c_v1)


module.exports = router