const { Router } = require('express');
const noteController = require('../controllers/noteController')

const router = Router();

router.get('/',noteController.getnotes);
router.post('/create',noteController.addnote_post);
router.get('/create',noteController.addnote_get);
router.get('/update/:id([0-9\a-f]{24})',noteController.updatenote_get);
router.post('/update/:id([0-9\a-f]{24})',noteController.updatenote_post);
router.get('/:id([0-9\a-f]{24})',noteController.singlenote_get)
router.get('/delete/:id([0-9a-f]{24})',noteController.deletenote);
module.exports = router;
