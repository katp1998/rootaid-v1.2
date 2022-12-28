import Router from 'koa-router';
import {
    loginUser,
    logoutUser,
    refreshToken,
    registerUser
} from '../controllers/user.controller';
// import {initKeycloak } from '../../../config/keycloak-config';

const router: Router = new Router();

// initalize keycloak
// const keycloak = initKeycloak();
// console.log("keycloak initaied");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/refreshToken', refreshToken);

//protected route
// router.get('/getme',keycloak.protect('app-user'), (ctx: any,next) =>
// {
//     ctx.body = {
//         msg:"protect route"
//     }
//     next();
// } );

export default router;


