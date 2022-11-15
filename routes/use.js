
import express from 'express';

import { login,signup, patchOnce,googleSignUp,googleSignIn,googleVerifier, putOnce, forgot ,restorPassword} from '../controllers/use.js';
  
const router = express.Router();

router
  .route('/login')
  .post(login);
  
  router
  .route('/signup')
  .post(signup);
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
  

  export default router;