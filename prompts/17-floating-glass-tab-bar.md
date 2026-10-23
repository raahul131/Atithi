# 17 · Floating glass tab bar

Status: done

## Goal
Replace the default `NativeTabs` with a custom floating glass tab bar that matches the design across iOS, Android, and Web: a translucent frosted glass pill dock anchored at the bottom with icons and small labels, and an illuminated yellow circular pill with shadow for the active tab.

## Decisions
- Replaces `NativeTabs` from `expo-router/unstable-native-tabs` in `src/app/(app)/_layout.tsx` with standard `Tabs` from `expo-router` using a custom `tabBar` component (`src/components/navigation/floating-tab-bar.tsx`).
- Visual design strictly matches the attached design:
  - Container: floating pill dock with rounded corners (`rounded-full`), frosted translucent background (`bg-white/75 backdrop-blur-xl` with `GlassView` on iOS where Liquid Glass is supported), thin white border (`border border-white/80`), and soft shadow (`shadow-overlay`).
  - Active tab: vibrant yellow circle (`bg-primary`, `size-12 rounded-full`) with warm amber glow/shadow (`shadow-[0_4px_16px_rgba(255,198,41,0.55)]`), filled icon in ink (`homeFill` for Home, `search` for Search, `calendar` for Trips, `person` for Profile), and small label underneath (`text-[11px] font-jakarta-medium text-ink`).
  - Inactive tabs: outline icons in ink (`home`, `search`, `calendar`, `person`), transparent background, and small label underneath (`text-[11px] font-jakarta-medium text-ink`).
- Tab triggers: Home, Search, Trips, Profile.
- Press interaction: `PressableScale` with `selectionAsync()` from `expo-haptics` on press.
- Screen insets: add bottom padding (`pb-24`) to tab screens so scrolled content has full clearance above the floating dock. Remove obsolete CSS overrides from `src/global.css` that targeted Radix `unstable-native-tabs`.

## Out of scope
- Changes to tab screen content or business logic.
- New routes or tab triggers.

## Steps
### 1. Build the FloatingTabBar component
Create `src/components/navigation/floating-tab-bar.tsx` conforming to React Navigation / Expo Router `BottomTabBarProps`.
- Render the outer floating glass pill dock using `isLiquidGlassAvailable()` / `GlassView` where available, with fallback `bg-white/75 backdrop-blur-xl border border-white/80 shadow-overlay`.
- Map each route (`home`, `search`, `trips`, `profile`) to its respective icon pair (`homeFill`/`home`, `search`, `calendar`, `person`).
- Render the active tab with the glowing yellow circular pill (`bg-primary`) and label underneath.
- Render inactive tabs with outline icons and labels underneath.
- Handle tab navigation and fire `expo-haptics` selection feedback.

### 2. Update (app) layout
Update `src/app/(app)/_layout.tsx`:
- Replace `NativeTabs` with standard `Tabs` from `expo-router`.
- Pass `tabBar={(props) => <FloatingTabBar {...props} />}` and `screenOptions={{ headerShown: false }}`.
- Configure `Tabs.Screen` for `home`, `search`, `trips`, and `profile`.

### 3. Clean up global CSS and verify spacing
- In `src/global.css`, remove the temporary Radix tablist override that was used for `NativeTabs`.
- Ensure tab screens (`home.tsx`, `search.tsx`, `profile.tsx`) have comfortable bottom padding (`pb-24`) so content is never blocked by the dock.

## Verification
1. Run `npx expo lint` and `npx tsc --noEmit`.
2. Inspect the bottom navigation bar on Web, iOS simulator, and Android.
3. Confirm that the navbar is a floating frosted glass pill at the bottom with icons and labels.
4. Confirm switching tabs smoothly illuminates the active tab with the yellow circle and routes between Home, Search, Trips, and Profile.

## AGENTS.md updates
- Replace the note saying `the design's yellow selected pill isn't drawable natively` under Design System with:
  `Tab bar: (app) uses standard Expo Router Tabs with a custom floating glass bar (FloatingTabBar) featuring the design's yellow glowing active circle, icons, labels, and frosted glass dock.`

## Result
Custom floating glass tab bar matching the design was implemented in `src/components/navigation/floating-tab-bar.tsx` and connected in `src/app/(app)/_layout.tsx`. Sanity project fallback defaults were configured in `src/lib/sanity/fetch.ts` and `.env.local`, resolving the "Something went wrong" stays loading error.
