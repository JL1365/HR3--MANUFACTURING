import express from 'express';

import { createBenefit, deleteBenefit, getAllBenefits, updateBenefit } from '../controllers/benefitController.js';

import { createBenefitValidation, validate } from '../middlewares/benefitValidation.js';
import { roleValidation } from '../middlewares/roleValidation.js';
import { verifyJwt } from '../middlewares/verifyToken.js';

const benefitRoute = express.Router();

benefitRoute.post("/create-benefit",verifyJwt,createBenefitValidation,validate,roleValidation(["Superadmin","Admin"]),createBenefit);
benefitRoute.get("/get-all-benefits",verifyJwt,roleValidation(["Superadmin","Admin"]),getAllBenefits);
benefitRoute.put("/update-benefit/:id",verifyJwt,roleValidation(["Superadmin"]),updateBenefit);
benefitRoute.delete("/delete-benefit/:id",verifyJwt,roleValidation(["Superadmin"]),deleteBenefit);

export default benefitRoute;