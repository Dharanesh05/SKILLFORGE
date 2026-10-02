'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLearning } from '../../context/LearningContext';
import { BookOpen, Mail, Lock, ArrowRight, CheckSquare, Square } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLearning();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    login(email, password);
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#F8FAF9] min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border border-[#DCE9DF] rounded-3xl p-8 space-y-8 shadow-xl relative overflow-hidden">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1FAE5]/60 blur-3xl rounded-full pointer-events-none" />

        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14532D] via-[#15803D] to-[#10B981] flex items-center justify-center shadow-md shadow-[#15803D]/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-[#17251D] tracking-wider">
              SKILLFORGE
            </span>
          </Link>
          <h1 className="text-2xl font-black text-[#17251D]">Welcome Back</h1>
          <p className="text-xs text-[#647067]">Log in to access your courses and student dashboard.</p>
        </div>

        {/* Validation Error Display */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17251D] uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="student@skillforge.io"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] placeholder-[#647067] text-sm font-medium focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#10B981]/20 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#17251D] uppercase tracking-wider block">
                Password
              </label>
              <a href="#" className="text-xs text-[#15803D] hover:text-[#14532D] font-semibold transition">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] placeholder-[#647067] text-sm font-medium focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#10B981]/20 transition"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-xs text-[#647067] font-medium hover:text-[#17251D]"
            >
              {rememberMe ? (
                <CheckSquare className="w-4 h-4 text-[#15803D]" />
              ) : (
                <Square className="w-4 h-4 text-[#647067]" />
              )}
              <span>Remember me on this device</span>
            </button>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#15803D] to-[#10B981] hover:from-[#14532D] hover:to-[#15803D] shadow-xl shadow-[#15803D]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Log In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Create Account Link */}
        <div className="text-center pt-2 border-t border-[#DCE9DF] text-xs text-[#647067]">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-bold text-[#15803D] hover:text-[#14532D] transition">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
