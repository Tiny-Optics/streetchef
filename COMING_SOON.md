# Temporary: eater and driver coming soon

StreetChef (merchant) accounts can still sign up, log in, and use the platform. Eater (`customer`) and driver experiences are gated behind a Coming Soon page until we turn this off.

## How to revert

1. Set `EATER_DRIVER_COMING_SOON` to `false` in [`frontend/src/lib/coming-soon.ts`](frontend/src/lib/coming-soon.ts).
2. Set `EATER_DRIVER_SIGNUP_DISABLED` to `false` in [`backend/src/auth.ts`](backend/src/auth.ts), or delete the `databaseHooks.user.create.before` block.
3. Optionally restore `SIGNED_OUT_PATH` in [`frontend/src/lib/auth-routes.ts`](frontend/src/lib/auth-routes.ts) to `'/welcome'` if you want logged-out users to land on the eater welcome screen again.
4. Greyed CTAs and `/coming-soon` can stay; with the flag off they are unused. Remove them in a later cleanup if desired.

The BrandLogo and `frontend/public/streetchef-icon.svg` are permanent and should be kept.

## Behavior while enabled

- After login, merchants go to `/merchant/dashboard`. Customers and drivers go to `/coming-soon`.
- `ProtectedRoute` sends any authenticated non-merchant away from app routes (including `/home`, `/driver/*`, `/edit-profile`, `/help`, etc.).
- `/login` and `/signup` redirect already-authenticated users via `roleHome()`.
- `/signup` and `/signup?type=driver` redirect to `/coming-soon`. Only `/signup?type=merchant` can create an account.
- The API rejects user create when `role` is missing, `customer`, or `driver`. Existing customer/driver accounts can still log in; they only see Coming Soon.
- Signed-out landing (`SIGNED_OUT_PATH`) is `/` (partner page), not `/welcome`.

## Files changed

### New

- [`frontend/src/lib/coming-soon.ts`](frontend/src/lib/coming-soon.ts) — flag, `roleHome()`, CTA class, `/coming-soon` path
- [`frontend/src/pages/ComingSoon.tsx`](frontend/src/pages/ComingSoon.tsx) — Coming Soon page
- [`frontend/src/components/BrandLogo.tsx`](frontend/src/components/BrandLogo.tsx) — icon + wordmark
- [`frontend/public/streetchef-icon.svg`](frontend/public/streetchef-icon.svg) — copied from `frontend/dist/Streetchef Icon.svg` (do not rely on `dist/`)

### Edited

- [`frontend/src/App.tsx`](frontend/src/App.tsx) — `/coming-soon` route, `ProtectedRoute` merchant-only gate, `AuthEntry` / `PartnerLandingRoute` / login / signup redirects
- [`frontend/src/lib/auth-routes.ts`](frontend/src/lib/auth-routes.ts) — `SIGNED_OUT_PATH` is `/`
- [`frontend/src/pages/PartnerLanding.tsx`](frontend/src/pages/PartnerLanding.tsx) — greyed eater/driver CTAs; BrandLogo in header and footer
- [`frontend/src/pages/auth/Welcome.tsx`](frontend/src/pages/auth/Welcome.tsx) — greyed Create Account; BrandLogo above heading
- [`frontend/src/pages/auth/Login.tsx`](frontend/src/pages/auth/Login.tsx) — `roleHome()` after login; Sign Up greyed unless `?type=merchant`
- [`frontend/src/pages/auth/SignUp.tsx`](frontend/src/pages/auth/SignUp.tsx) — non-merchant types redirect to Coming Soon
- [`frontend/src/pages/Splash.tsx`](frontend/src/pages/Splash.tsx) — BrandLogo (page is unused in the router today)
- [`frontend/index.html`](frontend/index.html) — favicon
- [`backend/src/auth.ts`](backend/src/auth.ts) — reject non-merchant user create

## Greyed CTAs (do not navigate)

- Partner header **Sign up** (customer)
- Hero **Order food** and **Sign up to drive**
- Drivers section **Sign up to deliver**
- Welcome **Create an Account**
- Login footer **Sign Up** unless `?type=merchant`

Left enabled: **Log in**, **Become a StreetChef**, **Get started as a StreetChef**, in-page `#merchants` / `#drivers` hash links.
