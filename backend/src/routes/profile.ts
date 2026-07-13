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
  const avatar =
    (user.image as string | undefined) ?? (user.avatar as string | undefined);

  return {
    id: user.id as string,
    name: user.name as string,
    email: (user.email as string) ?? '',
    phone: (user.phone as string) ?? '',
    avatar,
    role,
    dateOfBirth: user.dateOfBirth as string | undefined,
    gender: user.gender as string | undefined,
    driverProfile,
  };
}

async function loadCanonicalUser(userId: string): Promise<Record<string, unknown> | null> {
  const dbUser = await getDb().collection('user').findOne({id: userId});
  return dbUser as Record<string, unknown> | null;
}

profileRouter.get('/', async (req: AuthedRequest, res) => {
  const sessionUser = req.sessionUser as unknown as Record<string, unknown>;
  const dbUser = await loadCanonicalUser(sessionUser.id as string);
  const userRecord = dbUser ? {...sessionUser, ...dbUser} : sessionUser;
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

    const mongoUpdate: Record<string, unknown> = {};

    if (name !== undefined) mongoUpdate.name = name;
    if (phone !== undefined) mongoUpdate.phone = phone;
    if (dateOfBirth !== undefined) mongoUpdate.dateOfBirth = dateOfBirth;
    if (gender !== undefined) mongoUpdate.gender = gender;
    if (avatar !== undefined) {
      mongoUpdate.image = avatar;
      mongoUpdate.avatar = avatar;
    }
    if (driverProfile) {
      mongoUpdate.driverProfile = JSON.stringify(driverProfile);
    }

    if (Object.keys(mongoUpdate).length === 0) {
      res.status(400).json({error: 'No fields to update'});
      return;
    }

    const userId = req.sessionUser!.id;
    const sessionUser = req.sessionUser as unknown as Record<string, unknown>;

    await getDb().collection('user').updateOne({id: userId}, {$set: mongoUpdate});

    // Best-effort session sync; cookie refresh can fail without blocking persistence.
    try {
      await getAuth().api.updateUser({
        headers: fromNodeHeaders(req.headers),
        body: mongoUpdate,
      });
    } catch {
      // Profile fields are already saved in MongoDB.
    }

    const dbUser = await loadCanonicalUser(userId);
    if (!dbUser) {
      res.status(400).json({error: 'Failed to update profile'});
      return;
    }

    res.json(formatProfile({...sessionUser, ...dbUser}));
  } catch {
    res.status(500).json({error: 'Failed to update profile'});
  }
});
