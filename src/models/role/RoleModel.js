import dbPool from '../../db/Config.js'

const Select = () => {
    const sql = 'SELECT id,role_name FROM role'
    const query = dbPool.execute(sql)
    return query
}

export default {
    Select
}