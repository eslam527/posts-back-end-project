import { Router } from "express";
import *as regstritionServeses from "../serveses/auth.serveses.js";

const router = Router();

router.post('/signUp',regstritionServeses.signUp);
router.put('/:id',regstritionServeses.createOrUpdate);
router.get('/by-email/:email',regstritionServeses.getUserByEmail),
router.get('/by-id/:id',regstritionServeses.getUserById)
router.post('/logIn',regstritionServeses.logIn)
export default router