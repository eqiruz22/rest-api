import dbPool from '../../db/Config.js'

const SelectPrj = (search, offset, limit) => {
    const sql = `SELECT id,prj_name,project_name,status FROM prj WHERE prj_name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`
    const value = [`%${search}%`, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,prj_name,project_name,status FROM prj WHERE id =?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertPrj = (prj_name, project, status) => {
    const sql = `INSERT INTO prj (prj_name,project_name,status) VALUES (?,?,?)`
    const value = [prj_name, project, status]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePrj = (prj_name, project, status, id) => {
    const sql = `UPDATE prj SET prj_name=?,project_name=?,status=? WHERE id=?`
    const value = [prj_name, project, status, id]
    const query = dbPool.execute(sql, value)
    return query
}

const DeletePrj = (id) => {
    const sql = `DELETE FROM prj WHERE id=?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const CountPrj = (search) => {
    const sql = `SELECT COUNT(prj_name) AS prj FROM prj WHERE prj_name LIKE ?`
    const value = [`%${search}%`]
    const query = dbPool.execute(sql, value)
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