import { hosts } from "../../studio/seed/hosts";
import { photos } from "../../studio/seed/photos";
import { policies } from "../../studio/seed/policies";
import { stays } from "../../studio/seed/stays";
import type {
  HomeStay,
  Policy,
  PolicyBlock,
  StayDetails,
  StayHost,
} from "@/lib/stays";

function toBlocks(lines: string[]): PolicyBlock[] {
  return lines.map((line, idx) => ({
    _key: `b-${idx}`,
    _type: "block",
    style: line.startsWith("## ") ? "h3" : "normal",
    listItem: line.startsWith("- ") ? "bullet" : undefined,
    children: [
      {
        _key: `s-${idx}`,
        text: line.replace(/^##\s+/, "").replace(/^-\s+/, ""),
      },
    ],
  }));
}

const policyMap = new Map<string, Policy>();
for (const p of policies) {
  policyMap.set(p.slug, {
    kind: p.kind,
    title: p.title,
    summary: p.summary,
    body: toBlocks(p.body),
  });
}

const hostMap = new Map<string, StayHost>();
for (const h of hosts) {
  hostMap.set(h.slug, {
    name: h.name,
    photoUrl: null,
    bio: h.bio,
    isSuperhost: h.isSuperhost,
    hostingSince: h.hostingSince,
    responseTime: h.responseTime,
    languages: h.languages,
  });
}

const generalPolicies = Array.from(policyMap.values()).filter(
  (p) => p.kind !== "cancellation"
);

export const allStayDetails: StayDetails[] = stays.map((s) => {
  const stayPhotos = s.photos
    .map((key) => {
      const item = photos[key];
      if (!item) return null;
      return {
        url: `https://images.unsplash.com/photo-${item.id}?w=1200&auto=format&q=80`,
        alt: item.alt,
      };
    })
    .filter(Boolean) as { url: string; alt: string }[];

  const cancellationPolicy = policyMap.get(s.cancellation) ?? null;
  const host = hostMap.get(s.host) ?? null;

  return {
    id: s.slug,
    slug: s.slug,
    title: s.title,
    type: s.type,
    city: s.city,
    region: s.region ?? null,
    country: s.country,
    rating: s.rating,
    reviewCount: s.reviewCount,
    pricePerNight: s.pricePerNight,
    cleaningFee: s.cleaningFee,
    minNights: s.minNights,
    maxGuests: s.maxGuests,
    amenities: s.amenities,
    photos: stayPhotos,
    houseRules: {
      checkInTime: s.houseRules.checkInTime,
      checkOutTime: s.houseRules.checkOutTime,
      quietHoursFrom: s.houseRules.quietHoursFrom ?? null,
      quietHoursTo: s.houseRules.quietHoursTo ?? null,
      petsAllowed: s.houseRules.petsAllowed,
      maxPets: s.houseRules.maxPets ?? null,
      petFee: s.houseRules.petFee ?? null,
      smokingAllowed: s.houseRules.smokingAllowed,
      partiesAllowed: s.houseRules.partiesAllowed,
      additionalRules: s.houseRules.additionalRules ?? null,
    },
    host,
    cancellationPolicy,
    policies: generalPolicies,
  };
});

export const allHomeStays: HomeStay[] = allStayDetails.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  city: s.city,
  region: s.region,
  country: s.country,
  rating: s.rating,
  pricePerNight: s.pricePerNight,
  imageUrl: s.photos[0]?.url ?? "",
  imageAlt: s.photos[0]?.alt ?? null,
  type: s.type,
}));

export function getHomeStays(type?: string | null): HomeStay[] {
  if (!type || type === "all") {
    return allHomeStays;
  }
  return allHomeStays.filter((s) => s.type === type);
}

export function getStayBySlug(slug: string): StayDetails | null {
  return allStayDetails.find((s) => s.slug === slug) ?? null;
}
