import express from 'express';

import { createIncentive, deleteIncentive, getAllIncentives, updateIncentive } from '../controllers/incentiveController.js';

import { createIncentiveValidation, validate } from '../middlewares/IncentiveValidation.js';
import { roleValidation } from '../middlewares/roleValidation.js';
import { verifyJwt } from '../middlewares/verifyToken.js';

const incentiveRoute = express.Router();

incentiveRoute.post("/create-Incentive",verifyJwt,createIncentiveValidation,validate,roleValidation(["Superadmin","Admin"]),createIncentive);
incentiveRoute.get("/get-all-Incentives",verifyJwt,roleValidation(["Superadmin","Admin"]),getAllIncentives);
incentiveRoute.put("/update-Incentive/:id",verifyJwt,roleValidation(["Superadmin"]),updateIncentive);
incentiveRoute.delete("/delete-Incentive/:id",verifyJwt,roleValidation(["Superadmin"]),deleteIncentive);

export default incentiveRoute;