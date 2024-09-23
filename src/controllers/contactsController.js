import { getAllContacts, getContactById, addContact, updateContactById, deleteContactById } from '../models/contact.js';

export const getContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(perPage),
    sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
  };

  const query = {};
  if (type) query.contactType = type;
  if (isFavourite !== undefined) query.isFavourite = isFavourite === 'true';

  try {
    const contacts = await getAllContacts(query, options);
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: {
        data: contacts.docs,
        page: contacts.page,
        perPage: contacts.limit,
        totalItems: contacts.totalDocs,
        totalPages: contacts.totalPages,
        hasPreviousPage: contacts.hasPrevPage,
        hasNextPage: contacts.hasNextPage,
      },
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Error retrieving contacts' });
  }
};

export const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: 200,
        message: "Contact retrieved successfully",
        data: contact,
      });
    } else {
      res.status(404).json({ status: 404, message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact' });
  }
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  try {
    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });
    res.status(201).json({
      status: 201,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updates = req.body;

  try {
    const updatedContact = await updateContactById(contactId, updates);
    if (updatedContact) {
      res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: updatedContact,
      });
    } else {
      res.status(404).json({ status: 404, message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Error updating contact' });
  }
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await deleteContactById(contactId);
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ status: 404, message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};
