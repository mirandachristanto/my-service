const mysql = require('../module/mysql_connector')
const logs = require('../module/file_log')
module.exports = {
    getSlider: async function () {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * " +
                "FROM inventory " +
                "ORDER BY id_inventory DESC "
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
                "FROM inventory a " +
                "WHERE " +
                "a.inventory_name LIKE '%" + data.search + "%' " +
                "OR a.codeReference LIKE '%" + data.search + "%' " +
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
                "FROM inventory a " +
                "WHERE " +
                "a.inventory_name LIKE '%" + data.search + "%' " +
                "OR a.codeReference LIKE '%" + data.search + "%' " +
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

    getById: async function (id_inventory) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM inventory " +
                "WHERE id_inventory=" + id_inventory + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getByCode: async function (id_inventory) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM inventory " +
                "WHERE codeReference= '" + id_inventory + "' "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    addSlider: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO inventory (codeReference,inventory_name,inventory_price,amount,picture,position) " +
                "VALUES (" +
                "'" + data.codeReference + "', " +
                "'" + data.inventory_name + "', " +
                "'" + data.inventory_price + "', " +
                + data.amount + ", " +
                "'" + data.picture + "', " +
                + data.position + " " +
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

    addToCart: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO product_cart (username,id_merchant,id_branch,codeReference,transaction_date) " +
                "VALUES (" +
                "'" + data.username + "', " +
                + data.id_merchant + ", " +
                + data.id_branch + ", " +
                "'" + data.codeReference + "', " +
                "NOW() "+
                ") "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getListCode: async function (username,id_merchant,id_branch) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT DISTINCT codeReference FROM product_cart " +
                "WHERE username='" + username + "' "+
                "AND id_merchant=" + id_merchant + " "+
                "AND id_branch=" + id_branch + " "
            var [result, cache] = await mysql.queryAsync(sql)
            console.log(sql)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getListProd: async function (username,id_merchant,id_branch,codeReference) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT *, count(a.codeReference) AS count_item FROM product_cart a " +
                "LEFT JOIN (SELECT * FROM inventory) b ON b.codeReference = a.codeReference "+            
                "WHERE a.username='" + username + "' "+
                "AND a.id_merchant=" + id_merchant + " "+
                "AND a.id_branch=" + id_branch + " "+
                "AND a.codeReference='" + codeReference + "' "
            var [result, cache] = await mysql.queryAsync(sql)
            console.log(sql)
            
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateSlider: async function (data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE inventory SET " +
                "codeReference='" + data.codeReference + "', " +
                "inventory_name='" + data.inventory_name + "', " +
                "inventory_price='" + data.inventory_price + "', " +
                "amount=" + data.amount + ", " +
                (data.picture ? "picture='" + data.picture + "', " : "") +
                "position=" + data.position + " " +
                "WHERE id_inventory=" + data.id_inventory + " "
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deleteSlider: async function (id_inventory) {
        try {
            await mysql.connectAsync()
            var sql = 'DELETE FROM inventory WHERE id_inventory=' + id_inventory + " ";
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
                "FROM inventory "
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
            var sql = "UPDATE inventory SET " +
                "position='" + data.position + "' " +
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
            var sql = "UPDATE inventory SET " +
                "position=" + data.position + " " +
                "WHERE id_inventory=" + data.id_inventory + " "
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


