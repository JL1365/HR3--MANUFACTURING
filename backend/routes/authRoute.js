import express from 'express';

import { getAccountsFromAdmin, login } from '../controllers/authController.js';
import { serviceVerifyToken } from '../middlewares/verifyToken.js';

const authRoute = express.Router();

authRoute.get("/get-accounts-from-admin",serviceVerifyToken,getAccountsFromAdmin);
authRoute.post("/login",login);

export default authRoute;