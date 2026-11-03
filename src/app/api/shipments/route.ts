import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shipmentSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET() {
  const shipments = await prisma.shipment.findMany({
    where: { status: "SEARCHING" },
    include: { sender: { select: { id: true, fullName: true, verification: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ data: shipments });
}

export async function POST(request: NextRequest) {
  const parsed = shipmentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 400 });
  }

  const sender = await prisma.user.findUnique({ where: { id: parsed.data.senderId } });
  if (!sender) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

  const shipment = await prisma.shipment.create({ data: parsed.data });
  return NextResponse.json({ data: shipment }, { status: 201 });
}
