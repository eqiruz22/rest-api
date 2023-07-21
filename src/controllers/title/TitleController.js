import Email from "../../helper/Email.js";
import TitleModel from "../../models/title/TitleModel.js";

const showTitle = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [count] = await TitleModel.CountTitle(search)
        const [response] = await TitleModel.SelectTitle(search, offset, limit)
        const totalPage = Math.ceil(count[0]['title'] / limit)
        return res.status(200).json({
            message: 'Success show title',
            value: response,
            page: page,
            limit: limit,
            row: count[0]['title'],
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error...',
                error: error
            })
    }
}

const createTitle = async (req, res) => {
    const title = req.body.title_name

    if (!req.body.title_name) {
        return res.status(400)
            .json({
                message: 'title is required'
            })
    }
    try {
        await TitleModel.InsertTitle(title)
        return res.status(200)
            .json({
                message: 'Success create new title'
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error...',
                error: error
            })
    }
}

const findById = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await TitleModel.SelectById(id)
        if (row.length < 1) {
            return res.status(404).json({
                message: `Title id ${id} not found`
            })
        }
        return res.status(200).json({
            message: 'show title',
            value: row
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

const UpdateById = async (req, res) => {
    let id = req.params.id
    const title = req.body.title_name

    if (!req.body.title_name) {
        return res.status(400)
            .json({
                message: 'title is required'
            })
    }
    try {
        const data = await TitleModel.Update(title, id)
        return res.status(200).json({
            message: 'Update Success',
            value: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
}

const destroyTitle = async (req, res) => {
    let id = req.params.id
    try {
        const [data] = await TitleModel.SelectById(id)
        if (data.length < 1) {
            return res.status(404).json({
                message: `Title id ${id} not found`
            })
        } else {
            await TitleModel.Delete(id)
            return res.status(200).json({
                message: 'Deleted'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

const fetchTitleName = async (req, res) => {
    try {
        const [row] = await TitleModel.SelectTitleName()
        return res.status(200).json({
            message: 'Show title name',
            result: row
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error fetching title',
            error: error
        })
    }
}

const ForTest = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        // const [row] = await TitleModel.SelectTitleTest()
        // res.writeHead(200, { 'Content-Type': 'application/json' })
        // return res.end(JSON.stringify({
        //     result: row
        // }))
        const send = await Email.sendEmail(data.email, data.name)
        console.log(send)
        return res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error)
        // res.writeHead(500, { 'Content-Type': 'application/json' })
        // return res.end(JSON.stringify({
        //     message: 'Internal server error'
        // }))
        return res.status(500).json({
            error
        })
    }
}

export default {
    showTitle,
    createTitle,
    findById,
    UpdateById,
    destroyTitle,
    fetchTitleName,
    ForTest
}