const mysql = require('../module/mysql_connector')
module.exports = {

    getPageContent: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_pages " +
            "WHERE page='"+data.page+"' "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getPrivacyContent: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_privacy WHERE name='"+data.type+"' "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            console.log(sql)
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    get_meta: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_meta " +
            "WHERE url='"+data.url+"' " +
            "AND meta='"+data.meta+"' "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    get_game: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM ms_featured_game " +
                "ORDER BY position ASC "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    get_slider: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM ms_home_slider " +
                "ORDER BY position ASC "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
}




