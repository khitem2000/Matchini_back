
import express from 'express';

import {  addOnce} from '../controllers/client.js';
  
const router = express.Router();
router
    .route('/addOnce')
    .post(addOnce); 
  export default router;