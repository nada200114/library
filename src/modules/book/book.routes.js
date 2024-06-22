import { Router } from "express";
import * as bookController from './book.controller.js';

const router = Router();

router.get('/', bookController.getAllBooks);
router.post('/add', bookController.createBook);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.updateBookById);

router.delete('/:id', bookController.deleteBookById);

export default router;
