/**
 * Domain controller
 *
 * @author AI Assistant
 */
import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import {
  findAll,
  findById,
  create,
  deleteById,
} from '../services/domain.service.js';

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError, BadRequestError, ConflictError } = errors.default;

/**
 * Function which provides functionality
 * to add/create new domain in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addDomain = async (req, res) => {
  try {
    const domainDetails = await create(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(domainDetails));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ConflictError('Domain with this name already exists');
    }
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
      }));
      throw new BadRequestError(
        `Validation failed: ${validationErrors.map(v => v.message).join(', ')}`,
      );
    }
    throw error;
  }
};

/**
 * Function which provides functionality
 * to retrieve all domains present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getDomains = async (req, res) => {
  const domains = await findAll();
  res.status(httpStatus.OK).send(responseHandler(domains));
};

/**
 * Function which provides functionality
 * to retrieve specific domain based on provided domainId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such domain exists for provided domainId
 */
const getDomain = async (req, res) => {
  const domain = await findById(req.params.domainId);
  if (!domain) {
    throw new NotFoundError('Domain not found');
  }

  res.status(httpStatus.OK).send(responseHandler(domain));
};

/**
 * Function which provides functionality
 * to delete specific domain based on provided domainId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such domain exists for provided domainId
 */
const deleteDomain = async (req, res) => {
  try {
    const deletedCount = await deleteById(req.params.domainId);

    if (deletedCount === 0) {
      throw new NotFoundError('Domain not found');
    }

    res.status(httpStatus.OK).send(
      responseHandler({
        message: 'Domain deleted successfully',
        deletedId: parseInt(req.params.domainId, 10),
      }),
    );
  } catch (error) {
    if (error.message === 'Domain not found') {
      throw new NotFoundError('Domain not found');
    }
    throw error;
  }
};

export { addDomain, getDomains, getDomain, deleteDomain };
