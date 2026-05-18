import {Router} from 'express';
import {fromNodeHeaders} from 'better-auth/node';
import {getAuth} from '../auth.js';
import {requireSession, type AuthedRequest} from '../middleware/requireSession.js';

export const profileRouter = Router();

profileRouter.use(requireSession);

function formatProfile(user: Record<string, unknown>) {
  return {
    id: user.id as string,
    name: user.name as string,
    email: (user.email as string) ?? '',
    phone: (user.phone as string) ?? '',
    avatar: user.image as string | undefined,
    role: (user.role as string) ?? 'customer',
    dateOfBirth: user.dateOfBirth as string | undefined,
    gender: user.gender as string | undefined,
  };
}

profileRouter.get('/', async (req: AuthedRequest, res) => {
  res.json(formatProfile(req.sessionUser as unknown as Record<string, unknown>));
});

profileRouter.patch('/', async (req: AuthedRequest, res) => {
  try {
    const {name, phone, avatar, dateOfBirth, gender} = req.body as {
      name?: string;
      phone?: string;
      avatar?: string;
      dateOfBirth?: string;
      gender?: string;
    };

    await getAuth().api.updateUser({
      headers: fromNodeHeaders(req.headers),
      body: {
        name,
        phone,
        image: avatar,
        dateOfBirth,
        gender,
      },
    });

    const session = await getAuth().api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      res.status(400).json({error: 'Failed to update profile'});
      return;
    }

    res.json(formatProfile(session.user as unknown as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to update profile'});
  }
});
