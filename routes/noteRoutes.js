const { Router } = require('express');
const noteController = require('../controllers/noteController')

const router = Router();

router.get('/',noteController.getnotes);
router.post('/create',noteController.addnote_post);
router.get('/create',noteController.addnote_get);
router.get('/update/:id',noteController.updatenote_get);
router.post('/update/:id',noteController.updatenote_post);
router.get('/:id',noteController.singlenote_get)
router.get('/delete/:id',noteController.deletenote);
module.exports = router;
