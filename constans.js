// constants.js
exports.API_VERSION = '/api/v1';

exports.MESSAGES = {
  SUCCESS: 'Request completed successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Something went wrong on the server',
  BAD_REQUEST: 'Invalid request data',
  UNAUTHORIZED: 'Unauthorized access',
};

exports.CONTACT_MESSAGES = {
  FETCH_SUCCESS: 'Contacts fetched successfully',
  CREATE_SUCCESS: 'Contact created successfully',
  UPDATE_SUCCESS: 'Contact updated successfully',
  DELETE_SUCCESS: 'Contact deleted successfully',
  NOT_FOUND: 'Contact not found',
};

exports.STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
