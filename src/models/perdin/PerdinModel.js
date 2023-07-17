import dbPool from '../../db/Config.js'

const SelectPerdin = (search, offset, limit) => {
    const sql = `SELECT
    perdin.id, perdin.title_name, perdin.official_travel_site, perdin.purposes, perdin.hotel, perdin.transport, perdin.local_transport, perdin.airfare, perdin.airport_tax, perdin.entertainment, perdin.start_date, perdin.end_date, perdin.fee_support, perdin.tools, perdin.others, prj.prj_name, user.name, status.proses, perdin.status_id, perdin.total_received 
        FROM perdin 
        JOIN prj ON perdin.prj_id = prj.id 
        JOIN user ON perdin.user_id = user.id 
        JOIN status ON perdin.status_id = status.id
        WHERE user.name LIKE ? 
        ORDER BY perdin.id DESC 
        LIMIT ? 
        OFFSET ?`
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const SelectPerdinDaily = (search, offset, limit) => {
    const sql = `SELECT
    perdin_harian.id,
    perdin_harian.title_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.tempat_tujuan,
    perdin_harian.start_date,
    perdin_harian.end_date,
    perdin_harian.lama_perjalanan,
    perdin_harian.transport_tujuan,
    perdin_harian.transport_local,
    perdin_harian.penginapan,
    perdin_harian.meals,
    perdin_harian.allowance,
    perdin_harian.rapid,
    perdin_harian.lain,
    perdin_harian.jumlah_advance,
    perdin_harian.approved_divisi,
    perdin_harian.approved_hc,
    divisi.divisi_name,
    COALESCE(divisi_appr.name,'waiting approval') AS approved_divisi,
    COALESCE(hc_appr.name,'waiting approval') AS approved_hc,
    user.name,
    prj.prj_name,
    status.proses,
    perdin_harian.status_id, perdin_harian.user_id FROM perdin_harian JOIN prj JOIN user JOIN divisi
    LEFT JOIN user AS divisi_appr ON perdin_harian.approved_divisi = divisi_appr.id
    LEFT JOIN user AS hc_appr ON perdin_harian.approved_hc = hc_appr.id JOIN status
    WHERE perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id AND perdin_harian.status_id = status.id
    AND user.divisi_id = divisi.id AND user.name LIKE ? ORDER BY perdin_harian.id DESC LIMIT ? OFFSET ?`
    const query = dbPool.execute(sql, [`%${search}%`, limit, offset])
    return query
}

const SelectPerdinDetail = (id) => {
    const sql = `SELECT
    perdin_harian.id,
    perdin_harian.title_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.tempat_tujuan,
    perdin_harian.start_date,
    perdin_harian.end_date,
    perdin_harian.lama_perjalanan,
    perdin_harian.transport_tujuan,
    perdin_harian.transport_local,
    perdin_harian.penginapan,
    perdin_harian.meals,
    perdin_harian.allowance,
    perdin_harian.rapid,
    perdin_harian.lain,
    perdin_harian.jumlah_advance,
    perdin_harian.approved_divisi,
    perdin_harian.approved_hc,
    perdin_harian.zone_id,
    perdin_harian.prj_id,
    zone.zone_name,
    user.name,
    prj.prj_name,
    prj.project_name,
    perdin_harian.user_id FROM perdin_harian JOIN zone JOIN user JOIN prj
    WHERE perdin_harian.zone_id = zone.id AND perdin_harian.user_id = user.id AND perdin_harian.prj_id = prj.id AND perdin_harian.id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

const SelectPerdinDailyId = (id, search, offset, limit) => {
    const sql = `SELECT
    perdin_harian.id,
    perdin_harian.title_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.tempat_tujuan,
    perdin_harian.start_date,
    perdin_harian.end_date,
    perdin_harian.lama_perjalanan,
    perdin_harian.transport_tujuan,
    perdin_harian.transport_local,
    perdin_harian.penginapan,
    perdin_harian.meals,
    perdin_harian.allowance,
    perdin_harian.rapid,
    perdin_harian.lain,
    perdin_harian.jumlah_advance,
    perdin_harian.approved_divisi,
    perdin_harian.approved_hc,
    divisi.divisi_name,
    COALESCE(divisi_appr.name,'waiting approval') AS approved_divisi,
    COALESCE(hc_appr.name,'waiting approval') AS approved_hc,
    user.name,
    prj.prj_name,
    status.proses,
    perdin_harian.status_id, perdin_harian.user_id FROM perdin_harian JOIN prj JOIN user JOIN divisi
    LEFT JOIN user AS divisi_appr ON perdin_harian.approved_divisi = divisi_appr.id
    LEFT JOIN user AS hc_appr ON perdin_harian.approved_hc = hc_appr.id JOIN status
    WHERE perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id AND perdin_harian.status_id = status.id
    AND user.divisi_id = divisi.id AND user.id = ? AND user.name LIKE ? ORDER BY perdin_harian.id DESC LIMIT ? OFFSET ?`
    const query = dbPool.execute(sql, [id, `%${search}%`, limit, offset])
    return query
}

const InsertPerdin = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin
                 (prj_id,user_id,title_name,status_id,delegate_approval,official_travel_site,purposes,hotel,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent,transport,local_transport,airfare,airport_tax,entertainment,start_date,end_date,days,fee_support,tools,others,total_received) VALUES
                 (?,?,?,1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const query = dbPool.execute(sql, [body.prj_id, body.user_id, body.title_name, body.delegate_approval,
    body.official_travel_site, body.hotel, body.rent_house,
    body.meal_allowance, body.hardship_allowance, body.pulsa_allowance,
    body.car_rent, body.transport, body.airfare, body.airport_tax, body.entertainment,
        start_date, end_date, body.days, body.fee_support, body.tools, body.others, body.total_received])
    return query
}

const InsertPerdinDaily = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin_harian
    (prj_id,user_id,title_name,zone_id,status_id,maksud_perjalanan,tempat_tujuan,start_date,end_date,lama_perjalanan,transport_tujuan,transport_local,penginapan,meals,allowance,rapid,lain,jumlah_advance,approved_divisi,approved_hc)
    VALUES (?,?,?,?,1,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0);`
    const query = dbPool.execute(sql, [body.prj_id, body.user_id, body.title_name, body.zone_id, body.maksud_perjalanan, body.tempat_tujuan, start_date, end_date, body.lama_perjalanan, body.transport_tujuan, body.transport_local, body.penginapan, body.meals, body.allowance, body.rapid, body.lain, body.jumlah_advance])
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
    AND user.name LIKE ? ORDER BY divisi_approval.id DESC LIMIT ? OFFSET ?`
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

const UpdatePerdin = (prj_id, user_id, title_name, zone_id, maksud_perjalanan, tempat_tujuan, start_date, end_date, lama_perjalanan, transport_tujuan, transport_local, penginapan, meals, allowance, rapid, lain, jumlah_advance, id) => {
    const sql = `UPDATE perdin_harian SET prj_id = ?, user_id = ?, title_name = ?, zone_id = ?, maksud_perjalanan = ?, tempat_tujuan = ?, start_date = ?, end_date = ?, lama_perjalanan = ?, transport_tujuan = ?, transport_local = ?, penginapan = ?, meals = ?, allowance = ?, rapid = ?, lain = ?, jumlah_advance = ? WHERE id = ?`
    const query = dbPool.execute(sql, [prj_id, user_id, title_name, zone_id, maksud_perjalanan, tempat_tujuan, start_date, end_date, lama_perjalanan, transport_tujuan, transport_local, penginapan, meals, allowance, rapid, lain, jumlah_advance, id])
    return query
}

const UpdateApprovalByDivisi = (id) => {
    const sql = `UPDATE divisi_approval SET status_id = 3 WHERE id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

const UpdatePerdinDailyStatusByDivisi = (id, user_id) => {
    const sql = `UPDATE perdin_harian SET status_id = 2, approved_divisi = ? WHERE id = ?`
    const value = [id, user_id]
    const query = dbPool.execute(sql, [id, user_id])
    return query

}

const UpdateApprovalByHc = (id) => {
    const sql = `UPDATE hc_approval SET status_id = 3 WHERE id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

const UpdatePerdinDailyStatusByHc = (id, user_id) => {
    const sql = `UPDATE perdin_harian SET approved_hc = ? WHERE id = ?`
    const query = dbPool.execute(sql, [id, user_id])
    return query
}

const CountPerdin = (search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin JOIN user WHERE user.name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const CountPerdinDaily = (search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin_harian JOIN user WHERE perdin_harian.user_id = user.id AND user.name LIKE ?`
    const query = dbPool.execute(sql, [`%${search}%`])
    return query
}

const CountPerdinDailyById = (id, search) => {
    const sql = `SELECT COUNT(user.name) as perdin FROM perdin_harian JOIN user WHERE perdin_harian.user_id = user.id AND user.id = ? AND user.name LIKE ?`
    const query = dbPool.execute(sql, [id, `%${search}%`])
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
    const query = dbPool.execute(sql, [id])
    return query
}

const ForReportPerdinDaily = () => {
    const sql = `SELECT
    perdin_harian.id,
    perdin_harian.title_name,
    perdin_harian.maksud_perjalanan,
    perdin_harian.tempat_tujuan,
    perdin_harian.start_date,
    perdin_harian.end_date,
    perdin_harian.lama_perjalanan,
    perdin_harian.transport_tujuan,
    perdin_harian.transport_local,
    perdin_harian.penginapan,
    perdin_harian.meals,
    perdin_harian.allowance,
    perdin_harian.rapid,
    perdin_harian.lain,
    perdin_harian.jumlah_advance,
    perdin_harian.approved_divisi,
    perdin_harian.approved_hc,
    zone.zone_name,
    divisi.divisi_name,
    COALESCE(divisi_appr.name,'waiting approval') AS approved_divisi,
    COALESCE(hc_appr.name,'waiting approval') AS approved_hc,
    user.name,
    prj.prj_name,
    status.proses,
    perdin_harian.status_id, perdin_harian.user_id FROM perdin_harian JOIN prj JOIN user JOIN divisi JOIN zone
    LEFT JOIN user AS divisi_appr ON perdin_harian.approved_divisi = divisi_appr.id
    LEFT JOIN user AS hc_appr ON perdin_harian.approved_hc = hc_appr.id JOIN status
    WHERE perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id AND perdin_harian.status_id = status.id
    AND user.divisi_id = divisi.id AND perdin_harian.zone_id = zone.id`
    const query = dbPool.execute(sql)
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
    CountApprovalHC,
    UpdatePerdin,
    ForReportPerdinDaily
}