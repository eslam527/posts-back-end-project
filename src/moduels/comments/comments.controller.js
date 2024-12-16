import { Router } from "express";
import * as commentsServess from '../serveses/comment.serveses.js';

const router = Router();


router.post('/creat/comment/:uid',commentsServess.createComments);
router.post('/create/Many',commentsServess.createManyComments);
router.patch('/update/comment/:cid/:uid',commentsServess.createComments);
router.post('/find/create',commentsServess.findOrCreate);
router.get('/comments/search?',commentsServess.findCommentsByKeyword)
router.get('/RecentCommentsForPost/:id',commentsServess.getRecentCommentsForPost)
router.get('/CommentByPK/:id',commentsServess.getRecentCommentsForPost)

export default router