import express from 'express';
import { applicate, getallapplicate ,acceptApplicate,rejectApplicate,getApplicationStatus} from '../controllers/subvention.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/applicate', verifyToken, applicate);
router.get('/getallapplicate', verifyToken, getallapplicate);
router.put('/accept/:id', verifyToken, acceptApplicate);
router.put('/reject/:id', verifyToken, rejectApplicate);
router.get('/status', verifyToken, getApplicationStatus);



export default router;
