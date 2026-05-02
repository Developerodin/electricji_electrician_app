# ElectricJi Electrician App — project structure

Quick reference for humans and Cursor when editing this package.  
**Product spec / screen copy:** see **`Electrician-app.md`** (prototype flow).  
**Stack:** Expo SDK ~54, React Native, TypeScript, **React Navigation** (native stack + bottom tabs).

**Folder:** `electricji_electrician_app/` — note `package.json` / `app.json` still use the name `electicji_delivery_app` until renamed intentionally.

---

## Directory layout

```text
electricji_electrician_app/
├── index.ts                      # Expo entry: registerRootComponent → ./src/App
├── app.json
├── package.json
├── tsconfig.json
├── PROJECT_STRUCTURE.md          # This file
├── PROJECT_OVERVIEW.md           # Legacy notes (may predate React Navigation — prefer this file + code)
├── Electrician-app.md            # UX / flow prototype spec
├── scripts/
│   └── rasterize-svg-masked-pngs.mjs   # npm run assets:rasterize-figma-svgs
├── assets/                       # Expo paths in app.json (./assets/…); Metro from screens via ../../assets/
└── src/
    ├── App.tsx                   # Fonts (expo-font loadAsync), GestureHandlerRootView, SafeAreaProvider, NavigationContainer, RootNavigator
    ├── navigation/
    │   ├── types.ts              # RootStackParamList, MainTabParamList, per-tab stack param lists
    │   ├── RootNavigator.tsx   # Splash → onboarding/KYC → MainTabs
    │   ├── MainTabs.tsx        # Bottom tabs: Home | Jobs | Wholesale | Learn | Profile
    │   ├── HomeStack.tsx
    │   ├── JobsStack.tsx
    │   ├── WholesaleStack.tsx
    │   ├── LearnStack.tsx
    │   └── ProfileStack.tsx
    ├── theme/                    # Design tokens: colors, fonts, spacing, shadows, layout, typography
    ├── components/
    │   ├── ui/                     # Shared primitives (Button, ScreenScaffold, FormField, …)
    │   ├── KycStepChrome.tsx
    │   ├── FloatingSosButton.tsx
    │   ├── IncomingJobLeadModal.tsx
    │   ├── MainTabBar.tsx        # Legacy hand-rolled tab bar (not wired — live tabs use MainTabs.tsx)
    │   └── MainTabShell.tsx      # Legacy shell (not wired)
    └── screens/                  # One module per screen; wired from navigators (see tables below)
```

---

## Entry and boot

| Piece | Role |
|--------|------|
| `index.ts` | Imports `./src/App`, `registerRootComponent(App)`. Also imports `react-native-gesture-handler` first. |
| `src/App.tsx` | Loads Rubik + Public Sans; red loader until fonts ready; then **`NavigationContainer`** + **`RootNavigator`**. Default **`StatusBar`** style **`dark`** after fonts load. |

**Splash:** `RootNavigator` mounts `SplashScreen` ~2200 ms then **`navigation.replace('LanguageSelection')`** (see `SplashRoute` in `RootNavigator.tsx`).

---

## Navigation model

Routing is **React Navigation**, not `useState` route strings in `App.tsx`.

- **Types:** `src/navigation/types.ts` — extend param lists when adding routes with params.
- **Root stack:** `RootNavigator.tsx` — auth/onboarding/KYC linear chain, then **`MainTabs`**.
- **Main app:** `MainTabs.tsx` — **`createBottomTabNavigator`** with five tabs; each tab is a **`createNativeStackNavigator`** stack (`*Stack.tsx`).

### Bottom tabs (`MainTabParamList`)

| Tab navigator screen | Label | Stack module | Primary screens |
|---------------------|-------|--------------|-----------------|
| `HomeTab` | Home | `HomeStack.tsx` | Dashboard, earnings, wallet, notifications, safety, inspections |
| `JobsTab` | Jobs | `JobsStack.tsx` | Lead inbox → job lifecycle → SOS modal |
| `WholesaleTab` | Wholesale | `WholesaleStack.tsx` | Marketplace, cart, checkout, orders |
| `LearnTab` | Learn | `LearnStack.tsx` | Courses, lessons, quiz, badges |
| `ProfileTab` | Profile | `ProfileStack.tsx` | Profile menu, settings, support, tickets |

**Rule:** Do **not** add a second bottom tab bar inside tab roots — Figma-style chrome for primary nav is **`MainTabs`** only. Push secondary flows onto the **same tab’s stack** (or add stack screens).

### Root stack flow (conceptual, matches `Electrician-app.md`)

`Splash` → `LanguageSelection` → `PhoneEntry` → `EnterOtp` → `Permissions` → `OnboardingIntro` → **KYC** (`KycPersonal` … `KycBankUpi`) → `KycStatus` → **`MainTabs`**. (`WelcomeCarouselScreen.tsx` remains in repo as reference only — not wired in `RootNavigator`.)

Root screen names → typical TSX files:

| Route name | Screen file |
|------------|-------------|
| `Splash` | `SplashScreen.tsx` |
| `LanguageSelection` | `LanguageSelectionScreen.tsx` |
| `PhoneEntry` | `PhoneEntryScreen.tsx` |
| `EnterOtp` | `EnterOtpScreen.tsx` |
| `Permissions` | `PermissionsScreen.tsx` |
| `OnboardingIntro` | `OnboardingIntroScreen.tsx` |
| `KycPersonal` | `PersonalInfoScreen.tsx` |
| `KycSelfie` … `KycBankUpi`, `KycStatus` | `Kyc*.tsx` |

### Home stack (`HomeStackParamList`)

| Route | Component |
|-------|-----------|
| `HomeMain` | `HomeScreen.tsx` |
| `EarningsOverview` | `EarningsScreen.tsx` |
| `JobEarningDetail` | `JobEarningDetailScreen.tsx` |
| `Payouts` | `PayoutsScreen.tsx` |
| `TaxDocuments` | `TaxDocumentsScreen.tsx` |
| `WalletHome` | `WalletHomeScreen.tsx` |
| `BankUpiManager` | `BankUpiManagerScreen.tsx` |
| `WithdrawalHistory` | `WithdrawalHistoryScreen.tsx` |
| `PerformanceOverview` | `PerformanceOverviewScreen.tsx` |
| `NotificationsCenter` | `NotificationsCenterScreen.tsx` |
| `SafetyToolHome` | `SafetyToolHomeScreen.tsx` |
| `InspectionChecklist` | `InspectionChecklistScreen.tsx` |
| `ScoreRecommendations` | `ScoreRecommendationsScreen.tsx` |
| `ReportPreviewSend` | `ReportPreviewSendScreen.tsx` |
| `InspectionHistory` | `InspectionHistoryScreen.tsx` |

### Jobs stack (`JobsStackParamList`)

| Route | Component |
|-------|-----------|
| `JobLeadInbox` | `JobLeadInboxScreen.tsx` |
| `LeadAccepted` | `LeadAcceptedScreen.tsx` |
| `EnRoute` | `EnRouteScreen.tsx` |
| `ArrivalConfirmation` | `ArrivalConfirmationScreen.tsx` |
| `StartOtp` | `JobStartOtpScreen.tsx` |
| `JobInProgress` | `JobInProgressScreen.tsx` |
| `MarkComplete` | `MarkCompleteScreen.tsx` |
| `FinalInvoice` | `FinalInvoiceScreen.tsx` |
| `EndOtp` | `JobEndOtpScreen.tsx` |
| `UploadProof` | `UploadProofScreen.tsx` |
| `JobSummary` | `JobSummaryScreen.tsx` |
| `SosModal` | `SosModalScreen.tsx` (modal presentation) |

### Wholesale stack (`WholesaleStackParamList`)

| Route | Component |
|-------|-----------|
| `MarketplaceHome` | `MarketplaceHomeScreen.tsx` |
| `CategoryListing` | `CategoryListingScreen.tsx` |
| `SearchFilter` | `SearchFilterScreen.tsx` |
| `ProductDetail` | `ProductDetailScreen.tsx` |
| `Cart` | `CartScreen.tsx` |
| `Checkout` | `CheckoutScreen.tsx` |
| `OrderConfirmation` | `OrderConfirmationScreen.tsx` |
| `OrderTracking` | `OrderTrackingScreen.tsx` |
| `OrderHistory` | `OrderHistoryScreen.tsx` |
| `ReturnsRefund` | `ReturnsRefundScreen.tsx` |

### Learn stack (`LearnStackParamList`)

| Route | Component |
|-------|-----------|
| `CourseCatalog` | `CourseCatalogScreen.tsx` |
| `CourseDetail` | `CourseDetailScreen.tsx` |
| `LessonPlayer` | `LessonPlayerScreen.tsx` |
| `Quiz` | `QuizScreen.tsx` |
| `MyBadges` | `MyBadgesScreen.tsx` |

### Profile stack (`ProfileStackParamList`)

| Route | Component |
|-------|-----------|
| `ProfileMenu` | `ProfileMenuScreen.tsx` |
| `PersonalInformation` | `PersonalInformationScreen.tsx` |
| `Documents` | `DocumentsScreen.tsx` |
| `ServiceAreaEdit` | `ServiceAreaEditScreen.tsx` |
| `SpecializationsEdit` | `SpecializationsEditScreen.tsx` |
| `AvailabilitySchedule` | `AvailabilityScheduleScreen.tsx` |
| `Languages` | `LanguagesScreen.tsx` |
| `BioAbout` | `BioAboutScreen.tsx` |
| `PublicProfilePreview` | `PublicProfilePreviewScreen.tsx` |
| `ReferEarn` | `ReferEarnScreen.tsx` |
| `SupportHome` | `SupportHomeScreen.tsx` |
| `FaqList` | `FaqListScreen.tsx` |
| `RaiseTicket` | `RaiseTicketScreen.tsx` |
| `MyTickets` | `MyTicketsScreen.tsx` |
| `TicketChat` | `TicketChatScreen.tsx` |
| `Settings` | `SettingsScreen.tsx` |
| `DeleteAccount` | `DeleteAccountScreen.tsx` |

### Non-screen asset helper

| File | Role |
|------|------|
| `src/screens/splashVectorXml.ts` | Splash vector data (not a route) |

---

## Theme and shared UI

- **`src/theme/`** — prefer **`colors`**, **`fonts`**, **`spacing`**, **`shadows`** from `theme/index.ts` for new UI.
- **`src/components/ui/`** — reusable controls; export barrel `components/ui/index.ts` where applicable.
- **`KycStepChrome.tsx`** — shared KYC chrome: white header (`icon-back`, centered title, Help or “Skip for now”), hairline divider, red progress track, `#f6f6f8` scroll body, sticky white footer (use `KycDeliveryPrimaryButton` / outline variants from `components/ui/KycDeliveryButtons.tsx`). Matches delivery **`KycVerificationScreen`** / **`VehicleDetailsScreen`** layout.

---

## Assets

- **Expo:** `app.json` references `./assets/icon.png`, splash, adaptive icon, favicon — paths are relative to **`electricji_electrician_app/`**.
- **Metro `require` from `src/screens/`:** use **`require('../../assets/…')`** (two levels up to package root).

If Figma exports SVG-masked PNGs that look soft, run **`npm run assets:rasterize-figma-svgs`** (density **720** in script).

---

## Conventions for changes

1. **New screen:** add `src/screens/<Name>Screen.tsx`, register it on the correct **`Stack.Screen`** in the right **`*Stack.tsx`** (or **`RootNavigator`** for pre-login steps).
2. **Params:** extend **`src/navigation/types.ts`** (`HomeStackParamList`, etc.).
3. **Shared UI:** add to **`src/components/ui/`** if primitive; feature-specific pieces can live under **`src/components/`**.
4. **Legacy:** **`MainTabBar` / `MainTabShell`** are not used by **`MainTabs`** — prefer editing **`MainTabs.tsx`** and stacks for primary navigation changes.

---

## Search hints (for agents)

| Question | Where to look |
|----------|----------------|
| Where is navigation defined? | `src/navigation/*.tsx`, **`types.ts`** |
| What route params exist? | **`navigation/types.ts`** |
| Where is screen X? | **`src/screens/<Name>Screen.tsx`** — confirm wiring in **`*Stack.tsx`** or **`RootNavigator.tsx`** |
| Product flow / fields per screen? | **`Electrician-app.md`** |
| Why won’t my image load? | **`require`** path from **`src/screens/`** → **`../../assets/…`** |

---

*Update this file when you add stacks, tabs, root routes, or top-level folders.*
