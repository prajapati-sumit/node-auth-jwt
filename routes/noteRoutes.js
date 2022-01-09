const { Router } = require('express');
const noteController = require('../controllers/noteController')

const router = Router();

router.get('/',noteController.getnotes);
router.post('/',noteController.addnote_post);
router.put('/',noteController.updatenote);
router.get('/create',noteController.addnote_get);
router.get('/:id',noteController.singlenote_get)
router.delete('/:id',noteController.deletenote);
module.exports = router;
