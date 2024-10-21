import { Router } from 'express';
import { getAllPosts, getPost, addPost, changeStatus, addCommentToPost } from '../controllers/postController.js';
import { postSchema, changeStatusSchema, commentSchema } from './schemas/posts.js'
import { validateSchema } from '../middleware/payloadValidator.js'
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', authenticateJWT, authorizeRole('admin'), validateSchema(postSchema), addPost);
router.post('/change-post-status', authenticateJWT, authorizeRole('admin'), validateSchema(changeStatusSchema), changeStatus);
router.post('/:id/comments', authenticateJWT, validateSchema(commentSchema), addCommentToPost);

export default router;
