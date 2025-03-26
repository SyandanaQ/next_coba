import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Middleware untuk Prisma agar tidak crash di Next.js
prisma.$connect();

// Handle GET Request (Ambil semua user)
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

// Handle POST Request (Tambah user)
export async function POST(req) {
    const { name, email } = await req.json();
    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
    }
}

export async function PUT(req) {
    const { id, name, email } = await req.json();
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json({ error: "Gagal update user" }, { status: 500 });
    }
  }
  

// Handle DELETE Request (Hapus user)
export async function DELETE(req) {
    const { id } = await req.json();
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json({ message: "User berhasil dihapus" });
    } catch (error) {
      return NextResponse.json({ error: "Gagal menghapus user" }, { status: 500 });
    }
}
