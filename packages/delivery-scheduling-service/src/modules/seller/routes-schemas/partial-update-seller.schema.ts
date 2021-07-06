import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import { WeekDays } from '../../../shared/interfaces/enums';
import 'fastify-swagger';

// HH:MM 24-hour format, optional leading 0
const timeRegex = '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';

const paramsSchema: JsonSchema = {
  type: 'object',
  required: ['code'],
  properties: {
    code: { type: 'string' },
  },
};

const bodySchema: JsonSchema = {
  type: 'object',
  properties: {
    name: { type: 'string'},
    openingHours: {
      type: 'array',
      maxItems: 7,
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['weekDay', 'startTime', 'endTime'],
        properties: {
          weekDay: {
            type: 'string',
            enum: Object.values(WeekDays),
          },
          startTime: {
            type: 'string',
            pattern: timeRegex,
            description: 'HH:MM 24-hour format',
          },
          endTime: {
            type: 'string',
            pattern: timeRegex,
            description: 'HH:MM 24-hour format',
          },
        },
      },
    },
  },
};

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    name: { type: 'string' },
    openingHours: { type: 'array' },
  },
};

export const partialUpdateSellerSchema: FastifySchema = {
  params: paramsSchema,
  body: bodySchema,
  tags: ['Seller'],
  response: {
    200: okResponseSchema,
  },
};
