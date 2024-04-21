import { loginUser, signUser } from '../controllers/authControllers';
import {Router} from 'express';

const router = Router();


router.route('/signup').post(signUser);
router.route('/login').post(loginUser);

export default router;