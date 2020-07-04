const log_model = require('../models/log_model')

module.exports = {
    "log_request": async function(req){
        var header=body=UserId=url=ip="";
        
        if(typeof req.headers !== 'undefined')
            header = req.headers
        if(typeof req.body !== 'undefined')
            body = req.body
        if(typeof req.body.UserId !== 'undefined')
            UserId = req.body.UserId
        if(typeof req.originalUrl !== 'undefined')
            url = req.originalUrl
        if(typeof req.connection.remoteAddress !== 'undefined')
            ip = req.connection.remoteAddress
        
        log_model.add_log(header,body,UserId,url,ip);
        return
    }

}