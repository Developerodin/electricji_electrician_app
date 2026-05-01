# ElectricJi Delivery App — project structure

Quick reference for humans and for Cursor when editing this repo.  
**Stack:** Expo SDK ~54, React Native, TypeScript.

## Directory layout

```text
electicji_delivery_app/
├── index.ts                 # Expo entry: registers root component
├── app.json                 # Expo config (name, icons, splash, plugins)
├── package.json
├── tsconfig.json
├── PROJECT_STRUCTURE.md     # This file
├── assets/                  # Static images (Metro `require` paths)
│   ├── account/               # Account tab: profile avatar (Figma #4089:1909)
│   ├── application-status/
│   ├── forgot-password/
│   ├── kyc/
│   ├── login/
│   ├── order-task/          # Task View: vendor avatar, map preview
│   ├── vehicle-details/    # RC preview placeholder (Figma #4260:3175)
│   ├── personal-info/
│   └── … (flat PNGs at assets root as needed)
└── src/
    ├── App.tsx              # Fonts, loading, route state, screen switcher
    ├── hooks/               # Lightweight screen hooks
    │   └── useLoginScreenChrome.ts  # Safe-area top + keyboard visibility (auth screens)
    ├── components/         # Shared UI (not route roots)
    │   ├── MainTabBar.tsx    # Bottom nav: Home, Tasks, Earnings, Account (Ionicons)
    │   └── MainTabShell.tsx # Wraps main-tab screens + inset for tab bar
    └── screens/             # One file per full-screen UI
        ├── AccountScreen.tsx               # Figma Account #4089:1909 (main tab)
        ├── ApplicationStatusApprovedScreen.tsx
        ├── ApplicationStatusUnderReviewScreen.tsx
        ├── EnterNewPasswordScreen.tsx
        ├── EnterOtpScreen.tsx
        ├── ForgotPasswordScreen.tsx
        ├── HomeScreen.tsx
        ├── KycVerificationScreen.tsx
        ├── LoginEmailScreen.tsx
        ├── LoginSignupScreen.tsx
        ├── EarningsScreen.tsx            # Figma Earnings #4089:1740
        ├── MainTabPlaceholderScreen.tsx  # Not wired; kept for dev scaffolding
        ├── TasksScreen.tsx               # Figma Tasks #4089:1844
        ├── OrderTaskViewScreen.tsx   # Figma Task View #4089:1638
        ├── PasswordResetSuccessScreen.tsx
        ├── PersonalInfoScreen.tsx
        ├── SplashScreen.tsx          # Shown once after fonts load (see `App.tsx`)
        └── VehicleDetailsScreen.tsx  # Figma Vehicle Details #4089:1538
```

## Entry and navigation

| Piece | Role |
|--------|------|
| `index.ts` | `registerRootComponent` → imports `./src/App`. |
| `src/App.tsx` | Loads Rubik + Public Sans via `expo-font`, shows branded `SplashScreen` briefly, then renders **one** screen based on local React state (`AuthRoute` union type). |

Navigation is **not** React Navigation yet: it is conditional rendering and callbacks like `onBack`, `onNext`, `setRoute(...)`.

### Main app tabs (post-onboarding)

- **Routes:** `home`, `tasks`, `earnings`, `account` — rendered inside `MainTabShell`, which mounts **`MainTabBar`** once at the bottom.
- **Rule:** Implement tab **content only** inside `screens/*` for these routes; **do not** add a second bottom tab bar inside those screens — Figma “nav bar” for this shell is satisfied by `MainTabBar` / `MainTabShell` only.
- **Detail routes** (e.g. `order-task`) sit **outside** the shell: full screen, no tab bar, until you explicitly add a different pattern.
- **Types:** `MainTabRoute`, `MAIN_TAB_CONTENT_BOTTOM_PADDING`, and **`useMainTabContentBottomPadding()`** (adds Android bottom inset for 3-button / gesture nav) live in `src/components/MainTabBar.tsx`. Use the hook for any tab-screen `ScrollView` bottom padding (see `MainTabShell`, `AccountScreen`).

### Auth / onboarding flow (conceptual order)

1. `login-signup` → `login-email` / `personal-info` (OTP path) / forgot-password  
2. Forgot branch: `forgot-password` → `enter-otp` → `enter-new-password` → `password-reset-success` → back to login  
3. Profile branch: `personal-info` → `kyc-verification` → `vehicle-details` → `application-under-review` → (`application-approved` in `__DEV__` only) → **`home`** (“Go to Dashboard”). Main tabs: `home` | `tasks` | `earnings` | `account` (`tasks` → `TasksScreen` Figma #4089:1844; `earnings` → `EarningsScreen` #4089:1740; `account` → `AccountScreen` #4089:1909). From **`home`**, **View Task** opens `order-task` (Figma Task View #4089:1638); back returns to `home`. From **`tasks`**, **Continue** on the current task opens `order-task`; back returns to `tasks`.

When adding a step, extend `AuthRoute` in `src/App.tsx` and add a matching `{route === '…' && <Screen … />}` block with the same callback patterns as neighboring screens. New **main-tab** screens belong inside `MainTabShell` (only one `MainTabBar` in the app).

### Status bar

- `expo-status-bar` in `App.tsx` uses **`light`** when `route === 'home'` (red hero header) and **`dark`** for other routes (including other main tabs with light grey background, `order-task`, etc.).

## Assets

- **Physical location:** project root `assets/` (sibling of `src/`), not inside `src/screens/`.
- **From a screen in `src/screens/*.tsx`:** Metro resolves `require()` relative to that file. Use:

  `require('../../assets/…')`

  (two levels up from `screens/` to the app root, then into `assets/`.)

- **`app.json` / Expo:** paths like `./assets/icon.png` are relative to the **app project root** (`electicji_delivery_app/`), not `src/`.

## Conventions for changes

- **New screen:** add `src/screens/<Name>Screen.tsx`, export a named component, then import and mount it from `src/App.tsx` with the right `AuthRoute` and props.
- **Shared UI:** `src/components/` — use for cross-screen pieces (tab bar shell, reusable controls). Prefer extending `MainTabShell`/`MainTabBar` for new primary tabs rather than embedding nav in screens.
- **Typo in folder name:** the app directory is `electicji_delivery_app` (matches `package.json`); keep imports and docs consistent with that spelling until a rename is intentional.

## Search hints (for agents)

- **“Where is navigation?”** → `src/App.tsx` (`route`, `setRoute`, screen tree).
- **“Where is the driver tab bar?”** → `src/components/MainTabBar.tsx` + `MainTabShell.tsx` — do not duplicate nav bars inside tab screens.
- **“Where is screen X?”** → `src/screens/` file name matches export.
- **“Why won’t my image load?”** → Check `require` path from `src/screens/` → must reach `../../assets/…` unless you colocate assets (not current layout). If Figma MCP gave SVG content in a `.png` file, run `npm run assets:rasterize-figma-svgs` (uses **density 720** so icons stay sharp on 3× screens).

---

*Update this file when you introduce new top-level folders, routing libraries, or entry-point changes.*
