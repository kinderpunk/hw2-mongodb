import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js'; 
import authRouter from './routers/auth.js'; 
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const logger = pino();
const app = express();

export function setupServer() {
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use('/auth', authRouter); 
  app.use(cookieParser());

  // Routes
  app.use("/contacts", contactsRouter); 

  // Handling undefined routes
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  return app;
}
