const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, fileController.uploadFile);
router.get('/', authMiddleware, fileController.getFiles);
router.get('/:fileId', authMiddleware, fileController.getFile);
router.put('/:fileId', authMiddleware, fileController.updateFile);
router.delete('/:fileId', authMiddleware, fileController.deleteFile);
router.post('/directory', authMiddleware, fileController.createDirectory);

module.exports = router;