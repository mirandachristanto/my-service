const fs = require("fs")
const path = require("path")
const moment = require("moment")

function file_log(log_data) {
    var datenow = moment().format("YYYYMMDD")
    log_data = log_data + "\n"
    var log = moment().format() + "|" + log_data
    var logFolder = path.join(__dirname, "/../../logs")
    if (!fs.existsSync(logFolder)) {
        const path = logFolder + "/"
        fs.mkdirSync(path, "0777")
    }
    var file_path = "logs/log_controller_" + datenow + ".txt"
    if (!fs.existsSync(file_path)) {
        fs.writeFileSync(file_path, log, { flag: 'w', mode: "0777" })
    } else {
        fs.writeFileSync(file_path, log, { flag: 'a', mode: "0777" })
    }
};

function get_ip(req) {
    var ip;
    var type;
    if (req.header['x-fowarded-for']) {
        type = "HTTP_X_FORWARDED_FOR "
        ip = req.headers['x-forwarded-for']
    } else if (req.connection.remoteAddress) {
        type = "REMOTE_ADDR "
        ip = req.connection.remoteAddress
    } else {
        type = "REMOTE_ADDR "
        ip = req.hostname
    }
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1);
    return type + ip
};

module.exports = {
    model_log: async function (data) {
        var datenow = moment().format("YYYYMMDD")
        var log_data = JSON.stringify(data)
        var log = moment().format() + "|" + log_data + "\n"
        var logFolder = path.join(__dirname, "/../../logs")
        if (!fs.existsSync(logFolder)) {
            const path = logFolder + "/"
            fs.mkdirSync(path, "0777")
        }
        var file_path = "logs/log_model_" + datenow + ".txt"
        if (!fs.existsSync(file_path)) {
            fs.writeFileSync(file_path, log, { flag: 'w', mode: "0777" })
        } else {
            fs.writeFileSync(file_path, log, { flag: 'a', mode: "0777" })
        }
    },
    write_log: async function (req = null) {
        var method = req.method
        var url = req.protocol + "://" + req.headers.host + req.originalUrl
        var userAgent = req.headers["user-agent"]
        var data = req.method == "POST" ? JSON.stringify(req.body) : JSON.stringify(req.query)
        var remoteAddr = get_ip(req)
        var log = remoteAddr + "|" +
            userAgent + "|" +
            method + "|" +
            url + "|" +
            data
        file_log(log)
    },
    write_log_provider: async function (level = null, url_api = null, method = null, data = null, status = null, message = null) {
        var log = url_api + "|" +
            method + "|" +
            data + "|" +
            status + "|" +
            message
        file_log(log)
    },
};