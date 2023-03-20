import dbPool from '../../db/Config.js'

const SelectPerdin = (search, offset, limit) => {
    const sql = `CALL showPerdin(?,?,?)`
    const value = [`%${search}%`, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectPerdinDaily = (search, offset, limit) => {
    const sql = `CALL showPerdinDaily(?,?,?)`
    const value = [`%${search}%`, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectPerdinDetail = (id) => {
    const sql = `CALL perdinDailyDetail(?)`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectPerdinDailyId = (id, search, offset, limit) => {
    const sql = `CALL showPerdinDailyById(?,?,?,?)`
    const value = [id, `%${search}%`, limit, offset]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertPerdin = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin
                 (prj_id,user_id,title_name,status_id,delegate_approval,official_travel_site,purposes,hotel,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent,transport,local_transport,airfare,airport_tax,entertainment,start_date,end_date,days,fee_support,tools,others,total_received) VALUES
                 (?,?,?,1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const value = [body.prj_id, body.user_id, body.title_name, body.delegate_approval,
    body.official_travel_site, body.hotel, body.rent_house,
    body.meal_allowance, body.hardship_allowance, body.pulsa_allowance,
    body.car_rent, body.transport, body.airfare, body.airport_tax, body.entertainment,
        start_date, end_date, body.days, body.fee_support, body.tools, body.others, body.total_received]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertPerdinDaily = (body, start_date, end_date) => {
    const sql = `CALL insertPerdinDaily(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const value = [body.prj_id, body.user_id, body.title_name, body.official_travel_site, body.purposes, body.hotel, body.rent_house,
    body.meal_allowance, body.hardship_allowance, body.pulsa_allowance, body.car_rent, body.transport, body.local_transport, body.airfare,
    body.airport_tax, body.entertainment, start_date, end_date, body.days, body.fee_support, body.tools, body.others, body.total_received]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertDivisiApproval = (perdin_id, prj_id, user_id) => {
    const sql = `INSERT INTO divisi_approval (perdin_id,prj_id,user_id,status_id) VALUES (?,?,?,1)`
    const value = [perdin_id, prj_id, user_id]
    const query = dbPool.execute(sql, value)
    return query
}

const InsertHcApproval = (perdin_id) => {
    const sql = `INSERT INTO hc_approval (perdin_id,status_id) VALUES (?,1)`
    const value = [perdin_id]
    const query = dbPool.execute(sql, value)
    return query
}

const waitingToApproveDivisi = () => {
    const sql = `CALL waitingToApproveDivisi()`
    const query = dbPool.execute(sql)
    return query
}

const waitingToApproveHc = () => {
    const sql = `CALL waitingToApproveHc()`
    const query = dbPool.execute(sql)
    return query
}

const UpdateApprovalByDivisi = (id) => {
    const sql = `UPDATE divisi_approval SET status_id = 4 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinDailyStatusByDivisi = (user_id, id) => {
    const sql = `UPDATE perdin_harian SET approved_divisi = ?, status_id = 2 WHERE id = ?`
    const value = [id, user_id]
    const query = dbPool.execute(sql, value)
    return query

}

const UpdateApprovalByHc = (id) => {
    const sql = `UPDATE hc_approval SET status_id = 4 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinDailyStatusByHc = (id) => {
    const sql = `UPDATE perdin_harian SET status_id = 3 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const CountPerdin = (search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin JOIN user WHERE user.name LIKE ?`
    const value = [`%${search}%`]
    const query = dbPool.execute(sql, value)
    return query
}

const CountPerdinDaily = (search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin_harian JOIN user WHERE perdin_harian.user_id = user.id AND user.name LIKE ?`
    const value = [`%${search}%`]
    const query = dbPool.execute(sql, value)
    return query
}

const CountPerdinDailyById = (id, search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin_harian JOIN user WHERE perdin_harian.user_id = user.id AND user.id = ? AND user.name LIKE ?`
    const value = [id, `%${search}%`]
    const query = dbPool.execute(sql, value)
    return query
}

export default {
    SelectPerdin,
    SelectPerdinDaily,
    SelectPerdinDailyId,
    SelectPerdinDetail,
    InsertPerdin,
    InsertPerdinDaily,
    InsertDivisiApproval,
    InsertHcApproval,
    waitingToApproveDivisi,
    waitingToApproveHc,
    UpdateApprovalByDivisi,
    UpdateApprovalByHc,
    UpdatePerdinDailyStatusByDivisi,
    UpdatePerdinDailyStatusByHc,
    CountPerdin,
    CountPerdinDaily,
    CountPerdinDailyById
}