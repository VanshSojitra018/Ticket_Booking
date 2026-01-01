import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null; // avoids crash while redirecting

  const [form, setForm] = useState(user);

  const save = () => {
    updateUser(form);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-xl font-semibold mb-4 text-center">Profile</h2>

        <input
          value={form.username}
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          value={form.email}
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          value={form.password}
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-primary text-white py-2 rounded mb-3"
          onClick={save}
        >
          Update Profile
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
