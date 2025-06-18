const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

router.post('/translations', translationController.createTranslation);
router.get('/translations/:requestId', translationController.getTranslationStatus);
router.get('/translations', translationController.listAll);

module.exports = router;
