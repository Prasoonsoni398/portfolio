"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme, isDark, toggleMode, mounted } = useTheme();

  const [email, setEmail] = useState("contact.prasoonsoni@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to authenticate");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials or server error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors">
      {/* Top Controls: Back link and Theme Switcher */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-base-content/70 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>

        <button
          onClick={toggleMode}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content border border-base-300 flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
          title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
        >
          {mounted && isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-warning" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 pt-8 sm:pt-0">
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-sm mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Portfolio CRM Admin
          </h1>
          <p className="text-sm text-base-content/60 mt-2">
            Secure administrative control center for your portfolio
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-7 shadow-xl transition-colors">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-error/10 border border-error/20 text-error text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-base-content/70 mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="contact.prasoonsoni@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-base-100 border border-base-300 rounded-xl text-xs sm:text-sm text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-base-content/70 mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-base-100 border border-base-300 rounded-xl text-xs sm:text-sm text-base-content placeholder-base-content/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-content font-semibold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-primary-content/30 border-t-primary-content rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter CRM Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick info helper */}
          <div className="mt-6 pt-5 border-t border-base-300 flex items-center justify-between text-xs text-base-content/60">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Default Pass:
            </span>
            <code className="px-2 py-0.5 rounded bg-base-100 font-mono text-primary text-[11px] border border-base-300">
              admin123
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
