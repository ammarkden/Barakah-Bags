<div align="center">

<br />

```
██████╗  █████╗ ██████╗  █████╗ ██╗  ██╗ █████╗ ██╗  ██╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔══██╗██║  ██║
██████╔╝███████║██████╔╝███████║█████╔╝ ███████║███████║
██╔══██╗██╔══██║██╔══██╗██╔══██║██╔═██╗ ██╔══██║██╔══██║
██████╔╝██║  ██║██║  ██║██║  ██║██║  ██╗██║  ██║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
```

### بركة · Barakah Bags

**A bilingual food-rescue mobile app — connecting people with surplus food from local restaurants, bakeries, and grocery stores.**

<br />

![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?style=flat-square&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth_+_Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![i18n](https://img.shields.io/badge/i18n-EN_|_AR-4CAF50?style=flat-square)

<br />

</div>

---

## Overview

Barakah Bags is a food-rescue platform that reduces waste by enabling users to discover and reserve surprise bags of surplus food from nearby vendors — at a fraction of the original price. Built with full **English/Arabic bilingual support** and native **RTL layout switching**.

> Built as part of the Barakah Mobile Engineer technical assessment.

---

## Tech Stack

| Layer                | Technology                 |
| -------------------- | -------------------------- |
| Framework            | Expo SDK 54 + React Native |
| Routing              | Expo Router (file-based)   |
| Language             | TypeScript (strict mode)   |
| Auth & Database      | Firebase Auth + Firestore  |
| Server State         | React Query                |
| Styling              | NativeWind                 |
| Internationalization | i18next                    |
| Animations           | Reanimated                 |
| Image Rendering      | Expo Image                 |

---

## Features

- 🔐 **Anonymous Authentication** — Zero-friction onboarding via Firebase Auth
- ♾️ **Infinite Scroll Feed** — Paginated bag discovery powered by Firestore
- 🛍️ **Bag Details & Reservation** — Full reservation flow with live availability
- 🌐 **EN / AR Language Switching** — Full RTL layout support with i18next
- 🖼️ **Optimized Image Rendering** — Expo Image for caching and performance
- ⚠️ **Complete State Handling** — Loading, empty, and error states across all screens
- 🌱 **Seed Script** — Faker-powered Firestore seeder with ~35 mock bags

---

## Project Structure

```
src/
├── api/
│   ├── firebase/           # Firestore query functions
│   └── reactQuery/         # Query/mutation hooks wrappers
│
├── components/
│   ├── bagCard/            # Feed item card component
│   ├── errorHandler/       # Error display
│   ├── languageSwitcher/   # EN/AR toggle with RTL reload
│   └── loader/             # Loading state component
│
├── config/
│   └── firebase.ts         # Firebase app initialization
│
├── core/
│   └── appBootstrap.tsx    # App init: auth, i18n, nativewind
│
├── hooks/
│   ├── auth/               # Anonymous auth hook
│   ├── bags/               # useBags (feed) + useBag (single)
│   └── reservations/       # Reservation mutation hooks
│
├── i18n/
│   └── locale/
│       ├── ar.json
│       └── en.json
│
└── types/
    ├── types.ts # Describe the data types of the app
```

---

## Prerequisites

Ensure the following are installed before running the project:

**All platforms**

- [Node.js](https://nodejs.org/) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`

**iOS** _(macOS only)_

- [Xcode](https://developer.apple.com/xcode/) (latest stable) with Command Line Tools enabled
- iOS Simulator via Xcode → Settings → Platforms

**Android**

- [Android Studio](https://developer.android.com/studio) with the Android SDK installed
- An Android emulator configured via AVD Manager, or a physical device with USB debugging enabled
- `ANDROID_HOME` environment variable set correctly

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd barakah-bags
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

### 4. Run the App

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### 5. Seed Firestore (Optional)

Populate the database with ~35 mock bags using Faker:

```bash
npm run seed
```

---

## Architectural Decisions

**React Query for all async state** — All Firestore interactions are managed through React Query rather than raw `useEffect` hooks. This provides automatic caching, background refetching, and a clean separation between server state and UI state.

**Split entity hooks (`useBags` / `useBag`)** — Collection queries and single-entity queries are intentionally isolated into separate hooks. This improves cache granularity, avoids over-fetching, and makes each hook independently testable.

**File-based routing with Expo Router** — Keeps navigation declarative, co-located with screen code, and fully aligned with Expo SDK 54 conventions for scalability.

**Server state vs client state separation** — Firestore data is handled exclusively through React Query, while UI-only concerns were intentionally kept local to avoid unnecessary global state complexity.

**RTL via `I18nManager` with reload** — RTL layout direction is applied at the native level using `I18nManager.forceRTL()` followed by an app reload, ensuring correct bidirectional layout across all native components.

**Firebase Anonymous Auth on bootstrap** — Authentication is resolved silently during app initialization, so users enter the discovery feed immediately without any signup friction.

**Expo Image over RN Image** — Used throughout for its built-in disk/memory caching, progressive loading, and significantly better rendering performance on both platforms.

---

## Firestore Indexes

Two composite indexes are required. These can be created manually in the Firebase Console or auto-provisioned via the Firestore CLI.

**Index 1 — Paginated feed (available bags only, `quantityRemaining > 0`)**

| Collection | Field               | Order      |
| ---------- | ------------------- | ---------- |
| `bags`     | `quantityRemaining` | Ascending  |
| `bags`     | `createdAt`         | Descending |
| `bags`     | `__name__`          | Descending |

**Index 2 — Paginated feed filtered by category**

| Collection | Field               | Order      |
| ---------- | ------------------- | ---------- |
| `bags`     | `category`          | Ascending  |
| `bags`     | `quantityRemaining` | Ascending  |
| `bags`     | `createdAt`         | Descending |
| `bags`     | `__name__`          | Descending |

Both indexes are scoped to **Collection** and must be in **Enabled** status before running the app.

---

## Roadmap & Future Improvements

- [ ] **Dedicated `Restaurant` and `Category` entities** — Decouple restaurant/category data from the bag model for better normalization and query flexibility
- [ ] **Location ownership on restaurants** — Move geolocation data to the restaurant/branch level where it logically belongs
- [ ] **Structured pricing object** — Replace flat currency fields with a typed pricing model to support multi-currency and future pricing strategies
- [ ] **MVVM architecture** — Introduce a more explicit ViewModel layer as the app scales to improve separation of concerns
- [ ] **Global cart/user store** — Add Zustand or Context-based state for multi-step reservation flows
- [ ] **Push notifications** — Reservation confirmations, low-stock alerts, and high-demand bag notifications
- [ ] **Realtime Firestore listeners** — Live quantity updates and cross-device reservation sync
- [ ] **Offline-first support** — Stronger Firestore caching and optimistic UI for low-connectivity environments
- [ ] **Error Handling Strategy** - The application should continue evolving to provide a smoother experience where users always feel guided and never stuck during unexpected situations.
- [ ] **Loading States** — Skeleton-loading indicators rather than just simple loading.
- [ ] **Empty States** — Friendly fallback UI is shown when no bags are available for the selected category or query.

---

## Known Limitations

- RTL switching requires a full application reload to correctly apply native layout direction changes
- Firestore pagination and query architecture have room for further optimization at scale
- No dedicated global cart/user store has been implemented yet in the current MVP scope.

---

## Time Spent

Approximately 5–6 focused development hours.

---

<div align="center">

Built with care · بُني بعناية

</div>
