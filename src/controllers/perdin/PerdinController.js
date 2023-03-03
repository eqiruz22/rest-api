import PerdinModel from "../../models/perdin/PerdinModel.js";
import UserModel from "../../models/user/UserModel.js";
import DivisiModel from "../../models/divisi/DivisiModel.js";

const showPerdin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdin(search)
        const [data] = await PerdinModel.SelectPerdin(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        res.status(200)
            .json({
                message: 'Show All data perdin',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: 'Error while fetching perdin',
                result: error
            })
    }
}

const showPerdinDaily = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdinDaily(search)
        const [data] = await PerdinModel.SelectPerdinDaily(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        if (data.length < 1) {
            return res.status(201)
                .json({
                    message: 'no data perdin for show',
                    result: data,
                    page: page,
                    limit: limit,
                    row: totalRow[0]['perdin'],
                    totalPage: totalPage
                })
        }
        return res.status(200)
            .json({
                message: 'success get data perdin',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error while fetching perdin',
                error: error
            })
    }
}

const showPerdinDailyById = async (req, res) => {
    let id = req.params.id
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdinDailyById(id, search)
        const [data] = await PerdinModel.SelectPerdinDailyId(id, search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        if (data.length < 1) {
            return res.status(201)
                .json({
                    message: 'no data perdin for show by id',
                    result: data,
                    page: page,
                    limit: limit,
                    row: totalRow[0]['perdin'],
                    totalPage: totalPage
                })
        }
        return res.status(200)
            .json({
                message: 'show data perdin by id',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching perdin by id',
            error: error
        })
    }
}

const createPerdin = async (req, res) => {
    let { body } = req
    const formatDateStart = (start) => {
        const d = new Date(start)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const formatDateEnd = (end) => {
        const d = new Date(end)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const start = req.body.start_date
    const end = req.body.end_date
    const formatStartDate = formatDateStart(start)
    const formatEndDate = formatDateEnd(end)

    if (!req.body) {
        return res.json({
            message: 'All field is required'
        })
    }

    try {
        const data = await PerdinModel.InsertPerdin(body, formatStartDate, formatEndDate)
        return res.status(201)
            .json({
                message: 'Success create perdin',
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                result: error
            })
    }
}

const createPerdinDaily = async (req, res) => {
    const { body } = req
    const start = req.body.start_date
    const end = req.body.end_date
    const startDate = (start) => {
        const d = new Date(start)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    const endDate = (end) => {
        const d = new Date(end)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'all field is required'
        })
    }

    const resultStart = startDate(start)
    const resultEnd = endDate(end)
    try {
        const dailyPerdin = await PerdinModel.InsertPerdinDaily(body, resultStart, resultEnd)
        const [userId] = await UserModel.SelectById(req.body.user_id)
        const insertId = dailyPerdin[0][0][0]['LAST_INSERT_ID()']
        const name = userId[0][0]['divisi_name']
        const [divisi] = await DivisiModel.SelectDivisiName(name)
        const [forApprovalManager] = await UserModel.SelectById(divisi[0]['divisi_manager'])
        const [forApprovaldivHead] = await UserModel.SelectById(divisi[0]['divisi_head'])
        console.log(insertId)
        if (userId[0][0]['title_name'] === 'Manager' || userId[0][0]['title_name'] === 'Sr Manager') {
            if (dailyPerdin[0][1].affectedRows === 1) {
                const insertTodivisiHead = await PerdinModel.InsertDivisiApproval(insertId, req.body.prj_id, forApprovaldivHead[0][0]['id'])
                return res.status(201).json({
                    message: 'perdin berhasil dibuat & approval dikirim ke divisi head',
                    userId: userId[0][0],
                    divisi_head: forApprovaldivHead[0][0],
                    insertTodivisiHead: insertTodivisiHead
                })
            }
        } else {
            if (dailyPerdin[0][1].affectedRows === 1) {
                const insertToManager = await PerdinModel.InsertDivisiApproval(insertId, req.body.prj_id, forApprovalManager[0][0]['id'])
                return res.status(201).json({
                    message: 'perdin berhasil dibuat & approval dikirim ke manager divisi',
                    userId: userId[0][0],
                    manager_data: forApprovalManager[0][0],
                    insertToManager: insertToManager
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
}

const showWaitingToDivisi = async (req, res) => {
    try {
        const [row] = await PerdinModel.waitingToApproveDivisi()
        res.status(200)
            .json({
                message: 'Succes to show',
                result: row
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const updateApprovedDivisi = async (req, res) => {
    const id = req.body.id
    const perdin_id = req.body.perdin_id
    const prj_id = req.body.prj_id
    const user_id = req.body.user_id
    const status_id = req.body.status_id

    try {
        const data1 = await PerdinModel.UpdateApprovalByDivisi(id)
        const data2 = await PerdinModel.UpdatePerdinStatusByDivisi(perdin_id)
        const data3 = await PerdinModel.InsertHcApproval(perdin_id, prj_id, user_id)
        send()
        res.status(200)
            .json({
                message: 'Update success',
                result: {
                    data1: data1,
                    data2: data2,
                    data3: data3
                }
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const showWaitingToHc = async (req, res) => {
    try {
        const [row] = await PerdinModel.waitingToApproveHc()
        res.status(200)
            .json({
                message: 'Show waiting',
                result: row
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const updateApprovedHc = async (req, res) => {
    const perdin_id = req.body.perdin_id
    const id = req.body.id
    try {
        const data1 = await PerdinModel.UpdateApprovalByHc(id)
        const data2 = await PerdinModel.UpdatePerdinStatusByHc(perdin_id)
        return res.status(201).json({
            message: 'Updated'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

export default {
    showPerdin,
    showPerdinDaily,
    showPerdinDailyById,
    createPerdin,
    createPerdinDaily,
    showWaitingToDivisi,
    showWaitingToHc,
    updateApprovedDivisi,
    updateApprovedHc
}