import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const bodySchema: JsonSchema = {
  type: 'object',
  required: ['sellerCode'],
  properties: {
    customerCode: { type: 'string' },
    sellerCode: { type: 'string' },
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
