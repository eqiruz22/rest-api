import express from 'express'
import RoleController from '../controllers/role/RoleController.js';
import UserController from '../controllers/user/UserController.js';
const router = express.Router()

router.get('/show', UserController.getAll)
router.get('/show/:id', UserController.getById)
router.get('/count', UserController.countAll)
router.post('/create', UserController.createData)
router.patch('/update/:id', UserController.updateData)
router.delete('/delete/:id', UserController.deleteData)

router.get('/role', RoleController.showAll)
export default router;