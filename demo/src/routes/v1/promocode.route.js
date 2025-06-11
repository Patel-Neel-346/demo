import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addPromocode,
  getPromocodes,
  getPromocode,
  deletePromocode,
} from '../../controllers/promocode.controller.js';
import { addPromocodeSchema } from '../../validations/promocode-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     Promocode:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Promocode unique identifier
 *           example: 1
 *         code:
 *           type: string
 *           description: Promocode string
 *           example: "SAVE20"
 *         discount_type:
 *           type: string
 *           enum: [percentage, fixed]
 *           description: Type of discount
 *           example: "percentage"
 *         discount_value:
 *           type: number
 *           format: decimal
 *           description: Discount value
 *           example: 20.00
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Promocode status
 *           example: "active"
 *         expires_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Expiration date
 *         usage_limit:
 *           type: integer
 *           description: Maximum usage limit
 *           example: 100
 *         used:
 *           type: integer
 *           description: Number of times used
 *           example: 5
 *         assigned_to:
 *           type: integer
 *           nullable: true
 *           description: User ID assigned to this promocode
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *
 *     CreatePromocodeRequest:
 *       type: object
 *       required:
 *         - code
 *         - discount_type
 *         - discount_value
 *       properties:
 *         code:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Promocode string
 *           example: "SAVE20"
 *         discount_type:
 *           type: string
 *           enum: [percentage, fixed]
 *           description: Type of discount
 *           example: "percentage"
 *         discount_value:
 *           type: number
 *           minimum: 0.01
 *           description: Discount value
 *           example: 20.00
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Promocode status
 *           example: "active"
 *         expires_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Expiration date
 *         usage_limit:
 *           type: integer
 *           minimum: 0
 *           description: Maximum usage limit (0 = unlimited)
 *           example: 100
 *         assigned_to:
 *           type: integer
 *           nullable: true
 *           description: User ID to assign to this promocode
 *           example: 1
 *
 *     PromocodeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           $ref: '#/components/schemas/Promocode'
 *
 *     PromocodesListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         body:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Promocode'
 *
 *     DeletePromocodeResponse:
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
 *               example: "Promocode deleted successfully"
 *             deletedId:
 *               type: integer
 *               example: 1
 */

/**
 * @openapi
 * /v1/promocodes:
 *   post:
 *     tags:
 *       - Promocodes
 *     summary: Create a new promocode
 *     description: Creates a new promocode in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePromocodeRequest'
 *     responses:
 *       201:
 *         description: Promocode created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromocodeResponse'
 *       400:
 *         description: Bad request - validation error
 *       409:
 *         description: Conflict - promocode with this code already exists
 *
 *   get:
 *     tags:
 *       - Promocodes
 *     summary: Get all promocodes
 *     description: Retrieves a list of all promocodes in the system
 *     responses:
 *       200:
 *         description: List of promocodes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromocodesListResponse'
 */

/**
 * @openapi
 * /v1/promocodes/{promocodeId}:
 *   get:
 *     tags:
 *       - Promocodes
 *     summary: Get promocode by ID
 *     description: Retrieves a specific promocode by its ID
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Promocode ID
 *     responses:
 *       200:
 *         description: Promocode retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromocodeResponse'
 *       404:
 *         description: Promocode not found
 *
 *   delete:
 *     tags:
 *       - Promocodes
 *     summary: Delete promocode by ID
 *     description: Deletes a specific promocode by its ID
 *     parameters:
 *       - in: path
 *         name: promocodeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Promocode ID
 *     responses:
 *       200:
 *         description: Promocode deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeletePromocodeResponse'
 *       404:
 *         description: Promocode not found
 */

router
  .route('/')
  .post(validate({ body: addPromocodeSchema }), addPromocode)
  .get(getPromocodes);

router.route('/:promocodeId').get(getPromocode).delete(deletePromocode);

export default router;
