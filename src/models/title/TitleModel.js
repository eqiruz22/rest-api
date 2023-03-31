import dbPool from '../../db/Config.js'

const SelectTitle = (search, offset, limit) => {
    const sql = `SELECT id,title_name FROM title WHERE title_name LIKE ? ORDER BY id LIMIT ? OFFSET ?`
    const value = [`%${search}%`, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertTitle = (title) => {
    const sql = `INSERT INTO title 
                (title_name) 
                VALUES (?)`
    const value = [title]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,title_name FROM title WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const Update = (title, id) => {
    const sql = `UPDATE title SET title_name=? WHERE id =?`
    const value = [title, id]
    const query = dbPool.execute(sql, value)
    return query
}

const CountTitle = (search) => {
    const sql = `SELECT COUNT(title_name) AS title FROM title WHERE title_name LIKE ?`
    const value = [`%${search}%`]
    const query = dbPool.execute(sql, value)
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM title WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
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