import { getHomeStays, getStayBySlug } from "@/data/stays-dataset";

// GET /api/stays:
// - /api/stays: returns all home stays
// - /api/stays?type=cabin|beach|city|villa: returns stays filtered by category
// - /api/stays?slug=<slug>: returns full stay details
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const type = url.searchParams.get("type");

  if (slug) {
    const stay = getStayBySlug(slug);
    if (!stay) {
      return Response.json({ error: "Stay not found" }, { status: 404 });
    }
    return Response.json(stay);
  }

  const stays = getHomeStays(type);
  return Response.json(stays);
}
