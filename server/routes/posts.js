import { Router } from 'express';
import { getAllPosts, getPost, createPostController, changeStatus, getCommentsByPostId, addCommentToPost } from '../controllers/postController.js';
import { postSchema, changeStatusSchema, commentSchema } from './schemas/posts.js'
import { validateSchema } from '../middleware/payloadValidator.js'
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authenticateJWT(false), getAllPosts);
router.get('/:id', authenticateJWT(false), getPost);
router.post('/', authenticateJWT(), authorizeRole('admin'), validateSchema(postSchema), createPostController);
router.post('/change-post-status', authenticateJWT(), authorizeRole('admin'), validateSchema(changeStatusSchema), changeStatus);
router.get('/:id/comments', authenticateJWT(false), getCommentsByPostId);
router.post('/:id/comments', authenticateJWT(), validateSchema(commentSchema), addCommentToPost);
export default router;
