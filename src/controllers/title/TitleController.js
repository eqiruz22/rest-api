import TitleModel from "../../models/title/TitleModel.js";

const showTitle = async (req, res) => {
    try {
        const [response] = await TitleModel.SelectTitle()
        res.status(200)
            .json({
                message: 'Success show title',
                value: response
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error...',
                ErrorMessage: error
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
        return res.status(401)
            .json({
                message: 'title is required'
            })
    }
    if (!req.body.meal) {
        return res.status(401)
            .json({
                message: 'meal allowance is required'
            })
    }
    if (!req.body.rent) {
        return res.status(401)
            .json({
                message: 'rent house is required'
            })
    }
    if (!req.body.hardship) {
        return res.status(401)
            .json({
                message: 'hardship allowance is required'
            })
    }
    if (!req.body.pulsa) {
        return res.status(401)
            .json({
                message: 'pulsa allowance is required'
            })
    }
    if (!req.body.car) {
        return res.status(401)
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
        return res.status(500)
            .json({
                message: 'Error...',
                errorMessage: error.message
            })
    }
}

const findById = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await TitleModel.SelectById(id)
        if (row.length < 1) {
            return res.json({
                message: 'Not found'
            })
        }
        return res.json({
            message: 'show title',
            value: row
        })
    } catch (error) {
        res.json({
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
        return res.status(401)
            .json({
                message: 'title is required'
            })
    }
    if (!req.body.meal) {
        return res.status(401)
            .json({
                message: 'meal allowance is required'
            })
    }
    if (!req.body.rent) {
        return res.status(401)
            .json({
                message: 'rent house is required'
            })
    }
    if (!req.body.hardship) {
        return res.status(401)
            .json({
                message: 'hardship allowance is required'
            })
    }
    if (!req.body.pulsa) {
        return res.status(401)
            .json({
                message: 'pulsa allowance is required'
            })
    }
    if (!req.body.car) {
        return res.status(401)
            .json({
                message: 'car rent is required'
            })
    }
    try {
        const data = await TitleModel.Update(title, meal, rent, hardship, pulsa, car, id)
        res.json({
            message: 'Update Success',
            value: data
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}

const destroyTitle = async (req, res) => {
    let id = req.params.id
    try {
        await TitleModel.Delete(id)
        res.json({
            message: 'Update success'
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}

export default {
    showTitle,
    createTitle,
    findById,
    UpdateById,
    destroyTitle
}