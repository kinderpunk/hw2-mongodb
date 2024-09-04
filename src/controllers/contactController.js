import { findContactById } from '../services/contactService.js';

export async function getContactById(req, res) {
  const { contactId } = req.params;
  const contact = await findContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}
