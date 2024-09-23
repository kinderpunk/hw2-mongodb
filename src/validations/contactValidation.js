import { body } from 'express-validator';

export const contactValidationSchema = [
  body('name').isString().isLength({ min: 3, max: 20 }).withMessage('Name must be between 3 and 20 characters long'),
  body('phoneNumber').isString().withMessage('Phone number is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('isFavourite').optional().isBoolean().withMessage('isFavourite must be a boolean'),
  body('contactType').optional().isIn(['work', 'home', 'personal']).withMessage('Invalid contact type'),
];
