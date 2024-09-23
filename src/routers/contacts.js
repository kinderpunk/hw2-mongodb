import express from 'express';
import { getContacts, getContact, createContact, updateContact, deleteContact } from '../controllers/contactsController.js'; 

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:contactId', getContact);
router.post('/contacts', createContact);
router.patch('/contacts/:contactId', updateContact);
router.delete('/contacts/:contactId', deleteContact); 

export default router;
