import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ambil semua klien
export async function GET() {
  const klien = await prisma.klien.findMany();
  return NextResponse.json(klien);
}

// Tambah klien baru
export async function POST(req) {
  const { name, email, phone } = await req.json();
  try {
    const klien = await prisma.klien.create({
      data: { name, email, phone },
    });
    return NextResponse.json(klien, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

// Update klien
export async function PUT(req) {
  const { id, name, email, phone } = await req.json();
  try {
    const klien = await prisma.klien.update({
      where: { id },
      data: { name, email, phone },
    });
    return NextResponse.json(klien);
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

// Hapus klien
export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await prisma.klien.delete({ where: { id } });
    return NextResponse.json({ message: "Klien berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
