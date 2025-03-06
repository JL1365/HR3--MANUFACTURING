import {body,validationResult} from 'express-validator'

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export const createIncentiveValidation = [
    body('incentiveName').notEmpty().withMessage('Incentive name is required!'),
    body('incentiveType').notEmpty().withMessage("Incentive type is required!")
];