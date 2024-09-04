import { Contact } from '../models/contact.js';

export async function findContactById(contactId) {
  return await Contact.findById(contactId);
}
