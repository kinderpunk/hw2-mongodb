import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts, getContact } from './controllers/contactsController.js';
import dotenv from 'dotenv';
import createError from 'http-errors'; 
import { addContact } from './services/contacts.js'; 

dotenv.config();

const logger = pino();

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContact);
  app.post('/contacts', createContact); // Реєстрація POST роута

  // Handling undefined routes
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Error handler middleware
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || 'Something went wrong',
    });
  });

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  return app;
}


const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  
  if (!name || !phoneNumber || !contactType) {
    return next(createError(400, 'Name, phoneNumber, and contactType are required.'));
  }

  try {
    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};


export { createContact };