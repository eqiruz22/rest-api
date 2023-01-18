import express from 'express'
import PerdinController from '../controllers/perdin/PerdinController.js';
import PrjController from '../controllers/prj/PrjController.js';
import RoleController from '../controllers/role/RoleController.js';
import TitleController from '../controllers/title/TitleController.js';
import UserController from '../controllers/user/UserController.js';
const router = express.Router()

router.post('/login', UserController.Login)
router.get('/show', UserController.getAll)
router.get('/show/:id', UserController.getById)
router.get('/count', UserController.countAll)
router.get('/show-manager', UserController.getManager)
router.post('/email', UserController.TestEmail)
router.post('/create', UserController.createData)
router.patch('/update/:id', UserController.updateData)
router.delete('/delete/:id', UserController.deleteData)

router.get('/role', RoleController.showAll)

router.get('/prj', PrjController.fetchById)

router.get('/title', TitleController.showTitle)
router.get('/title/:id', TitleController.findById)
router.post('/title/create', TitleController.createTitle)
router.patch('/title/update/:id', TitleController.UpdateById)
router.delete('/title/delete/:id', TitleController.destroyTitle)

router.get('/perdin-show', PerdinController.showPerdin)
router.get('/waiting-approve-manager', PerdinController.showWaiting)
router.get('/waiting-approve-director', PerdinController.showWaitingToDirector)
router.post('/perdin-create', PerdinController.createPerdin)
router.post('/approved-manager', PerdinController.updateApprovedManager)


export default router;