/**
 * Promocode service which serves DB operations
 * required by promocode controller
 *
 * @author AI Assistant
 */
import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Promocode model extracted from db import
 */
const { Promocode } = db.db;

/**
 * findAll function to retrieve all promocodes in the system
 *
 * @returns {Promise} Promocode object array
 */
const findAll = async () =>
  Promocode.findAll({
    order: [['created_at', 'DESC']],
  });

/**
 * findById function to fetch data for provided promocodeId
 *
 * @param {number} promocodeId - Promocode ID for which data needs to be fetched
 * @returns {Promise} Promocode object
 */
const findById = async promocodeId =>
  Promocode.findOne({
    where: { id: promocodeId },
  });

/**
 * findByCode function to fetch data for provided promocode
 *
 * @param {string} code - Promocode for which data needs to be fetched
 * @returns {Promise} Promocode object
 */
const findByCode = async code =>
  Promocode.findOne({
    where: { code: code.toUpperCase() },
  });

/**
 * create function to add new promocode
 *
 * @param {object} data - promocode object with information to be saved in system
 * @returns {Promise} Created promocode object
 */
const create = async data => {
  // Check if promocode already exists
  const existingPromocode = await findByCode(data.code);
  if (existingPromocode) {
    throw new Error('Promocode already exists');
  }

  return Promocode.create(data);
};

/**
 * update function to modify existing promocode
 *
 * @param {number} promocodeId - ID of the promocode to be updated
 * @param {object} data - Updated promocode data
 * @returns {Promise} Updated promocode object
 */
const update = async (promocodeId, data) => {
  const promocode = await findById(promocodeId);
  if (!promocode) {
    throw new Error('Promocode not found');
  }

  return promocode.update(data);
};

/**
 * deleteById function to delete a promocode by ID
 *
 * @param {number} promocodeId - ID of the promocode to be deleted
 * @returns {Promise} Number of rows deleted (0 or 1)
 */
const deleteById = async promocodeId => {
  const promocode = await findById(promocodeId);
  if (!promocode) {
    throw new Error('Promocode not found');
  }

  return Promocode.destroy({
    where: { id: promocodeId },
  });
};

/**
 * incrementUsage function to increment the used count of a promocode
 *
 * @param {number} promocodeId - ID of the promocode to increment usage
 * @returns {Promise} Updated promocode object
 */
const incrementUsage = async promocodeId => {
  const promocode = await findById(promocodeId);
  if (!promocode) {
    throw new Error('Promocode not found');
  }

  if (promocode.status !== 'active') {
    throw new Error('Promocode is not active');
  }

  if (promocode.expires_at && new Date() > promocode.expires_at) {
    throw new Error('Promocode has expired');
  }

  if (promocode.usage_limit > 0 && promocode.used >= promocode.usage_limit) {
    throw new Error('Promocode usage limit exceeded');
  }

  return promocode.update({ used: promocode.used + 1 });
};

export {
  findAll,
  findById,
  findByCode,
  create,
  update,
  deleteById,
  incrementUsage,
};
