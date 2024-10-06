import createError from 'http-errors';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { contactSchema } from '../validations/contactValidation.js'; 
import Joi from 'joi';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById
} from '../services/contacts.js'; 

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).default(10),
  sortBy: Joi.string().valid('name', 'phoneNumber', 'email', 'isFavourite', 'contactType').default('name'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  type: Joi.string().valid('work', 'home', 'personal').optional(), 
  isFavourite: Joi.boolean().optional() 
});

const getContacts = ctrlWrapper(async (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { page, perPage, sortBy, sortOrder, type, isFavourite } = value;
  const skip = (page - 1) * perPage;

  const filter = { userId: req.user._id };

  if (type) {
    filter.contactType = type;
  }
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite;
  }

  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage);

  if (contacts.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No contacts found',
    });
  }

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  });
});


const getContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);  // Викликаємо функцію з сервісу

  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }
  res.json({
    status: 200,
    message: "Contact retrieved successfully",
    data: contact,
  });
});

const createContact = ctrlWrapper(async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const newContact = await addContact({ 
    name, 
    phoneNumber, 
    email, 
    isFavourite, 
    contactType,
    userId: req.user._id 
  }); 
  
  res.status(201).json({
    status: 201,
    message: "Contact created successfully",
    data: newContact,
  });
});

const updateContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const updates = req.body;
  const updatedContact = await updateContactById(contactId, req.user._id, updates); // Викликаємо функцію з сервісу

  if (!updatedContact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }
  
  res.json({
    status: 200,
    message: "Contact updated successfully",
    data: updatedContact,
  });
});

const deleteContact = ctrlWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContactById(contactId, req.user._id); // Викликаємо функцію з сервісу

  if (!result) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }
  
  res.status(204).send();
});

export { getContacts, getContact, createContact, updateContact, deleteContact };
