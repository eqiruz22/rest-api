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
    const sql = `CALL insertPerdinDaily(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const value = [body.prj_id, body.user_id, body.title_name, body.maksud_perjalanan, body.tempat_tujuan, start_date, end_date, body.lama_perjalanan, body.transport_tujuan, body.transport_local, body.penginapan, body.meals, body.allowance, body.rapid_test, body.lain_lain, body.jumlah_advance]
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

const waitingToApproveDivisi = (search, offset, limit) => {
    const sql = `CALL waitingToApproveDivisi(?,?,?)`
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const waitingToApproveDivisiById = (id, search, offset, limit) => {
    const sql = `SELECT
    divisi_approval.id,
    divisi_approval.perdin_id,
    divisi_approval.prj_id,
    divisi_approval.user_id,
    divisi_approval.status_id,
    user.name,
    divisi.divisi_name,
    prj.prj_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.jumlah_advance,
    perdin_harian.title_name,
    perdin_harian.start_date,
    perdin_harian.end_date,
    status.proses FROM divisi_approval JOIN prj JOIN perdin_harian JOIN user JOIN status JOIN divisi
    WHERE user.divisi_id = divisi.id AND divisi_approval.perdin_id = perdin_harian.id 
    AND divisi_approval.prj_id = prj.id AND perdin_harian.user_id = user.id AND divisi_approval.status_id = status.id
    AND divisi_approval.user_id = ? AND user.name LIKE ? ORDER BY divisi_approval.id DESC LIMIT ? OFFSET ?`
    const query = dbPool.execute(sql, [id, `%${search}%`, limit, offset])
    return query
}

const waitingToApproveHc = (search, offset, limit) => {
    const sql = `SELECT
    hc_approval.id,
    hc_approval.perdin_id,
    hc_approval.status_id,
    user.name,
    divisi.divisi_name,
    prj.prj_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.jumlah_advance,
    perdin_harian.title_name,
    perdin_harian.start_date,
    perdin_harian.end_date,
    status.proses FROM hc_approval JOIN prj JOIN perdin_harian JOIN user JOIN status JOIN divisi
    WHERE user.divisi_id = divisi.id AND hc_approval.perdin_id = perdin_harian.id 
    AND perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id AND hc_approval.status_id = status.id
    AND user.name LIKE ? ORDER BY hc_approval.id DESC LIMIT ? OFFSET ?`
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const UpdateApprovalByDivisi = (id) => {
    const sql = `UPDATE divisi_approval SET status_id = 3 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinDailyStatusByDivisi = (id, user_id) => {
    const sql = `UPDATE perdin_harian SET status_id = 2, approved_divisi = ? WHERE id = ?`
    const value = [id, user_id]
    const query = dbPool.execute(sql, value)
    return query

}

const UpdateApprovalByHc = (id) => {
    const sql = `UPDATE hc_approval SET status_id = 3 WHERE id = ?`
    const value = [id]
    const query = dbPool.execute(sql, value)
    return query
}

const UpdatePerdinDailyStatusByHc = (id, user_id) => {
    const sql = `UPDATE perdin_harian SET approved_hc = ? WHERE id = ?`
    const value = [id, user_id]
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

const CountDivisiApproval = (search) => {
    const sql = `SELECT COUNT(divisi_approval.user_id) as divisi_count FROM divisi_approval
    JOIN user JOIN perdin_harian
    WHERE divisi_approval.perdin_id = perdin_harian.id AND perdin_harian.user_id = user.id AND user.name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const CountDivisiApprovalById = (id, search) => {
    const sql = `SELECT COUNT(divisi_approval.user_id) as divisi_count FROM divisi_approval 
    JOIN user JOIN perdin_harian 
    WHERE divisi_approval.perdin_id = perdin_harian.id AND perdin_harian.user_id = user.id AND divisi_approval.user_id = ? AND user.name LIKE ?`
    const query = dbPool.execute(sql, [id, `%${search}%`])
    return query
}

const CountApprovalHC = (search) => {
    const sql = `SELECT COUNT(hc_approval.perdin_id) as hc_count FROM hc_approval JOIN user JOIN perdin_harian WHERE hc_approval.perdin_id = perdin_harian.id AND perdin_harian.user_id = user.id AND user.name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const DeletePerdinDaily = (id) => {
    const sql = `DELETE FROM perdin_harian WHERE id = ?`
    const value = [id]
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
    waitingToApproveDivisiById,
    waitingToApproveHc,
    UpdateApprovalByDivisi,
    UpdateApprovalByHc,
    UpdatePerdinDailyStatusByDivisi,
    UpdatePerdinDailyStatusByHc,
    CountPerdin,
    CountPerdinDaily,
    CountPerdinDailyById,
    CountDivisiApproval,
    CountDivisiApprovalById,
    DeletePerdinDaily,
    CountApprovalHC
}