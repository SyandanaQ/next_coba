"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function KlienPage() {
  const [klien, setKlien] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null); // ID klien yang sedang diedit

  useEffect(() => {
    fetchKlien();
  }, []);

  const fetchKlien = async () => {
    const res = await fetch("/api/klien");
    const data = await res.json();
    setKlien(data);
  };

  const addKlien = async (e) => {
    e.preventDefault();
    if (editingId) {
      updateKlien(editingId);
      return;
    }

    const res = await fetch("/api/klien", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setPhone("");
      fetchKlien();
    }
  };

  const updateKlien = async (id) => {
    const res = await fetch("/api/klien", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email, phone }),
    });

    if (res.ok) {
      setEditingId(null);
      setName("");
      setEmail("");
      setPhone("");
      fetchKlien();
    }
  };

  const deleteKlien = async (id) => {
    const res = await fetch("/api/klien", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchKlien();
    }
  };

  const startEdit = (klien) => {
    setEditingId(klien.id);
    setName(klien.name);
    setEmail(klien.email);
    setPhone(klien.phone);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Daftar Klien</h2>
      <ul>
        {klien.map((k) => (
          <li key={k.id}>
            {k.name} - {k.email} - {k.phone}
            <button onClick={() => startEdit(k)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => deleteKlien(k.id)} style={{ marginLeft: "10px" }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <h3>{editingId ? "Edit Klien" : "Tambah Klien"}</h3>
      <form onSubmit={addKlien}>
        <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Telepon" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">{editingId ? "Update" : "Tambah"}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)} style={{ marginLeft: "10px" }}>
            Batal Edit
          </button>
        )}
      </form>

      <Link href="/">Kembali ke Users</Link>
    </div>
  );
}
