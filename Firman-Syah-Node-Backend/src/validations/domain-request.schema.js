const addDomainSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    status: {
      type: 'boolean', // true for active, false for inactive
    },
  },
  required: ['name', 'status'],
  additionalProperties: false,
};

export { addDomainSchema };
