const Contact = require('../models/Contact');

async function getAllContacts() {
  return Contact.find();
}

module.exports = {
  getAllContacts,
};
