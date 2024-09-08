import { getAllContacts, getContactById } from '../services/contacts.js';

// Controller for GET /contacts
export async function getContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
}

// Controller for GET /contacts/:contactId
export async function getContact(req, res) {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get contact',
      error: error.message,
    });
  }
}
