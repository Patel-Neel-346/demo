import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addDomain,
  getDomains,
  getDomain,
  deleteDomain,
} from '../../controllers/domain.controller.js';
import { addDomainSchema } from '../../validations/domain-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Domain:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Domain unique identifier
 *           example: 1
 *         name:
 *           type: string
 *           description: Domain name
 *           example: "Technology"
 *         status:
 *           type: boolean
 *           description: Domain status (active/inactive)
 *           example: true
 *         assigned_to:
 *           type: integer
 *           nullable: true
 *           description: User ID assigned to this domain
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Domain creation timestamp
 *
 *     CreateDomainRequest:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: Domain name
 *           example: "Technology"
 *         status:
 *           type: boolean
 *           description: Domain status (active/inactive)
 *           example: true
 *         assigned_to:
 *           type: integer
 *           nullable: true
 *           description: User ID to assign to this domain
 *           example: 1
 *
 *     DomainResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Domain'
 *
 *     DomainsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Domain'
 *
 *     DeleteDomainResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Domain deleted successfully"
 *             deletedId:
 *               type: integer
 *               example: 1
 */

/**
 * @openapi
 * /v1/domains:
 *   post:
 *     tags:
 *       - Domains
 *     summary: Create a new domain
 *     description: Creates a new domain in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDomainRequest'
 *     responses:
 *       201:
 *         description: Domain created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainResponse'
 *       400:
 *         description: Bad request - validation error
 *       409:
 *         description: Conflict - domain with this name already exists
 *
 *   get:
 *     tags:
 *       - Domains
 *     summary: Get all domains
 *     description: Retrieves a list of all domains in the system
 *     responses:
 *       200:
 *         description: List of domains retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainsListResponse'
 */

/**
 * @openapi
 * /v1/domains/{domainId}:
 *   get:
 *     tags:
 *       - Domains
 *     summary: Get domain by ID
 *     description: Retrieves a specific domain by its ID
 *     parameters:
 *       - in: path
 *         name: domainId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Domain ID
 *     responses:
 *       200:
 *         description: Domain retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DomainResponse'
 *       404:
 *         description: Domain not found
 *
 *   delete:
 *     tags:
 *       - Domains
 *     summary: Delete domain by ID
 *     description: Deletes a specific domain by its ID
 *     parameters:
 *       - in: path
 *         name: domainId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Domain ID
 *     responses:
 *       200:
 *         description: Domain deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteDomainResponse'
 *       404:
 *         description: Domain not found
 */

router
  .route('/')
  .post(validate({ body: addDomainSchema }), addDomain)
  .get(getDomains);

router.route('/:domainId').get(getDomain).delete(deleteDomain);

export default router;
