import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!form.username || !form.email || !form.password) {
    //   alert("All fields required");
      return;
    }

    register(form);
    // alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

        <input
          placeholder="Username"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-primary text-white py-2 rounded"
          onClick={handleSubmit}
        >
          Submit & Continue to Login
        </button>
      </div>
    </div>
  );
}
