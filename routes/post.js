import express from 'express';
import { AddPost } from '../controllers/posteC.js';
const router = express.Router();

router
  .route('/addPost')
  .post(AddPost);
export default router;