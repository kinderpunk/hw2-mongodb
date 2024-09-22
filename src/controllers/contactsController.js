import { addContact, getAllContacts, getContactById, updateContactById, deleteContactById } from '../services/contacts.js';  // Статичний імпорт
import createError from 'http-errors';  // Імпорт http-errors для генерації помилок

export const getContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = req.query;
  const filter = {};

  if (type) {
    filter.contactType = type;
  }

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  const skip = (page - 1) * perPage;
  const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

  try {
    const totalItems = await getAllContacts(filter); // Переконайтесь, що ця функція приймає фільтр
    const contacts = await getAllContacts()
      .sort({ [sortBy]: sortOrderValue })
      .skip(skip)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalItems.length / perPage); // Врахування загальної кількості

    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: {
        contacts,
        page: Number(page),
        perPage: Number(perPage),
        totalItems: totalItems.length,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Виникла помилка при отриманні контактів' });
  }
};

export const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Контакт не знайдено' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Виникла помилка при отриманні контакту' });
  }
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  try {
    const newContact = await addContact({ name, phoneNumber, email, isFavourite, contactType });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Виникла помилка при створенні контакту' });
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
        data: updatedContact
      });
    } else {
      throw createError(404, "Contact not found");
    }
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error updating contact' });
    }
  }
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await deleteContactById(contactId);
    if (result.deletedCount > 0) {
      res.status(204).send();  // Успішне видалення
    } else {
      throw createError(404, "Contact not found");
    }
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting contact' });
    }
  }
};
