import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const bodySchema: JsonSchema = {
  type: 'object',
  required: ['sellerCode'],
  properties: {
    customerCode: { type: 'string' }, // format: 'uuid'
    sellerCode: { type: 'string' },
    status: { type: 'string' },
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    duration: {
      type: 'object',
      properties: {
        raw: {
          type: 'number',
          default: 30,
        },
        unit: {
          type: 'string',
          default: 'MIN',
        },
      },
    },
    capacity: {
      type: 'object',
      properties: {
        current: { type: 'number' },
        original: {
          type: 'number',
          default: 1,
        },
      },
    },
  },
};

const paramsSchema: JsonSchema = {
  type: 'object',
  required: ['code'],
  properties: {
    code: { type: 'string'},
  },
};

export const bookSlotSchema: FastifySchema = {
  params: paramsSchema,
  body: bodySchema,
  tags: ['Slot'],
};
