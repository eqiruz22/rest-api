import Role from "../../models/role/RoleModel.js";

const showAll = async (req, res) => {
    try {
        const [rows, fields] = await Role.Select()
        if (rows.length < 1) {
            return res.status(200).json({
                message: 'No data to show'
            })
        }
        res.status(200).json({
            message: 'Show all data',
            value: rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while fetching data',
            Error: error
        })
    }
}

export default {
    showAll
}