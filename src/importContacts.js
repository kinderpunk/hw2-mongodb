import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function importContacts() {
  try {
    await initMongoConnection();
    console.log('Mongo connection successfully established!');

    const contactsPath = path.join(__dirname, 'contacts.json');
    const contactsData = fs.readFileSync(contactsPath, 'utf8');
    const contacts = JSON.parse(contactsData);

    console.log('Contacts data:', contacts);

    // Add logic here to import contacts into MongoDB

  } catch (error) {
    console.error('Error importing contacts:', error);
  }
}

importContacts();
