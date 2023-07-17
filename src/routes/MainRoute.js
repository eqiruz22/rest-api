import express from 'express'
import DivisiController from '../controllers/divisi/DivisiController.js';
import PerdinController from '../controllers/perdin/PerdinController.js';
import PrjController from '../controllers/prj/PrjController.js';
import RoleController from '../controllers/role/RoleController.js';
import TitleController from '../controllers/title/TitleController.js';
import UserController from '../controllers/user/UserController.js';
import ZoneController from '../controllers/zone/ZoneController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router()

router.post('/login', UserController.Login)
//router.use(requireAuth)
router.get('/show', UserController.getAll)
router.get('/show/:id', UserController.getById)
router.get('/count', UserController.countAll)
router.get('/show-manager', UserController.getManager)
router.post('/create', UserController.createData)
router.patch('/update/:id', UserController.updateData)
router.delete('/delete/:id', UserController.deleteData)
router.get('/show/title-user/:id', UserController.showUserWithTitleById)
router.get('/name', UserController.getName)
router.post('/mail', TitleController.ForTest)
router.get('/role', RoleController.showAll)

router.get('/prj', PrjController.fetchPrj)
router.get('/prj-list', PrjController.ListPrj)
router.get('/prj/:id', PrjController.fetchById)
router.post('/prj/create', PrjController.createPrj)
router.patch('/prj/update/:id', PrjController.updatePrj)
router.delete('/prj/delete/:id', PrjController.destroyPrj)

router.get('/title', TitleController.showTitle)
router.get('/title-name', TitleController.fetchTitleName)
router.get('/title/:id', TitleController.findById)
router.post('/title', TitleController.createTitle)
router.patch('/title/:id', TitleController.UpdateById)
router.delete('/title/:id', TitleController.destroyTitle)

router.get('/perdin-show', PerdinController.showPerdin)
router.get('/perdin-show-daily', PerdinController.showPerdinDaily)
router.get('/perdin-show-daily/:id', PerdinController.showPerdinDailyById)
router.get('/perdin-daily/:id', PerdinController.showPerdinDetail)
router.get('/waiting-approve-divisi', PerdinController.showWaitingToDivisi)
router.get('/waiting-approve-divisi/:id', PerdinController.showWaitingToDivisiById)
router.get('/waiting-approve-hc', PerdinController.showWaitingToHc)
router.post('/perdin-create', PerdinController.createPerdin)
router.post('/perdin-daily', PerdinController.createPerdinDaily)
router.post('/approved-divisi', PerdinController.updateApprovedDivisi)
router.post('/approved-hc', PerdinController.updateApprovedHc)
router.patch('/perdin-daily', PerdinController.updatePerdinDaily)
router.delete('/perdin-daily/:id', PerdinController.destroyPerdinDaily)

router.get('/divisi', DivisiController.fetchDivisi)
router.get('/divisi-head', DivisiController.fetchDivisiWithHead)
router.get('/divisi/:id', DivisiController.fetchDivisiById)
router.post('/divisi-create', DivisiController.createDivisi)
router.patch('/divisi/:id', DivisiController.updateDivisi)
router.delete('/divisi/:id', DivisiController.destroyDivisi)

router.get('/zone', ZoneController.fetchZoneWithTitle)
router.get('/zone-name', ZoneController.fetchZoneByName)
router.get('/zone-by/:id', ZoneController.fetchZoneById)
router.post('/zone', ZoneController.createZone)
router.patch('/zone/:id', ZoneController.UpdateZone)
router.delete('/zone/:id', ZoneController.DeleteZone)

router.get('/test', DivisiController.selectDivisiApproval)
router.get('/report-user', UserController.getReportUser)
router.get('/report-perdin-daily', PerdinController.getReportPerdinDaily)
router.get('/report-prj', PrjController.getReportPrj)
router.get('/report-zone', ZoneController.getReportZone)

export default router;