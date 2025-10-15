import crypto from 'crypto';

export const genUsername = (): string => {
  const usernamePrefix = 'user-';
  const fullUuid = crypto.randomUUID();

  const username = usernamePrefix + fullUuid;

  return username;
};
