import dbPool from '../../db/Config.js'

const SelectAll = (search, offset, limit) => {
    const sql = `SELECT user.id,user.email,user.name,role.role_name,title.title_name,title.rent_house,
                 title.meal_allowance,
                 title.hardship_allowance,
                 title.pulsa_allowance,
                 title.car_rent
                 FROM user JOIN role JOIN title
                 WHERE user.role = role.id AND user.title_id = title.id AND email LIKE '%${search}%' ORDER BY id DESC LIMIT ${offset},${limit}`
    const query = dbPool.execute(sql)
    return query
}

const SelectEmail = (email) => {
    const sql = `SELECT id,email,password,name,role,title_id FROM user WHERE email LIKE '%${email}%'`
    const query = dbPool.execute(sql)
    return query
}

const CountRows = (search) => {
    const sql = `SELECT COUNT(email) AS email FROM user WHERE email LIKE '%${search}%'`
    const query = dbPool.execute(sql)
    return query
}

const SelectManager = () => {
    const sql = `SELECT user.id,user.email,user.name,title.title_name FROM user JOIN title WHERE title.title_name LIKE '%Manager' AND user.title_id = title.id`
    const query = dbPool.execute(sql)
    return query
}

const Insert = (email, name, password, role, title_id) => {
    const sql = `INSERT INTO user 
                (email,name,password,role,title_id) VALUES
                ('${email}','${name}','${password}','${role}','${title_id}');`
    const query = dbPool.execute(sql)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT id,email,password,name,role,title_id FROM user WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const Update = (email, name, role, title_id, id) => {
    const sql = `UPDATE user SET email='${email}',name='${name}',role='${role}',title_id='${title_id}' WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM user WHERE id=${id}`
    const query = dbPool.execute(sql)
    return query
}

const SelectPassword = (password) => {
    const sql = `SELECT * FROM user WHERE password = '${password}'`
    const query = dbPool.execute(sql)
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
    title.car_rent FROM user JOIN title WHERE user.title_id = title.id AND user.id = ${id}`
    const query = dbPool.execute(sql)
    return query
}
export default {
    SelectAll,
    SelectEmail,
    SelectPassword,
    SelectUserTitleById,
    CountRows,
    SelectById,
    Insert,
    Update,
    Delete,
    SelectManager,
    SelectUserAndTitle
}