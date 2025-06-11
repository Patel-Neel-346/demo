/**
 * Promocode controller
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
} from '../services/promocode.service.js';

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
 * to add/create new promocode in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addPromocode = async (req, res) => {
  try {
    const promocodeDetails = await create(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(promocodeDetails));
  } catch (error) {
    if (error.message === 'Promocode already exists') {
      throw new ConflictError('Promocode with this code already exists');
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
 * to retrieve all promocodes present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getPromocodes = async (req, res) => {
  const promocodes = await findAll();
  res.status(httpStatus.OK).send(responseHandler(promocodes));
};

/**
 * Function which provides functionality
 * to retrieve specific promocode based on provided promocodeId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such promocode exists for provided promocodeId
 */
const getPromocode = async (req, res) => {
  const promocode = await findById(req.params.promocodeId);
  if (!promocode) {
    throw new NotFoundError('Promocode not found');
  }

  res.status(httpStatus.OK).send(responseHandler(promocode));
};

/**
 * Function which provides functionality
 * to delete specific promocode based on provided promocodeId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such promocode exists for provided promocodeId
 */
const deletePromocode = async (req, res) => {
  try {
    const deletedCount = await deleteById(req.params.promocodeId);

    if (deletedCount === 0) {
      throw new NotFoundError('Promocode not found');
    }

    res.status(httpStatus.OK).send(
      responseHandler({
        message: 'Promocode deleted successfully',
        deletedId: parseInt(req.params.promocodeId, 10),
      }),
    );
  } catch (error) {
    if (error.message === 'Promocode not found') {
      throw new NotFoundError('Promocode not found');
    }
    throw error;
  }
};

export { addPromocode, getPromocodes, getPromocode, deletePromocode };
