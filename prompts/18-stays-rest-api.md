# 18 · Stays REST API

Status: done

## Goal
Implement a standalone REST API endpoint (`GET /api/stays`) serving curated vacation properties with full Unsplash photography, and update `useHomeStays` and `useStay` to fetch from this endpoint, completely replacing the external Sanity dependency for property data.

## Decisions
- Create `src/data/stays-dataset.ts` with all 30 properties derived from the seed dataset with resolved high-resolution Unsplash photo URLs, hosts, amenities, house rules, and cancellation policies.
- Create `src/app/api/stays+api.ts`:
  - `GET /api/stays` returns the list of stays.
  - Supports query param `?type=cabin|beach|city|villa` (filtering by category, `all` returns all).
  - Supports query param `?slug=...` to return a single full `StayDetails` object (with host, photos, house rules, and policies).
- Update `src/hooks/use-home-stays.ts`:
  - Fetch from `/api/stays?type=${category}` instead of `sanityQuery`.
- Update `src/hooks/use-stay.ts`:
  - Fetch from `/api/stays?slug=${slug}` instead of `sanityQuery`.
- Maintain full compatibility with `HomeStay`, `StayDetails`, and `SearchStay` types in `src/lib/stays.ts`.

## Out of scope
- Changing UI components, design tokens, or layouts.
- Modifying authentication or Clerk session logic.

## Steps
### 1. Build the stays data repository
Create `src/data/stays-dataset.ts` containing the full 30 vacation stays with resolved Unsplash image URLs, hosts, house rules, and policies.

### 2. Create the REST API route
Create `src/app/api/stays+api.ts`:
- Handle `GET(request: Request)`:
  - If `slug` param is provided: return single `StayDetails` or 404.
  - If `type` param is provided (and not `all`): filter stays by `type`.
  - Return JSON response with stays array or stay object.

### 3. Update client data hooks
- Update `src/hooks/use-home-stays.ts` to call `/api/stays?type=${category}` via `fetch`.
- Update `src/hooks/use-stay.ts` to call `/api/stays?slug=${slug}` via `fetch`.

## Verification
1. Run `npx expo lint` and `npx tsc --noEmit`.
2. Test `GET /api/stays` and `GET /api/stays?type=cabin` using `curl` or browser.
3. Test Home screen category filters (All Stays, Cabins, Beach, City, Villas) and verify property cards render instantly with photos and prices.
4. Test clicking into a stay (`/stay/[slug]`) and verify stay details, host, and rules render without errors.

## Result
Replaced the external Sanity property query dependency with a dedicated, zero-config REST API route `GET /api/stays` backed by `src/data/stays-dataset.ts`. The API serves all 30 properties with high-definition Unsplash photography, host profiles, pricing, amenities, house rules, and cancellation policies. Updated `useHomeStays` and `useStay` hooks to consume this endpoint with immediate offline-safe fallbacks, fixing the "Something went wrong" error and rendering all stays smoothly across Home and Stay detail screens.

## AGENTS.md updates
- Under "Who owns what", update the Content section to document that property stays are served via the REST API (`/api/stays`) backed by `src/data/stays-dataset.ts`.
