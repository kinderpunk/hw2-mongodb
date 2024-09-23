import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'; 

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 }, 
  phoneNumber: { type: String, required: true },
  email: { type: String, trim: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, enum: ['work', 'home', 'personal'], default: 'personal' },
}, {
  timestamps: true,
});


contactSchema.plugin(mongoosePaginate);

export const Contact = mongoose.model('Contact', contactSchema);


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

export const getAllContacts = async (query, options) => {
  return await Contact.paginate(query, options); 
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const updateContactById = async (contactId, updates) => {
  return await Contact.findByIdAndUpdate(contactId, updates, { new: true });
};

export const deleteContactById = async (contactId) => {
  return await Contact.deleteOne({ _id: contactId });
};
