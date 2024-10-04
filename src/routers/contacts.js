import express from 'express';
import { getContacts, getContact, createContact, updateContact, deleteContact } from '../controllers/contactsController.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { contactSchema } from '../validations/contactValidation.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();
router.use(authenticate);

router.get('/', getContacts); 
router.get('/:contactId', isValidId, getContact); 
router.post('/', validateBody(contactSchema), createContact); 
router.patch('/:contactId', isValidId, validateBody(contactSchema), updateContact); 
router.delete('/:contactId', isValidId, deleteContact); 

export default router;
