import express from 'express'
import PerdinController from '../controllers/perdin/PerdinController.js';
import PrjController from '../controllers/prj/PrjController.js';
import RoleController from '../controllers/role/RoleController.js';
import TitleController from '../controllers/title/TitleController.js';
import UserController from '../controllers/user/UserController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router()


router.post('/login', UserController.Login)
router.get('/show', requireAuth, UserController.getAll)
router.get('/show/:id', UserController.getById)
router.get('/count', UserController.countAll)
router.get('/show-manager', UserController.getManager)
router.post('/create', UserController.createData)
router.patch('/update/:id', UserController.updateData)
router.delete('/delete/:id', UserController.deleteData)
router.get('/show/title-user/:id', UserController.showUserWithTitleById)

router.get('/role', RoleController.showAll)

router.get('/prj', PrjController.fetchById)

router.get('/title', TitleController.showTitle)
router.get('/title/:id', TitleController.findById)
router.post('/title/create', TitleController.createTitle)
router.patch('/title/update/:id', TitleController.UpdateById)
router.delete('/title/delete/:id', TitleController.destroyTitle)

router.get('/perdin-show', PerdinController.showPerdin)
router.get('/perdin-show-daily', PerdinController.showPerdinDaily)
router.get('/perdin-show-daily/:id', PerdinController.showPerdinDailyById)
router.get('/waiting-approve-manager', PerdinController.showWaitingToManager)
router.get('/waiting-approve-director', PerdinController.showWaitingToDirector)
router.post('/perdin-create', PerdinController.createPerdin)
router.post('/perdin-daily', PerdinController.createPerdinDaily)
router.post('/approved-manager', PerdinController.updateApprovedManager)
router.post('/approved-director', PerdinController.updateApprovedDirector)


export default router;