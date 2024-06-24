import express from 'express';
import { getResult } from '../controllers/result.controller';
const router = express.Router();



router.post('/', getResult);
export default router;