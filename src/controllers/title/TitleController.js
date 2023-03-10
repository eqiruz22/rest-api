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
        return res.status(200)
            .json({
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
    const title = req.body.title
    const meal = req.body.meal
    const rent = req.body.rent
    const hardship = req.body.hardship
    const pulsa = req.body.pulsa
    const car = req.body.car

    if (!req.body.title) {
        return res.status(400)
            .json({
                message: 'title is required'
            })
    }
    if (!req.body.meal) {
        return res.status(400)
            .json({
                message: 'meal allowance is required'
            })
    }
    if (!req.body.rent) {
        return res.status(400)
            .json({
                message: 'rent house is required'
            })
    }
    if (!req.body.hardship) {
        return res.status(400)
            .json({
                message: 'hardship allowance is required'
            })
    }
    if (!req.body.pulsa) {
        return res.status(400)
            .json({
                message: 'pulsa allowance is required'
            })
    }
    if (!req.body.car) {
        return res.status(400)
            .json({
                message: 'car rent is required'
            })
    }
    try {
        await TitleModel.InsertTitle(title, rent, meal, hardship, pulsa, car)
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
                message: 'Not found'
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
    const title = req.body.title
    const meal = req.body.meal
    const rent = req.body.rent
    const hardship = req.body.hardship
    const pulsa = req.body.pulsa
    const car = req.body.car

    if (!req.body.title) {
        return res.status(400)
            .json({
                message: 'title is required'
            })
    }
    if (!req.body.meal) {
        return res.status(400)
            .json({
                message: 'meal allowance is required'
            })
    }
    if (!req.body.rent) {
        return res.status(400)
            .json({
                message: 'rent house is required'
            })
    }
    if (!req.body.hardship) {
        return res.status(400)
            .json({
                message: 'hardship allowance is required'
            })
    }
    if (!req.body.pulsa) {
        return res.status(400)
            .json({
                message: 'pulsa allowance is required'
            })
    }
    if (!req.body.car) {
        return res.status(400)
            .json({
                message: 'car rent is required'
            })
    }
    try {
        const data = await TitleModel.Update(title, meal, rent, hardship, pulsa, car, id)
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
        await TitleModel.Delete(id)
        return res.status(200).json({
            message: 'Update success'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error while'
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

export default {
    showTitle,
    createTitle,
    findById,
    UpdateById,
    destroyTitle,
    fetchTitleName
}