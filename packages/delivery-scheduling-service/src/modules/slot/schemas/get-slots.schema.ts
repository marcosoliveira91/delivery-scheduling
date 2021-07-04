import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const querySchema: JsonSchema = {
  type: 'object',
  required: ['sellerCode'],
  properties: {
    sellerCode: { type: 'string' },
    startDate: {
      type: 'string',
      format: 'date',
    },
    endDate: {
      type: 'string',
      format: 'date',
    },
    status: { type: 'string' }, // TODO: move to enum
  },
};

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    slots: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          sellerCode: { type: 'string' },
          status: { type: 'string' },
          startDate: { type: 'string' },
          endDate: { type: 'string' },
          duration: {
            type: 'object',
            properties: {
              raw: { type: 'number' },
              unit: { type: 'string' },
            },
          },
          capacity: {
            type: 'object',
            properties: {
              current: { type: 'number' },
              original: { type: 'number' },
            },
          },
        },
      },
    },
  },
};

export const getSlotsSchema: FastifySchema = {
  tags: ['Slot'],
  querystring: querySchema,
  response: {
    200: okResponseSchema,
  },
};
