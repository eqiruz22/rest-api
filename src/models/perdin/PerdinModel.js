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

const InsertHcApproval = (perdin_id, prj_id, user_id) => {
    const sql = `INSERT INTO hc_approval (perdin_id,prj_id,user_id,status_id) VALUES (?,?,?,1)`
    const value = [perdin_id, prj_id, user_id]
    const query = dbPool.execute(sql, value)
    return query
}

const waitingToApproveDivisi = () => {
    const sql = `SELECT divisi_approval.id,
                  user.name,
                  prj.prj_name,
                  perdin.official_travel_site,
                  perdin.total_received,
                  status.proses,
                  divisi_approval.perdin_id,
                  divisi_approval.prj_id,
                  divisi_approval.user_id,
                  divisi_approval.status_id FROM divisi_approval JOIN prj JOIN perdin JOIN user JOIN status 
                  WHERE divisi_approval.perdin_id = perdin.id 
                  AND divisi_approval.prj_id = prj.id AND divisi_approval.user_id = user.id AND divisi_approval.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const waitingToApproveHc = () => {
    const sql = `SELECT hc_approval.id,
                user.name,
                prj.prj_name,
                perdin.official_travel_site,
                perdin.total_received,
                status.proses,
                hc_approval.perdin_id,
                hc_approval.prj_id,
                hc_approval.user_id,
                hc_approval.status_id FROM hc_approval JOIN prj JOIN perdin JOIN user JOIN status 
                WHERE hc_approval.perdin_id = perdin.id 
                AND hc_approval.prj_id = prj.id AND hc_approval.user_id = user.id AND hc_approval.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const UpdateApprovalByDivisi = (id) => {
    const sql = `UPDATE divisi_approval SET status_id = 4 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinStatusByDivisi = (id) => {
    const sql = `UPDATE perdin SET status_id = 2 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query

}

const UpdateApprovalByHc = (id) => {
    const sql = `UPDATE hc_approval SET status_id = 4 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinStatusByHc = (id) => {
    const sql = `UPDATE perdin SET status_id = 3 WHERE id = ?`
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
    InsertPerdin,
    InsertPerdinDaily,
    InsertDivisiApproval,
    InsertHcApproval,
    waitingToApproveDivisi,
    waitingToApproveHc,
    UpdateApprovalByDivisi,
    UpdateApprovalByHc,
    UpdatePerdinStatusByDivisi,
    UpdatePerdinStatusByHc,
    CountPerdin,
    CountPerdinDaily,
    CountPerdinDailyById
}