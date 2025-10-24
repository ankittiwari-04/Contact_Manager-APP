const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { STATUS_CODES, CONTACT_MESSAGES } = require('../constants');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public (for now)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(STATUS_CODES.OK).json({
    success: true,
    message: CONTACT_MESSAGES.FETCH_SUCCESS,
    data: contacts,
  });
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public (for now)
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(STATUS_CODES.BAD_REQUEST);
    throw new Error('All fields (name, email, phone) are mandatory');
  }

  // optional: check duplicate email
  const exists = await Contact.findOne({ email });
  if (exists) {
    res.status(STATUS_CODES.BAD_REQUEST);
    throw new Error('Contact with this email already exists');
  }

  const newContact = await Contact.create({ name, email, phone });
  res.status(STATUS_CODES.CREATED).json({
    success: true,
    message: CONTACT_MESSAGES.CREATE_SUCCESS,
    data: newContact,
  });
});

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(STATUS_CODES.NOT_FOUND);
    throw new Error('Contact not found');
  }
  res.status(STATUS_CODES.OK).json({
    success: true,
    data: contact,
  });
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(STATUS_CODES.NOT_FOUND);
    throw new Error('Contact not found');
  }

  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: CONTACT_MESSAGES.UPDATE_SUCCESS,
    data: updated,
  });
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(STATUS_CODES.NOT_FOUND);
    throw new Error('Contact not found');
  }

  await contact.remove();

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: CONTACT_MESSAGES.DELETE_SUCCESS,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
