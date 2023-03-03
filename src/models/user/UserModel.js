import dbPool from '../../db/Config.js'

const SelectAll = (search, offset, limit) => {
    const sql = 'CALL showUser(?,?,?)'
    const value = [search, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectName = () => {
    const sql = `SELECT id AS user_id,name FROM user`
    const query = dbPool.execute(sql)
    return query
}

const SelectEmail = (email) => {
    const sql = `SELECT user.id,user.email,user.password,user.name,role,title.title_name AS title,divisi.divisi_name AS divisi FROM user
                 JOIN title JOIN divisi WHERE user.title_id = title.id AND user.divisi_id = divisi.id AND email LIKE '%${email}%'`
    const query = dbPool.execute(sql)
    return query
}

const CountRows = (search) => {
    const sql = `SELECT COUNT(email) AS email FROM user WHERE email LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const SelectManager = () => {
    const sql = `SELECT user.id,user.email,user.name,title.title_name 
                 FROM user JOIN title WHERE title.title_name REGEXP 'Manager|Sr Manager|Director'
                 AND NOT title_name REGEXP 'Site Manager' AND user.title_id = title.id`
    const query = dbPool.execute(sql)
    return query
}

const Insert = (email, name, password, role, title_id, divisi_id) => {
    const sql = `INSERT INTO user 
                (email,name,password,role,title_id,divisi_id) VALUES
                (?,?,?,?,?,?);`
    const value = [email, name, password, role, title_id, divisi_id]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectById = (id) => {
    const sql = 'CALL userById(?)'
    const query = dbPool.execute(sql, [id])
    return query
}

const Update = (email, name, role, title_id, divisi_id, id) => {
    const sql = `UPDATE user SET email=?,name=?,role=?,title_id=?, divisi_id=? WHERE id=?`
    const value = [email, name, role, title_id, divisi_id, id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdateWithPassword = (email, name, role, title_id, divisi_id, password, id) => {
    const sql = `UPDATE user SET email=?,name=?,role=?,title_id=?, divisi_id=?,password=? WHERE id=?`
    const value = [email, name, role, title_id, divisi_id, password, id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdateForUser = (email, name, id) => {
    const sql = `UPDATE user SET email=?,name=? WHERE id=?`
    const value = [email, name, id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdateForUserWithPassword = (email, name, password, id) => {
    const sql = `UPDATE user SET email=?,name=?,password=? WHERE id=?`
    const value = [email, name, password, id]
    const query = dbPool.execute(sql, value)
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM user WHERE id=?`
    const query = dbPool.execute(sql, [id])
    return query
}

const SelectPassword = (password) => {
    const sql = `SELECT * FROM user WHERE password = ?`
    const query = dbPool.execute(sql, [password])
    return query
}

const SelectUserAndTitle = () => {
    const sql = `SELECT
                user.id,
                user.name,
                title.title_name,
                title.rent_house,
                title.meal_allowance,
                title.hardship_allowance,
                title.pulsa_allowance,
                title.car_rent FROM user JOIN title WHERE user.title_id = title.id`
    const query = dbPool.execute(sql)
    return query
}

const SelectUserTitleById = (id) => {
    const sql = `SELECT
    user.id,
    user.name,
    title.title_name,
    title.rent_house,
    title.meal_allowance,
    title.hardship_allowance,
    title.pulsa_allowance,
    title.car_rent FROM user JOIN title WHERE user.title_id = title.id AND user.id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}
export default {
    SelectAll,
    SelectEmail,
    SelectPassword,
    SelectUserTitleById,
    SelectName,
    CountRows,
    SelectById,
    Insert,
    Update,
    UpdateWithPassword,
    UpdateForUser,
    UpdateForUserWithPassword,
    Delete,
    SelectManager,
    SelectUserAndTitle
}