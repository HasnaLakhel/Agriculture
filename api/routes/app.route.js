// app.routes.js

import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getallapp, deleteApp } from '../controllers/app.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getallapp', getallapp);
router.delete('/delete/:id', deleteApp);

export default router;
