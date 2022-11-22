import Router from 'koa-router';
import { findUser } from '../../database/repositories/user.repository';
import { handleRegister, handleLogin } from '../controllers/user.controller';

const router: Router = new Router();

router.post('/register', handleRegister);

router.post('/login', handleLogin);
router.get('/getme', findUser);


export default router;


