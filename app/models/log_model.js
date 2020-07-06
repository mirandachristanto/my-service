const mysql = require('../module/mysql_connector')

module.exports = {
    add_log: async function(header,body,UserId,url,ip){
        try {
            await mysql.connectAsync()
            try {
                header = JSON.stringify(header)
            } catch (e) { 
                header = header
            }
            try {
                body = JSON.stringify(body)
            } catch (e) { 
                body = body
            }
            var sql= "INSERT INTO `log` (`id`, `header`, `body`, `UserId`, `url`, `ip`, `created`) VALUES (NULL, '"+header+"', '"+body+"', '"+UserId+"', '"+url+"', '"+ip+"', current_timestamp());"
            // console.log(sql)
            var [result, cache]= await mysql.queryAsync(sql)
            // console.log(result)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    }
}