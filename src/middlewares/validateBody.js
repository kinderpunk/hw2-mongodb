import { validationResult } from 'express-validator';

export const validateBody = (schema) => {
    return async (req, res, next) => {
        await Promise.all(schema.map(validation => validation.run(req))); // Виконати всі валідації
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        next();
    };
};
