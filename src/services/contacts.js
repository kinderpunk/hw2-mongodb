import { Contact } from '../models/contact.js';  // Статичний імпорт

export const addContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email: email || '',  // Якщо email не вказано, зберігаємо порожній рядок
    isFavourite: isFavourite || false,  // За замовчуванням не улюблений контакт
    contactType,
  });

  return await newContact.save();  // Зберігаємо новий контакт у базу даних
};

// Отримання всіх контактів
export const getAllContacts = async () => {
  return await Contact.find();
};

// Отримання контакту за ID
export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

// Оновлення контакту за ID
export const updateContactById = async (contactId, updates) => {
  return await Contact.findByIdAndUpdate(contactId, updates, { new: true });
};

// Видалення контакту за ID
export const deleteContactById = async (contactId) => {
  return await Contact.deleteOne({ _id: contactId });
};
