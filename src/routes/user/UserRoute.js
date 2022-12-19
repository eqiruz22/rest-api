import express from 'express'
import {
    getUser,
    insertUser,
    getUserById,
    updateUser,
    deleteUserById,
    updatePassword
} from '../../controllers/user/UserController.js';

const router = express.Router()

router.get('/user/show', getUser)
router.get('/user/show/:id', getUserById)
router.post('/user/insert', insertUser)
router.patch('/user/update/:id', updateUser)
router.patch('/user/password/:id', updatePassword)
router.delete('/user/delete/:id', deleteUserById)

export default router;