import { handleLogout } from "../controllers/logoutController";
import {Router} from 'express';

const router = Router();

router.route('/').get(handleLogout);


export default router;