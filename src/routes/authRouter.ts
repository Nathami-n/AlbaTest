import { signUser } from '../controllers/authControllers';
import {Router} from 'express';

const router = Router();


router.route('/signup').post(signUser);

export default router;