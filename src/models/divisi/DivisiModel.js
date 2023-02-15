import dbPool from '../../db/Config.js'

const InsertDivisi = (divisi_name, divisi_head) => {
    const sql = `INSERT INTO divisi (divisi_name,divisi_head) VALUES ('${divisi_name}','${divisi_head}')`
    const query = dbPool.execute(sql)
    return query
}

const SelectDivisiWithHead = () => {
    const sql = `SELECT divisi.id,divisi.divisi_name,user.name FROM divisi
                JOIN user WHERE divisi.divisi_head = user.id`
    const query = dbPool.execute(sql)
    return query
}

const SelectDivisiById = (id) => {
    const sql = `SELECT divisi.id,divisi.divisi_name,user.name FROM divisi
                JOIN user WHERE divisi.divisi_head = user.id AND divisi.id =${id}`
    const query = dbPool.execute(sql)
    return query
}

const UpdateDivisi = (divisi_name, divisi_head, id) => {
    const sql = `UPDATE divisi SET divisi_name='${divisi_name}',divisi_head='${divisi_head}' WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const DeleteDivisi = (id) => {
    const sql = `DELETE FROM divisi WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

export default {
    InsertDivisi,
    SelectDivisiWithHead,
    SelectDivisiById,
    UpdateDivisi,
    DeleteDivisi
}