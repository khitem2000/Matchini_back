
import express from 'express';

import { login,signup, patchOnce,googleSignUp,googleSignIn,googleVerifier, putOnce, forgot ,restorPassword,getUser,getConnectedUser , getObjectId , addMatches} from '../controllers/use.js';
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route('/login')
  .post(login);
  router
  .route('/signup')
  .post(multer("image", 5 * 1024 * 1024) , signup);
  router
  .route('/forgot')
  .post(forgot);
  router 
  .route('/patchOnce')
  .post(patchOnce)
  router
  .route('/googleSignup')
  .post(googleSignUp);

router
  .route('/googleSignIn')
  .post(googleSignIn);

router
  .route('/googleVerifier')
  .post(googleVerifier);
router
  .route('/modifier')
  .put(putOnce);
  router
  .route('/restorPassword')
  .put(restorPassword);
  router
  .route('/getUser')
  .post(getUser);
  router
  .route('/getConnectedUser')
  .post(getConnectedUser);
  router
  .route('/getObjectId')
  .post(getObjectId);
  router
  .route('/addMatches')
  .put(addMatches);

  export default router;