var response = {"error": 1001,"message": "Error : Undefined","data": null}

module.exports = {
    create_response: async function(code=1,message="Error : Undefined",data=null){
        response.error = code;
        response.message = message;
        response.data=data
        console.log(response)
        return response;
    }
}