import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tripSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.searchParams.get("origin");
  const destination = request.nextUrl.searchParams.get("destination");
  const trips = await prisma.trip.findMany({
    where: {
      status: "OPEN",
      ...(origin ? { origin: { contains: origin, mode: "insensitive" } } : {}),
      ...(destination ? { destination: { contains: destination, mode: "insensitive" } } : {}),
      departureAt: { gte: new Date() },
    },
    include: { traveler: { select: { id: true, fullName: true, verification: true } } },
    orderBy: { departureAt: "asc" },
    take: 50,
  });
  return NextResponse.json({ data: trips });
}

export async function POST(request: NextRequest) {
  const parsed = tripSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 400 });
  }

  const traveler = await prisma.user.findUnique({ where: { id: parsed.data.travelerId } });
  if (!traveler) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

  const trip = await prisma.trip.create({ data: parsed.data });
  return NextResponse.json({ data: trip }, { status: 201 });
}
