/**
 * Domain service which serves DB operations
 * required by domain controller
 *
 * @author Jenish
 */
import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Domain model extracted from db import
 */
const { Domain } = db.db;

/**
 * findAll function to retrieve all domains in the system
 *
 * @returns {Promise} Domain object array
 */
const findAll = async () => Domain.findAll();

/**
 * findById function to fetch data for provided domainId
 *
 * @param {number} domainId - Domain ID for which data needs to be fetched
 * @returns {Promise} Domain object
 */
const findById = async domainId =>
  Domain.findOne({
    where: { id: domainId },
  });

/**
 * create function to add new domain
 *
 * @param {object} data - domain object with information to be saved in system
 * @returns {Promise} Created domain object
 */
const create = async data => Domain.create(data);

/**
 * deleteById function to delete a domain by ID
 *
 * @param {number} domainId - ID of the domain to be deleted
 * @returns {Promise} Number of rows deleted (0 or 1)
 */
const deleteById = async domainId =>
  Domain.destroy({
    where: { id: domainId },
  });

export { findAll, findById, create, deleteById };
