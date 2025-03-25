const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.put('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;