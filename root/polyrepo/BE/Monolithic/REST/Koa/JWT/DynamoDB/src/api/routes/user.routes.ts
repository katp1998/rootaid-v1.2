import Router from 'koa-router';
import { handleRegister, handleLogin, refreshToken,logoutUser,protectedRoute } from '../controllers/user.controller';
import { auth } from '../middlewares/auth';

const router: Router = new Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/refreshtoken', refreshToken);
router.post('/logout', logoutUser)
router.get('/private',auth, protectedRoute)


export default router;



