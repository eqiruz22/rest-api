import dbPool from '../../db/Config.js'

const SelectAll = (search, offset, limit) => {
    const sql = `SELECT id,email,name,password,role FROM user WHERE email LIKE '%${search}%' ORDER BY id DESC LIMIT ${offset},${limit}`
    const query = dbPool.execute(sql)
    return query
}

const CountRows = (search) => {
    const sql = `SELECT COUNT(email) AS email FROM user WHERE email LIKE '%${search}%'`
    const query = dbPool.execute(sql)
    return query
}


const Insert = (email, name, password, role) => {
    const sql = `INSERT INTO user 
                (email,name,password,role) VALUES
                ('${email}','${name}','${password}','${role}');`
    const query = dbPool.execute(sql)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,email,name,role FROM user WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const Update = (email, name, role, id) => {
    const sql = `UPDATE user SET email='${email}','${name}',role='${role}' WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM user WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectAll,
    CountRows,
    SelectById,
    Insert,
    Update,
    Delete
}