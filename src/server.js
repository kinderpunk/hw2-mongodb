import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts, getContact } from './controllers/contactsController.js';

const logger = pino();

export function setupServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContact);

  // Handling undefined routes
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  return app;
}
