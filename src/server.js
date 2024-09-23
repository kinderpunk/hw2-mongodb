import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js'; 
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const logger = pino();
const app = express();

export function setupServer() {
  app.use(cors());
  app.use(express.json());

  app.use(contactsRouter); 

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  return app;
}
