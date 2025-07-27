import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaUserPlus } from "react-icons/fa";
import { auth, googleProvider } from "../auth/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const Auth = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [resetEmail, setResetEmail] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome ${result.user.displayName}`);
      navigate("/dashboard/home");
    } catch (err) {
      toast.error("Google sign-in failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Login successful");
      navigate("/dashboard/home");
    } catch (err) {
      toast.error("Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: form.fullName,
      });
      toast.success("Account created!");
      navigate("/dashboard/home");
    } catch (err) {
      toast.error("Sign up failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent");
      setResetEmail("");
      setShowReset(false);
    } catch (err) {
      toast.error("Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F9FF] pt-24 px-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Branding Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#00477B] to-[#50D6FE] text-white p-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-4"
          >
            Welcome to Spectra
          </motion.h2>
          <p className="text-center text-sm leading-relaxed max-w-xs">
            Deploy smarter. Build faster. Secure your cloud-native applications with the power of Spectra.
          </p>
        </div>

        {/* Auth Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          {/* Toggle Tabs */}
          {!showReset && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setMode("login")}
                className={`px-4 py-2 font-semibold border-b-2 transition ${
                  mode === "login" ? "border-[#00477B] text-[#00477B]" : "border-transparent text-gray-500"
                }`}
              >
                <FaLock className="inline-block mr-2" /> Login
              </button>
              <button
                onClick={() => setMode("register")}
                className={`ml-6 px-4 py-2 font-semibold border-b-2 transition ${
                  mode === "register" ? "border-[#00477B] text-[#00477B]" : "border-transparent text-gray-500"
                }`}
              >
                <FaUserPlus className="inline-block mr-2" /> Sign Up
              </button>
            </div>
          )}

          {/* Forgot Password View */}
          {showReset ? (
            <motion.form
              key="reset"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handlePasswordReset}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-[#00477B] text-center mb-2">Reset Your Password</h2>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00477B] hover:bg-[#00345d] text-white font-semibold py-2 rounded-md transition"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="text-[#00477B] hover:underline text-sm text-center w-full"
              >
                Back to Login
              </button>
            </motion.form>
          ) : mode === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
              onSubmit={handleLogin}
            >
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-[#00477B] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00477B] hover:bg-[#00345d] text-white font-semibold py-2 rounded-md transition"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
              onSubmit={handleRegister}
            >
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00477B] hover:bg-[#00345d] text-white font-semibold py-2 rounded-md transition"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
