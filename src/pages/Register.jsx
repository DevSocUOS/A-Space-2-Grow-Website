import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import supabase from "../helper/supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    if (!email || !password || !confirmPassword) {
      setMessage({ text: "Please fill all fields", type: "error" });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage({ text: passwordError, type: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (currentSession) {
        await supabase.auth.setSession(currentSession);
      }

      setMessage({
        text: "✅ Registered successfully! Check your email to confirm your account.",
        type: "success",
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      setMessage({ text: `❌ Error: ${error.message}`, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5f5f5] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <Seo title="Registration" />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#333] mb-2">
            Create an Account
          </h2>
          <div className="w-20 h-1 bg-[#4caf50] mx-auto"></div>
        </div>

        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium text-center ${message.type === "error"
              ? "bg-[#ffebee] text-[#c62828]"
              : "bg-[#e8f5e9] text-[#2e7d32]"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#555] mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#fafafa] border border-[#e0e0e0] text-[#333] placeholder-[#9e9e9e] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#555] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#fafafa] border border-[#e0e0e0] text-[#333] placeholder-[#9e9e9e] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition"
              required
            />
            <p className="text-xs text-[#757575] mt-2">
              Must contain at least 6 characters, an uppercase letter and a number.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#555] mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#fafafa] border border-[#e0e0e0] text-[#333] placeholder-[#9e9e9e] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${isLoading
              ? "bg-[#81c784] cursor-not-allowed"
              : "bg-[#4caf50] hover:bg-[#388e3c] focus:ring-4 focus:ring-[#a5d6a7]"
              }`}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#757575]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#4caf50] font-medium focus:outline-none bg-transparent border-none p-0 hover:underline"
            style={{ boxShadow: "none" }}
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;