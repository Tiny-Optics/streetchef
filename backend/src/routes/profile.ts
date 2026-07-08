import {Router} from 'express';
import {fromNodeHeaders} from 'better-auth/node';
import {getAuth} from '../auth.js';
import {getDb} from '../db.js';
import {requireSession, type AuthedRequest} from '../middleware/requireSession.js';

export const profileRouter = Router();

profileRouter.use(requireSession);

export type DriverProfile = {
  driversLicense?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  licensePlate: string;
};

function parseDriverProfile(raw: unknown): DriverProfile | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  try {
    const parsed = JSON.parse(raw) as Partial<DriverProfile>;
    if (!parsed.vehicleMake && !parsed.vehicleModel) return undefined;
    return {
      driversLicense: parsed.driversLicense ?? '',
      vehicleMake: parsed.vehicleMake ?? '',
      vehicleModel: parsed.vehicleModel ?? '',
      vehicleYear: parsed.vehicleYear ?? '',
      licensePlate: parsed.licensePlate ?? '',
    };
  } catch {
    return undefined;
  }
}

function formatProfile(user: Record<string, unknown>) {
  const role = (user.role as string) ?? 'customer';
  const driverProfile =
    role === 'driver' ? parseDriverProfile(user.driverProfile) : undefined;

  return {
    id: user.id as string,
    name: user.name as string,
    email: (user.email as string) ?? '',
    phone: (user.phone as string) ?? '',
    avatar: user.image as string | undefined,
    role,
    dateOfBirth: user.dateOfBirth as string | undefined,
    gender: user.gender as string | undefined,
    driverProfile,
  };
}

profileRouter.get('/', async (req: AuthedRequest, res) => {
  const sessionUser = req.sessionUser as unknown as Record<string, unknown>;
  let userRecord = sessionUser;

  if (
    (sessionUser.role as string) === 'driver' &&
    !sessionUser.driverProfile
  ) {
    const dbUser = await getDb().collection('user').findOne({id: sessionUser.id});
    if (dbUser) {
      userRecord = {...sessionUser, ...dbUser};
    }
  }

  res.json(formatProfile(userRecord));
});

profileRouter.patch('/', async (req: AuthedRequest, res) => {
  try {
    const {name, phone, avatar, dateOfBirth, gender, driverProfile} = req.body as {
      name?: string;
      phone?: string;
      avatar?: string;
      dateOfBirth?: string;
      gender?: string;
      driverProfile?: DriverProfile;
    };

    const updateBody: Record<string, unknown> = {
      name,
      phone,
      image: avatar,
      dateOfBirth,
      gender,
    };

    if (driverProfile) {
      updateBody.driverProfile = JSON.stringify(driverProfile);
    }

    await getAuth().api.updateUser({
      headers: fromNodeHeaders(req.headers),
      body: updateBody,
    });

    const session = await getAuth().api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      res.status(400).json({error: 'Failed to update profile'});
      return;
    }

    let userRecord = session.user as unknown as Record<string, unknown>;
    if (driverProfile) {
      const dbUser = await getDb().collection('user').findOne({id: userRecord.id});
      if (dbUser) {
        userRecord = {...userRecord, ...dbUser};
      }
    }

    res.json(formatProfile(userRecord));
  } catch {
    res.status(500).json({error: 'Failed to update profile'});
  }
});
