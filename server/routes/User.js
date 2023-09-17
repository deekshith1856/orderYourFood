import express from 'express'
import { autoLogin, userLogin, userRegister } from '../controllers/User.js';
import validateToken from '../middlewares/validateToken.js'
const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userRegister);
router.post('/autologin', validateToken, autoLogin)


export default router;