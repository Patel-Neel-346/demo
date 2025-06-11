const addPromocodeSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      pattern: '^[A-Z0-9]+$', // Only uppercase letters and numbers
    },
    discount_type: {
      type: 'string',
      enum: ['percentage', 'fixed'],
    },
    discount_value: {
      type: 'number',
      minimum: 0.01,
      maximum: 999999.99,
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
    },
    expires_at: {
      type: 'string',
      format: 'date-time',
      nullable: true,
    },
    usage_limit: {
      type: 'integer',
      minimum: 0,
    },
    assigned_to: {
      type: 'integer',
      minimum: 1,
      nullable: true,
    },
  },
  required: ['code', 'discount_type', 'discount_value'],
  additionalProperties: false,
  // Custom validation for percentage discounts
  if: {
    properties: {
      discount_type: { const: 'percentage' },
    },
  },
  then: {
    properties: {
      discount_value: {
        maximum: 100,
      },
    },
  },
};

export { addPromocodeSchema };
