import { getAllContacts, getContactById, addContact, updateContactById, deleteContactById } from '../models/contact.js';
import createError from 'http-errors';
import ctrlWrapper from '../utils/ctrlWrapper.js';


const getContacts = ctrlWrapper(async (req, res, next) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: "Contacts retrieved successfully",
    data: contacts,
  });
});

const getContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: "Contact retrieved successfully",
    data: contact,
  });
});

const createContact = ctrlWrapper(async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });
  res.status(201).json({
    status: 201,
    message: "Contact created successfully",
    data: newContact,
  });
});

const updateContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updates = req.body;
  const updatedContact = await updateContactById(contactId, updates);
  if (!updatedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
});

const deleteContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContactById(contactId);
  if (result.deletedCount === 0) {
    next(createError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
});

export { getContacts, getContact, createContact, updateContact, deleteContact };
