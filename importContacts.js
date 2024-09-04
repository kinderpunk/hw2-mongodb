import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Contact } from './src/models/contact.js'; 

async function connectToMongoDB() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    process.exit(1);
  }
}


async function importContacts() {
  const filePath = path.join(__dirname, 'contacts.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const contacts = JSON.parse(data);

  try {
    await connectToMongoDB();

 
    await Contact.deleteMany({});

 
    await Contact.insertMany(contacts);
    console.log('Contacts imported successfully!');
  } catch (error) {
    console.error('Error importing contacts:', error);
  } finally {
    mongoose.connection.close();
  }
}

importContacts();
