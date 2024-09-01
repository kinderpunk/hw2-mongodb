const { getAllContacts } = require('../services/contactService');

async function getContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

module.exports = {
  getContacts,
};
