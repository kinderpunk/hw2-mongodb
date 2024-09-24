import { getAllContacts, getContactById, addContact, updateContactById, deleteContactById } from '../models/contact.js';
import createError from 'http-errors';


export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    next(createError(500, 'Error retrieving contacts'));
  }
};


export const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: 200,
        message: "Contact retrieved successfully",
        data: contact,
      });
    } else {
      
      next(createError(404, { status: 404, message: 'Contact not found', data: null }));
    }
  } catch (error) {
    next(createError(500, 'Error retrieving contact'));
  }
};


export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  try {
    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });
    res.status(201).json({
      status: 201,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    next(createError(500, 'Error creating contact'));
  }
};


export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updates = req.body;

  try {
    const updatedContact = await updateContactById(contactId, updates);
    if (updatedContact) {
      res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: updatedContact,
      });
    } else {
     
      next(createError(404, { status: 404, message: 'Contact not found', data: null }));
    }
  } catch (error) {
    next(createError(500, 'Error updating contact'));
  }
};


export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await deleteContactById(contactId);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      
      next(createError(404, { status: 404, message: 'Contact not found', data: null }));
    }
  } catch (error) {
    next(createError(500, 'Error deleting contact'));
  }
};
