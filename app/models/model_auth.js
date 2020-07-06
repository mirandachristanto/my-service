const mysql = require('../module/mysql_connector')
const passport = require('../module/passport')
module.exports ={
    userLogin: async function(id_panel_users){
        try {
            await mysql.connectAsync()
            // callback with username and password from our form
            var sql=("UPDATE ms_panel_users SET last_login=NOW() WHERE id_panel_users="+id_panel_users+" ")
            console.log(sql)
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    get: async function(username){
        try {
            await mysql.connectAsync()
            var sql= "SELECT * FROM ms_panel_users WHERE username='"+username+"' AND active=1";
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    byid: async function(id_panel_users){
        try {
            await mysql.connectAsync()
            var sql= "SELECT * FROM ms_panel_users WHERE id_panel_users="+id_panel_users+" ";
            var [result,cache]= await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
    
    groups: async function(id_panel_users){
        try {
            await mysql.connectAsync()
            var sql= "SELECT id_groups FROM tr_panel_users_groups WHERE id_users ="+id_panel_users+" ORDER BY id_groups";
            var [result,cache]= await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    }
}