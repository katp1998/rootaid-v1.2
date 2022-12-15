import { initKeycloak } from '../../../config/keycloak-config';
import Router from 'koa-router';
import { handleRegister, handleLogin } from '../controllers/user.controller';

const router: Router = new Router();

// initalize keycloak
const keycloak = initKeycloak();
console.log("keycloak initaied");

router.post('/register', handleRegister);

router.post('/login', handleLogin);
router.get('/getme', (ctx: any,next) =>
{
    ctx.body = {
        msg:"protect route"
    }
    next();
} );

// keycloak.protect(),
export default router;


