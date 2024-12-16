import { Router } from "express";
import *as postsServeses from "../serveses/posts.serveses.js";

const router = Router();

router.post('/create/:uid',postsServeses.createPost);
router.delete('/delete/post/:id',postsServeses.deletePost);
router.get('/get/postDeteles',postsServeses.postDeteles);
router.get('/postsCount',postsServeses.postCount)
export default router