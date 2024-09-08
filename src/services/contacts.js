import { Contact } from '../models/contact.js';

// Get all contacts
export async function getAllContacts() {
  return await Contact.find();
}

// Get contact by ID
export async function getContactById(contactId) {
  return await Contact.findById(contactId);
}
