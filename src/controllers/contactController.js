import { findAllContacts } from '../services/contactService.js';  // Переконайтеся, що цей імпорт правильний

export async function getContacts(req, res) {
  try {
    const contacts = await findAllContacts();
    return res.status(200).json({
      message: 'Contacts retrieved successfully!',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while retrieving contacts' });
  }
}

export async function getContactById(req, res) {
  const { contactId } = req.params;

  try {
    const contact = await findContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    return res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while retrieving the contact' });
  }
}
