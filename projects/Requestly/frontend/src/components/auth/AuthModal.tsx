import React, { useState } from "react";
import axios from "axios";
import { X, Mail, Lock, User, MapPin } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { FormDataType, AuthModalProps } from "../../types";

export default function AuthModal({
  mode,
  onClose,
  onSwitchMode,
}: AuthModalProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer" as "buyer" | "seller",
    location: "New York, NY",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);
  //helper function for sending data
  const registerUser = async (formData: FormDataType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        formData
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return user;
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Registration failed");
      setFormData((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      throw error;
    }
  };

  const loginUser = async (formData: FormDataType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        formData
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return user;
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Invalid credentials");
      setFormData((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      throw error;
    }
  };
  //submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      let user;
      if (mode === "register") {
        user = await registerUser(formData);
      } else {
        user = await loginUser(formData);
      }
      dispatch({ type: "LOGIN", payload: user });
      onClose();
    } catch (error) {
      // errorMsg is already set in catch above
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Welcome Back" : "Join Requestly"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 space-y-4 ${shake ? "animate-shake" : ""}`}
        >
          {errorMsg && (
            <div className="mb-2 text-red-600 text-center font-medium">
              {errorMsg}
            </div>
          )}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "buyer" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "buyer"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-2xl mb-1">🛒</div>
                    <div className="text-sm font-medium">Buy Services</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "seller" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "seller"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-2xl mb-1">💼</div>
                    <div className="text-sm font-medium">Sell Services</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Enter your location"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() =>
                onSwitchMode(mode === "login" ? "register" : "login")
              }
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

