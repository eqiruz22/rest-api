import dbPool from '../../db/Config.js'

const SelectPrj = (search, offset, limit) => {
    const sql = `SELECT id,prj_name,status FROM prj WHERE prj_name LIKE '%${search}%' ORDER BY id DESC LIMIT ${offset},${limit}`
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

const UpdatePrj = (prj_name, status, id) => {
    const sql = `UPDATE prj SET prj_name='${prj_name}',status='${status}' WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const DeletePrj = (id) => {
    const sql = `DELETE FROM prj WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const CountPrj = (search) => {
    const sql = `SELECT COUNT(prj_name) AS prj FROM prj WHERE prj_name LIKE '%${search}%'`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectPrj,
    SelectById,
    InsertPrj,
    UpdatePrj,
    DeletePrj,
    CountPrj
}