import express from 'express';

import { matches,amie} from '../controllers/matche.js';
const router = express.Router();
router
.route('/matches/:User1_param/:User2_param')
.post(matches);
router
.route('/amie/:userid')
.post(amie);
export default router;

