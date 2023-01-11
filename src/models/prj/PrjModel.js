import dbPool from '../../db/Config.js'

const SelectId = () => {
    const sql = `SELECT id,prj_name FROM prj`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectId
}