import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';
import { AvailabilityStatus } from '../dtos/base/enums/availability-status.enum';

const querySchema: JsonSchema = {
  type: 'object',
  required: ['sellerCode', 'untilDate'],
  properties: {
    sellerCode: { type: 'string' },
    fromDate: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time',
          description: 'ISO 8601 date time format in UTC time: YYYY-MM-DDThh:mm:ssZ',
        },
        {
          type: 'string',
          format: 'date',
          description: 'ISO 8601 date format YYYY-MM-DD',
        },
      ],
    },
    untilDate: {
      anyOf: [
        {
          type: 'string',
          format: 'date-time',
          description: 'ISO 8601 date time format in UTC time: YYYY-MM-DDThh:mm:ssZ',
        },
        {
          type: 'string',
          format: 'date',
          description: 'ISO 8601 date format YYYY-MM-DD',
        },
      ],
    },
    status: {
      type: 'string',
      enum: Object.values(AvailabilityStatus),
    },
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
          isAvailable: { type: 'boolean' },
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
