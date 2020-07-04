const mysql = require('../module/mysql_connector')

module.exports = {

    getMeta: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM ms_meta " +
                "ORDER BY id_meta " 
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

 
    getList: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_meta " +
                "WHERE " +
                "content LIKE '%" + data.search + "%' " +
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
                "FROM ms_meta d " +
                "WHERE " +
                "d.content LIKE '%" + data.search + "%' " +
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

    getById: async function(id_meta){
        try{
            await mysql.connectAsync()
            var sql =   "SELECT * "+
                        "FROM ms_meta "+
                        "WHERE id_meta="+id_meta
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
    
    addMeta: async function(data){
        try{
            await mysql.connectAsync()
            var sql =  "INSERT INTO ms_meta (url,meta,content,created) "+
            "VALUES ("+
            "'"+data.url+"', "+
            "'"+data.meta+"', "+
            "'"+data.content+"', "+
            "NOW() "+
            ")"       
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateMeta: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_meta SET " +
                "meta='" + data.meta + "', " +
                "content='" + data.content + "', " +
                "updated=NOW() "+
                "WHERE id_meta="+data.id_meta+" " 

            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
 
    deleteMeta: async function(id_meta){
        try {
            var sql = 'DELETE FROM ms_meta WHERE id_meta='+id_meta+" ";
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