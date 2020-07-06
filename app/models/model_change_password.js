const mysql = require('../module/mysql_connector')
const passport = require('../module/passport')
module.exports = {

    get: async function (username) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users WHERE username='" + username + "' ";
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    byid: async function (id_panel_users) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_panel_users WHERE id_panel_users=" + id_panel_users + " ";
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updatePass: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_panel_users SET " +
                "password='" + data.password + "', " +
                "updated_date=NOW() " +
                "WHERE id_panel_users='" + data.id_panel_users + "' "
            console.log(sql)
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    }
}