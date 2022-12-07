import express from 'express';

import { matches} from '../controllers/matche.js';
const router = express.Router();
router
.route('/matches/:User1_param/:User2_param')
.post(matches);

export default router;

