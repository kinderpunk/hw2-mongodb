import express from 'express';
import { getContacts, getContact, createContact, updateContact, deleteContact } from '../controllers/contactsController.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { contactSchema } from '../validations/contactValidation.js';

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:contactId', isValidId, getContact);
router.post('/contacts', validateBody(contactSchema), createContact);
router.patch('/contacts/:contactId', isValidId, validateBody(contactSchema), updateContact);
router.delete('/contacts/:contactId', isValidId, deleteContact);

export default router;
