const addDomainSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      pattern: '^[a-zA-Z0-9\\s\\-_]+$', // Letters, numbers, spaces, hyphens, underscores
    },
    status: {
      type: 'boolean', // true for active, false for inactive
    },
    assigned_to: {
      type: 'integer',
      minimum: 1,
      nullable: true,
    },
  },
  required: ['name', 'status'],
  additionalProperties: false,
};
