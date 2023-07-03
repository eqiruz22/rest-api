import dbPool from '../../db/Config.js'

const SelectTitle = (search, offset, limit) => {
    const sql = `SELECT id,title_name FROM title WHERE title_name LIKE ? ORDER BY id LIMIT ? OFFSET ?`
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const InsertTitle = (title) => {
    const sql = `INSERT INTO title (title_name) VALUES (?)`
    const query = dbPool.execute(sql, [title])
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,title_name FROM title WHERE id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

const Update = (title, id) => {
    const sql = `UPDATE title SET title_name=? WHERE id =?`
    const query = dbPool.execute(sql, [title, id])
    return query
}

const CountTitle = (search) => {
    const sql = `SELECT COUNT(title_name) AS title FROM title WHERE title_name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM title WHERE id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

const SelectTitleName = () => {
    const sql = `SELECT id,title_name FROM title`
    const query = dbPool.execute(sql)
    return query
}

const SelectTitleTest = () => {
    const sql = `SELECT * FROM title`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectTitle,
    InsertTitle,
    SelectById,
    CountTitle,
    Update,
    Delete,
    SelectTitleName,
    SelectTitleTest
}