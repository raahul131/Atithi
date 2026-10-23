# 16 · Rename app to Atithi

Status: done

## Goal
Rename the app from "Roam" / "roam" to "Atithi" / "atithi" across app configuration, wordmark, onboarding, authentication, profile, account, stay details, booking, policies, policy Q&A, and Studio configurations & seed data.

## Decisions
- App configuration in `app.json`: `name: "Atithi"`, `slug: "atithi"`, `scheme: "atithi"`.
- App package name in `package.json`: `name: "atithi"`.
- Brand wordmark: lowercase `"atithi"` in `src/components/brand/wordmark.tsx` and design system preview.
- User-facing UI copy: Capitalized `"Atithi"` in headers, policies, badge ("Atithi Explorer"), default profile name ("Atithi guest"), share messages, and support lines.
- Lowercase `"atithi"` in conversational copy where "roam" was lowercase (e.g. "atithi helps you find...", "New to atithi?", "Join atithi to save your stays...").
- Message bubble sender: `from: "atithi" | "guest"` with label "Atithi".
- Policies sheet & cards: "Atithi’s policies" and "Atithi policy".
- Types and hooks: Add `AtithiPolicy` and `useAtithiPolicies` while maintaining `RoamPolicy` and `useRoamPolicies` aliases for backwards compatibility.
- Studio configuration: Update title to `'Atithi'` in `studio/sanity.config.ts`, update package name in `studio/package.json`.
- Studio seed and copy scripts: Update policy copy in `studio/seed/policies.ts` (e.g. "Atithi service fee", "tell your host through Atithi", "Report the problem to Atithi", "All prices on Atithi are in US dollars"), schema comments, and generation instructions in `studio/scripts/copy.ts`.
- Natural verbs (such as "dogs can roam" in `studio/seed/stays.ts`) are preserved.
- Remote Sanity Context endpoint IDs in Sanity Cloud (`roam-record-search`, `roam-record-guest-policies`) and studioHost domain are kept as configured in Sanity dashboard to prevent breaking remote integrations.

## Out of scope
- Modifying remote cloud-registered Sanity Context endpoint names.
- Modifying natural verb uses of "roam" (such as "dogs can roam").

## Steps

### 1. Update native app configuration
Update `app.json` and `package.json` to change the app name, slug, and scheme to Atithi / atithi.
Files:
- `app.json`
- `package.json`

### 2. Update brand wordmark, design system, and onboarding copy
Update the wordmark text from "roam" to "atithi", the design system display sample, and the onboarding slide descriptions.
Files:
- `src/components/brand/wordmark.tsx`
- `src/app/design-system.tsx`
- `src/components/onboarding/slides.ts`

### 3. Update auth, profile, and account screens
Update copy in sign-in, sign-up, profile card, personal info, and coming-soon account topic pages.
Files:
- `src/app/(auth)/sign-in.tsx`
- `src/app/(auth)/sign-up.tsx`
- `src/components/profile/profile-card.tsx`
- `src/lib/profile.ts`
- `src/app/account/personal-info.tsx`
- `src/app/account/[topic].tsx`
- `src/app/(app)/profile.tsx`

### 4. Update stays, booking, policies, and policy sheet
Update stay share message, booking copy, policy query/types/hooks, and policies sheets.
Files:
- `src/app/stay/[slug]/index.tsx`
- `src/app/stay/[slug]/book.tsx`
- `src/app/policies.tsx`
- `src/app/stay/[slug]/policies.tsx`
- `src/lib/stays.ts`
- `src/lib/sanity/queries.ts`
- `src/hooks/use-roam-policies.ts`

### 5. Update Ask feature, message bubble, and policy answers
Update Ask screen, message bubble, fallback answers, and server-side policy card header labels to reflect Atithi.
Files:
- `src/app/stay/[slug]/ask.tsx`
- `src/components/ask/message-bubble.tsx`
- `src/lib/ask.ts`
- `src/lib/server/policy-answers.ts`

### 6. Update Studio configuration, seed data, and script copy
Update Studio title, schema comments, copy generator instructions, and seed policy strings (service fee, report to Atithi, host communication) in Studio.
Files:
- `studio/sanity.config.ts`
- `studio/schemaTypes/policy.ts`
- `studio/scripts/copy.ts`
- `studio/scripts/seed.ts`
- `studio/seed/policies.ts`

## Verification
- Run `npx expo lint` and `npx tsc --noEmit` to ensure zero lint or type errors.
- Verify all client-side screens and Studio seed files correctly reference Atithi / atithi.
- Ensure natural language verbs ("dogs can roam") remain untouched.

## AGENTS.md updates
Update app summary title and references where "Roam" refers to the app name.

## Result
Successfully renamed app to Atithi across native configuration (`app.json`, `package.json`), branding, UI copy, policies, questions/answers, hooks, types, and Studio seeds and configs. Lint and type check pass cleanly.
