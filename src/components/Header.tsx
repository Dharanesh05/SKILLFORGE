'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Menu, X, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useLearning();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Categories', href: '/courses#categories' },
    { name: 'My Learning', href: '/dashboard' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#DCE9DF] text-[#17251D] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14532D] via-[#15803D] to-[#10B981] flex items-center justify-center shadow-lg shadow-[#15803D]/20 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#10B981]">
                SKILLFORGE
              </span>
              <span className="text-[10px] tracking-widest text-[#15803D] font-bold uppercase -mt-1 flex items-center gap-1">
                Learn. Practice. Build.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-[#14532D] bg-[#D1FAE5] border border-[#10B981]/30 shadow-sm'
                      : 'text-[#647067] hover:text-[#17251D] hover:bg-[#F0FDF4]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F0FDF4] hover:bg-[#D1FAE5] text-[#14532D] text-sm font-semibold border border-[#DCE9DF] transition-all shadow-sm"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#15803D] text-white flex items-center justify-center text-xs font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <span className="font-semibold">{user?.name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-[#647067] hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-[#17251D] hover:text-[#15803D] hover:bg-[#F0FDF4] transition"
                >
                  Log In
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#15803D] to-[#10B981] hover:from-[#14532D] hover:to-[#15803D] shadow-md shadow-[#15803D]/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4" /> Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="p-2 rounded-xl text-[#17251D] hover:bg-[#F0FDF4] border border-[#DCE9DF] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#15803D]" />
              ) : (
                <Menu className="w-6 h-6 text-[#17251D]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#DCE9DF] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition ${
                  active
                    ? 'text-[#14532D] bg-[#D1FAE5] border border-[#10B981]/30 font-bold'
                    : 'text-[#647067] hover:text-[#17251D] hover:bg-[#F0FDF4]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#DCE9DF] flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-sm border border-rose-200"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-xl text-sm font-semibold text-[#17251D] bg-[#F8FAF9] border border-[#DCE9DF] hover:bg-[#F0FDF4]"
                >
                  Log In
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#15803D] to-[#10B981] shadow-md shadow-[#15803D]/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
