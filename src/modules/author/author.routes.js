import { Router } from "express";
import * as authorController from './author.controller.js';

const router = Router();

router.get('/', authorController.getAllAuthors);
router.post('/add', authorController.createAuthor);
router.patch('/:id', authorController.updateAuthorById);
router.delete('/:id', authorController.deleteAuthorById);
router.get('/:id', authorController.authorWithPopulatedBooks);

export default router;
