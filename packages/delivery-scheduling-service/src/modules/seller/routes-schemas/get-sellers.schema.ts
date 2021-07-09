import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    sellers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          name: { type: 'string' },
          openingHours: { type: 'array' },
        },
      },
    },
  },
};

export const getSellersSchema: FastifySchema = {
  tags: ['Seller'],
  response: {
    200: okResponseSchema,
  },
};
