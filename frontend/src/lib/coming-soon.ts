/**
 * TEMPORARY. Set to false to restore eater and driver apps.
 * See COMING_SOON.md at the repo root for every change and how to revert.
 */
export const EATER_DRIVER_COMING_SOON = true;

export const COMING_SOON_PATH = '/coming-soon';

export const COMING_SOON_CTA_CLASS =
  'opacity-50 cursor-not-allowed grayscale pointer-events-none';

export function roleHome(role?: 'customer' | 'driver' | 'merchant' | string | null) {
  if (role === 'merchant') {
    return '/merchant/dashboard';
  }
  if (EATER_DRIVER_COMING_SOON) {
    return COMING_SOON_PATH;
  }
  if (role === 'driver') {
    return '/driver/home';
  }
  return '/home';
}

export function isStreetChefRole(role?: string | null) {
  return role === 'merchant';
}
