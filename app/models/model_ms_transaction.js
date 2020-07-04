const mysql = require('../module/mysql_connector')
const logs = require('../module/file_log')
module.exports = {
    getGame: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM ms_featured_game " +
                "ORDER BY id DESC "
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
            var sql = "SELECT * " +
                "FROM ms_featured_game a " +
                "WHERE " +
                "a.title LIKE '%" + data.search + "%' " +
                "OR a.description LIKE '%" + data.search + "%' " +
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
                "FROM ms_featured_game a " +
                "WHERE " +
                "a.title LIKE '%" + data.search + "%' " +
                "OR a.description LIKE '%" + data.search + "%' " +
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

    getById: async function (id) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_featured_game " +
                "WHERE id=" + id + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    addGame: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO ms_featured_game (title,description,image,position,url,created,updated) " +
                "VALUES (" +
                "'" + data.title + "', " +
                "'" + data.description + "', " +
                "'" + data.image + "', " +
                + data.position + ", " +
                "'" + data.url + "', " +
                "NOW(), " +
                "NOW() " +
                ") "
            console.log(sql)
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateGame: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_featured_game SET " +
                "title='" + data.title + "', " +
                "description='" + data.description + "', " +
                (data.image ? "image='" + data.image + "', " : "") +
                "url='" + data.url + "', " +
                "position=" + data.position + ", " +
                "updated=NOW() " +
                "WHERE id=" + data.id + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deleteGame: async function (id) {
        try {
            await mysql.connectAsync()
            var sql = 'DELETE FROM ms_featured_game WHERE id=' + id + " ";
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        }
        catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    count_position: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT COUNT(*) as 'count' " +
                "FROM ms_featured_game "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0].count, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },
    changePosition: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_featured_game SET " +
                "position='" + data.position + "', " +
                "updated=NOW() " +
                "WHERE position='" + data.old_position + "' "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }

    },

    //update dragNdrop
    updateAppPosition: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_featured_game SET " +
                "position=" + data.position + ", " +
                "updated=NOW() " +
                "WHERE id=" + data.id + " "
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


