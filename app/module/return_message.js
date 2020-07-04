const error = {
    ERR_MISSING_CREDENTIAL: "Credential is missing",
    ERR_CREDENTIAL_NOT_VALID: "Credential not valid",
    ERR_NOT_AUTHORIZED: "You are not authorize",
}
module.exports = {
    error: error,
    generateError: function (code, message) {
        return JSON.stringify({
            status: "FAILED",
            message: message,
            code: code,
        })
    },
    generateSuccess: function (data) {
        return JSON.stringify({
            status: "SUCCESS",
            code: 0,
            data: data
        })
    }
}