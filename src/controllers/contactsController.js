export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
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
