import mongoose from 'mongoose';

// Схема контакту
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal' },
}, {
  timestamps: true, // автоматичні поля createdAt та updatedAt
});

// Модель контакту
export const Contact = mongoose.model('Contact', contactSchema);

// Додавання нового контакту
export const addContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email: email || '',
    isFavourite: isFavourite || false,
    contactType,
  });
  return await newContact.save();
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
