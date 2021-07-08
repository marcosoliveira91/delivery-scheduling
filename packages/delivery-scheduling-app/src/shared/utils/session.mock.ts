/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { v4 as uuidv4 } from 'uuid';

/**
 * The user session is mock data generated for demo purposes, only
 * Should be replaced for proper session/auth servie
 */
export const mockGetUserSession = (): { uuid: string, role: string } => {
  const stored = sessionStorage.getItem('user');

  if (!stored) {
    const user = {
      role: 'customer',
      uuid: uuidv4(),
    };

    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  return JSON.parse(stored);
};
