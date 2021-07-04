import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const bodySchema: JsonSchema = {
  type: 'object',
  required: ['sellerCode', 'startDate', 'endDate'],
  properties: {
    sellerCode: { type: 'string'},
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

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    sellerCode: { type: 'string'},
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

export const createSlotSchema: FastifySchema = {
  body: bodySchema,
  tags: ['Slot'],
  response: {
    200: okResponseSchema,
  },
};
