import PrjModel from "../../models/prj/PrjModel.js";
import xlsx from 'xlsx'
const fetchPrj = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [count] = await PrjModel.CountPrj(search)
        const [row] = await PrjModel.SelectPrj(search, offset, limit)
        const totalPage = Math.ceil(count[0]['prj'] / limit)
        return res.status(200).json({
            message: 'Show prj',
            result: row,
            page: page,
            limit: limit,
            row: count[0]['prj'],
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error',
            Error: error
        })
    }
}

const createPrj = async (req, res) => {
    const prj_name = req.body.prj_name
    const project = req.body.project_name
    const status = req.body.status

    if (!req.body.prj_name) {
        return res.status(400).json({
            message: 'Prj Name must be have a value'
        })
    }
    if (!req.body.project_name) {
        return res.status(400).json({
            message: 'Project name is required!'
        })
    }

    if (!req.body.status) {
        return res.status(400).json({
            message: 'Status must be open or closed'
        })
    }
    try {
        await PrjModel.InsertPrj(prj_name, project, status)
        return res.status(200).json({
            message: 'Succes create new PRJ'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while created PRJ',
            Error: error
        })
    }
}

const fetchById = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await PrjModel.SelectById(id)
        return res.status(200).json({ message: 'show by id', result: row })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'error while fetching data', error: error })
    }
}

const updatePrj = async (req, res) => {
    let id = req.params.id
    const prj_name = req.body.prj_name
    const project = req.body.project_name
    const status = req.body.status

    if (!req.body.prj_name) {
        return res.status(400).json({ message: 'PRJ name cannot be null' })
    }
    if (!req.body.project_name) {
        return res.status(400).json({ message: 'Project name is required!' })
    }
    if (!req.body.status) {
        return res.status(400).json({ message: 'status prj must be open or closed' })
    }

    try {
        const [data] = await PrjModel.SelectById(id)
        if (data.length < 1) {
            return res.status(404).json({
                message: `Project id ${id} not found`
            })
        } else {
            await PrjModel.UpdatePrj(prj_name, project, status, id)
            return res.status(200).json({ message: 'Update success' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while update',
            error: error
        })
    }
}

const destroyPrj = async (req, res) => {
    let id = req.params.id
    try {
        const [data] = await PrjModel.SelectById(id)
        if (data.length < 1) {
            return res.status(404).json({
                message: `Project id ${id} not found`
            })
        } else {
            await PrjModel.DeletePrj(id)
            return res.status(200).json({ message: 'Delete success' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error while delete data' })
    }
}

const ListPrj = async (req, res) => {
    try {
        const [data] = await PrjModel.SelectPrjAll()
        return res.status(200).json({
            message: 'show prj',
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

const getReportPrj = async (req, res) => {
    try {
        const [rows] = await PrjModel.ForReportPrj()
        const header = ['#', 'PRJ Name', 'Project Name', 'Status']
        const data = rows.map((row, index) => [index + 1, row.prj_name, row.project_name, row.status])
        const withHeader = [header, ...data]
        const worksheet = new xlsx.utils.aoa_to_sheet(withHeader)
        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, worksheet, 'PRJ')
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=prj_report.xlsx');

        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })
        console.log('Success generate report')
        return res.status(200).send(buffer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to generate report'
        })
    }
}



export default {
    fetchPrj,
    fetchById,
    createPrj,
    updatePrj,
    destroyPrj,
    ListPrj,
    getReportPrj
}