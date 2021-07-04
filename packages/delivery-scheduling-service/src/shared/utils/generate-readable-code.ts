import Hashids from 'hashids/cjs';

export const generateReadableCode = (salt: string, encoder?: number): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const hash: Hashids = new Hashids(salt, 10, alphabet);

  return hash.encode(encoder ?? new Date().getTime());
};
