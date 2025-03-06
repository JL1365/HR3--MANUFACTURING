import express from 'express';

import { checkAuth, getAccountsFromAdmin, login, logout } from '../controllers/authController.js';
import { serviceVerifyToken, verifyJwt } from '../middlewares/verifyToken.js';

const authRoute = express.Router();

authRoute.get("/get-accounts-from-admin",serviceVerifyToken,getAccountsFromAdmin);
authRoute.post("/login",login);
authRoute.get("/check-auth",verifyJwt,checkAuth);
authRoute.post("/logout",logout);

export default authRoute;