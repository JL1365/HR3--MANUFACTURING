import express from 'express';

import { getAccountsFromAdmin } from '../controllers/authController.js';
import { serviceVerifyToken } from '../middlewares/verifyToken.js';

const authRoute = express.Router();

authRoute.get("/get-accounts-from-admin",serviceVerifyToken,getAccountsFromAdmin);

export default authRoute;