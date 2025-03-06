import {body,validationResult} from 'express-validator'

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export const createBenefitValidation = [
    body('benefitName').notEmpty().withMessage('Benefit name is required!'),
    body('benefitType').notEmpty().withMessage("Benefit type is required!")
];