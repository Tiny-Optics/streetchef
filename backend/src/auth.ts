import {betterAuth} from 'better-auth';
import {mongodbAdapter} from 'better-auth/adapters/mongodb';
import type {Db} from 'mongodb';
import {sendPasswordResetEmail} from './email.js';

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

export function createAuth(db: Db) {
  return betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:4000',
    trustedOrigins: [frontendUrl],
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({user, url}) => {
        await sendPasswordResetEmail(user.email, url);
      },
    },
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: false,
          defaultValue: 'customer',
          input: true,
        },
        phone: {
          type: 'string',
          required: false,
          input: true,
        },
        avatar: {
          type: 'string',
          required: false,
          input: true,
        },
        dateOfBirth: {
          type: 'string',
          required: false,
          input: true,
        },
        gender: {
          type: 'string',
          required: false,
          input: true,
        },
        driverProfile: {
          type: 'string',
          required: false,
          input: true,
        },
        merchantProfile: {
          type: 'string',
          required: false,
          input: true,
        },
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
export type SessionUser = Auth['$Infer']['Session']['user'];

let authInstance: Auth | null = null;

export function getAuth(): Auth {
  if (!authInstance) {
    throw new Error('Auth not initialized');
  }
  return authInstance;
}

export function initAuth(db: Db): Auth {
  authInstance = createAuth(db);
  return authInstance;
}
