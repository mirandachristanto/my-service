const mysql = require('../module/mysql_connector')

module.exports = {

    getPage: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM ms_pages " +
                "ORDER BY id_page " 
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
            var sql = "SELECT * FROM ms_pages " +
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
                "FROM ms_pages d " +
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

    getById: async function(id_page){
        try{
            await mysql.connectAsync()
            var sql =   "SELECT * "+
                        "FROM ms_pages "+
                        "WHERE id_page="+id_page
            var [result,cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        }catch(error){
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
    
    addPage: async function(data){
        try{
            await mysql.connectAsync()
            var sql =  "INSERT INTO ms_pages (page,content,created) "+
            "VALUES ("+
            "'"+data.page+"', "+
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

    updatePage: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_pages SET " +
                "content='" + data.content + "', " +
                "updated=NOW() "+
                "WHERE id_page="+data.id_page+" " 

            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
 
    deletePage: async function(id_page){
        try {
            var sql = 'DELETE FROM ms_pages WHERE id_page='+id_page+" ";
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