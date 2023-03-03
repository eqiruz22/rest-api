import dbPool from '../../db/Config.js'

const InsertDivisi = (divisi_name, divisi_manager, divisi_head) => {
    const sql = `INSERT INTO divisi (divisi_name,divisi_manager,divisi_head) VALUES (?,?,?)`
    const query = dbPool.execute(sql, [divisi_name, divisi_manager, divisi_head])
    return query
}

const SelectDivisi = () => {
    const sql = `SELECT id,divisi_name FROM divisi`
    const query = dbPool.execute(sql)
    return query
}

const SelectDivisiWithHead = (search, offset, limit) => {
    const sql = `SELECT divisi.id,divisi.divisi_name,manager.name AS divisi_manager,user.name FROM divisi
                JOIN user AS manager ON divisi.divisi_manager = manager.id JOIN user ON divisi.divisi_head = user.id 
                WHERE divisi.divisi_head = user.id AND divisi.divisi_name LIKE ? ORDER BY divisi.id DESC LIMIT ? OFFSET ? `
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const CountDivisi = (search) => {
    const sql = `SELECT COUNT(divisi_name) as divisi FROM divisi WHERE divisi_name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const SelectDivisiById = (id) => {
    const sql = `SELECT divisi.id, divisi.divisi_name, divisi.divisi_manager AS manager_id,divisi.divisi_head AS head_id, manager.name AS divisi_manager, user.name AS divisi_of_head FROM divisi
                 JOIN user AS manager ON divisi.divisi_manager = manager.id JOIN user ON divisi.divisi_head = user.id WHERE divisi.id =?`
    const query = dbPool.execute(sql, [id])
    return query
}

const UpdateDivisi = (divisi_name, divisi_manager, divisi_head, id) => {
    const sql = `UPDATE divisi SET divisi_name=?,divisi_manager=?,divisi_head=? WHERE id=?`
    const value = [divisi_name, divisi_manager, divisi_head, id]
    const query = dbPool.execute(sql, value)
    return query
}

const DeleteDivisi = (id) => {
    const sql = `DELETE FROM divisi WHERE id=?`
    const query = dbPool.execute(sql, [id])
    return query
}

const SelectDivisiName = (divisi_name) => {
    const sql = `SELECT id,divisi_name,divisi_manager,divisi_head FROM divisi WHERE divisi_name = ?`
    const query = dbPool.execute(sql, [divisi_name])
    return query
}

export default {
    InsertDivisi,
    SelectDivisi,
    SelectDivisiWithHead,
    SelectDivisiById,
    UpdateDivisi,
    DeleteDivisi,
    CountDivisi,
    SelectDivisiName
}