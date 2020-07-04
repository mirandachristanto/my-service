const mysql = require('../module/mysql_connector')
module.exports = {

    
    getList: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_privacy " +
                "WHERE " +
                "name LIKE '%" + data.search + "%' " +
                "OR content LIKE '%" + data.search + "%' " +
                "ORDER BY " + data.order + " " + data.direction + " " +
                (data.length < 0 ? "" : "LIMIT " + data.start + ", " + data.length)
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    count: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT COUNT(*) as 'count' " +
                "FROM ms_privacy d " +
                "WHERE " +
                "d.name LIKE '%" + data.search + "%' " +
                "OR d.content LIKE '%" + data.search + "%' " +
                "ORDER BY " + data.order + " " + data.direction + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0].count, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getPrivacy: async function(){
        try{
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_privacy "
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getSelectedPrivacy: async function(typed){
        try{
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_privacy "+
            "WHERE name='" +typed+ "' " 
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
    
    insertConfig: async function(data){
        try {
            await mysql.connectAsync()
            var sql="INSERT INTO `ms_privacy` (`name`, `type`, `content`, `created`,`updated`) "+
            "VALUES ("+
            "'"+data.name+"', "+
            "'"+data.type+"', "+
            "'"+data.content+"', "+
            "NOW(), "+
            "NOW() "+
            ")"
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
    }
    },

    updatePrivacy: async function(data){
        try{
            await mysql.connectAsync()
            var sql = "UPDATE ms_privacy SET "+
            "type='"+data.type+"', "+    
            "content='"+data.content+"', "+    
            "updated=NOW() "+
            "WHERE name='" +data.name+ "' " 
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deletePrivacy: async function(typed){
        try {
            var sql = "DELETE FROM ms_privacy "+
            "WHERE name='" +typed+ "' " 
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        }
         catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    }

    
}


