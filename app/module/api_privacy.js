const privacy_model = require('../models/model_webview')

module.exports = {
    "get_privacy": async function(req){
        var [privacy, _] = await privacy_model.getPrivacyContent({
            type: req.name
        })

        if(!privacy || privacy.length == 0)
            return {"error":2001,"message":"The Privacy content doesn't exist.","data": null }
        else{
            return {"error":0,"message":"Success","data": {"name": privacy[0].name, "content": privacy[0].content} }
        }
    }
}