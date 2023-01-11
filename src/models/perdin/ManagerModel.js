import dbPool from '../../db/Config.js'

const waitingToApprove = () => {
    const sql = `SELECT manager_approval.id,
                  user.name,
                  prj.prj_name,
                  perdin.official_travel_site,
                  perdin.total_received,
                  status.proses FROM manager_approval JOIN prj JOIN perdin JOIN user JOIN status 
                  WHERE manager_approval.perdin_id = perdin.id 
                  AND manager_approval.prj_id = prj.id AND manager_approval.user_id = user.id AND manager_approval.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

export default {
    waitingToApprove
}