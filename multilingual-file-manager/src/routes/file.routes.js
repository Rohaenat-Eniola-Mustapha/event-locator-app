const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploads

router.post('/upload', authMiddleware, upload.single('file'), fileController.uploadFile);
router.get('/', authMiddleware, fileController.getFiles);
router.get('/:fileId', authMiddleware, fileController.getFile);
router.put('/:fileId', authMiddleware, fileController.updateFile);
router.delete('/:fileId', authMiddleware, fileController.deleteFile);
router.post('/create-directory', authMiddleware, fileController.createDirectory);

module.exports = router;