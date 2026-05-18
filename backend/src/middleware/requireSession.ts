import type {NextFunction, Request, Response} from 'express';
import {fromNodeHeaders} from 'better-auth/node';
import {getAuth, type SessionUser} from '../auth.js';

export type AuthedRequest = Request & {
  sessionUser?: SessionUser;
};

export async function requireSession(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const session = await getAuth().api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      res.status(401).json({error: 'Unauthorized'});
      return;
    }

    req.sessionUser = session.user;
    next();
  } catch {
    res.status(401).json({error: 'Unauthorized'});
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction): void => {
    const role = (req.sessionUser as SessionUser & {role?: string})?.role ?? 'customer';
    if (!roles.includes(role)) {
      res.status(403).json({error: 'Forbidden'});
      return;
    }
    next();
  };
}
