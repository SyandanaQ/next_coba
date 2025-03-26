"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch data users
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // Tambah user baru
  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    }
  };

  // Mulai proses edit
  const startEdit = (user) => {
    setEditingUser(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingUser, name, email }),
    });

    if (res.ok) {
      setEditingUser(null);
      setName("");
      setEmail("");
      fetchUsers();
    }
  };

  // Hapus user
  const deleteUser = async (id) => {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Daftar Pengguna</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => startEdit(user)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => deleteUser(user.id)} style={{ marginLeft: "10px" }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <h3>{editingUser ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
      <form onSubmit={editingUser ? updateUser : addUser}>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingUser ? "Update" : "Tambah"}</button>
        {editingUser && (
          <button
            onClick={() => {
              setEditingUser(null);
              setName("");
              setEmail("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Batal
          </button>
        )}
      </form>
    </div>
  );
}
