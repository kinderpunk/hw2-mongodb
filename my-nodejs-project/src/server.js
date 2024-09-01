const { getContacts } = require('./controllers/contactController');
const express = require('express');
const cors = require('cors');
const pino = require('pino')();

function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get('/contacts', getContacts);
  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    pino.info(`${req.method} ${req.url}`);
    next();
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = setupServer;
