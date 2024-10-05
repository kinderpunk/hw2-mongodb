import { Contact } from '../models/contact.js';

export const addContact = async ({ name, phoneNumber, email, isFavourite, contactType, userId }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email: email || '',  
    isFavourite: isFavourite || false,  
    contactType,
    userId,  
  });

  return await newContact.save(); 
};

export const getAllContacts = async ({ filter, skip = 0, limit = 10, sortBy = 'name', sortOrder = 'asc' }) => {
  return await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const updateContactById = async (contactId, userId, updates) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, updates, { new: true });
};

export const deleteContactById = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
