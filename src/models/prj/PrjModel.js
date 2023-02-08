import dbPool from '../../db/Config.js'

const SelectPrj = () => {
    const sql = `SELECT id,prj_name,status FROM prj`
    const query = dbPool.execute(sql)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,prj_name,status FROM prj WHERE id =${id}`
    const query = dbPool.execute(sql)
    return query
}

const InsertPrj = (prj_name, status) => {
    const sql = `INSERT INTO prj (prj_name,status) VALUES ('${prj_name}','${status}')`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectPrj,
    SelectById,
    InsertPrj
}