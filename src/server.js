import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts } from './controllers/contactController.js';
import { getContactById } from './controllers/contactController.js';

app.get('/contacts/:contactId', getContactById);
app.get('/contacts', getContacts);

export function setupServer() {
  const app = express();
  const logger = pino();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}
