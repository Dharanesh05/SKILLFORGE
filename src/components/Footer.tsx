'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Shield, Code, Sparkles, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14532D] text-white border-t border-[#15803D]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#15803D] to-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-900/40">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white">
                SKILLFORGE
              </span>
            </Link>
            <p className="text-sm text-[#D1FAE5]/80 leading-relaxed">
              Empowering engineers and developers with production-grade interactive courses, real-world projects, and skill validation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-[#15803D]/40 hover:bg-[#10B981] hover:text-[#14532D] text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#15803D]/40 hover:bg-[#10B981] hover:text-[#14532D] text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#15803D]/40 hover:bg-[#10B981] hover:text-[#14532D] text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#D1FAE5] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#10B981]" /> Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D1FAE5]/70">
              <li><Link href="/courses" className="hover:text-white transition-colors">Course Catalogue</Link></li>
              <li><Link href="/courses#categories" className="hover:text-white transition-colors">Explore Categories</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Account Access</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#D1FAE5] uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#10B981]" /> Popular Tracks
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D1FAE5]/70">
              <li><Link href="/courses?category=Web+Development" className="hover:text-white transition-colors">Full Stack Web Development</Link></li>
              <li><Link href="/courses?category=Programming" className="hover:text-white transition-colors">Python & Algorithms</Link></li>
              <li><Link href="/courses?category=Data+%26+AI" className="hover:text-white transition-colors">Machine Learning & AI</Link></li>
              <li><Link href="/courses?category=Cybersecurity" className="hover:text-white transition-colors">Cloud & Security</Link></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#D1FAE5] uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#10B981]" /> Skill Updates
            </h4>
            <p className="text-xs text-[#D1FAE5]/70">
              Subscribe to get notified when new hands-on courses and modules drop.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="your.email@skillforge.io"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#15803D]/30 border border-[#15803D] text-white placeholder-[#D1FAE5]/50 text-xs focus:outline-none focus:border-[#10B981] transition"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#14532D] bg-[#10B981] hover:bg-[#D1FAE5] transition-all shadow-md"
              >
                Subscribe Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#15803D]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D1FAE5]/60 gap-4">
          <p>© {new Date().getFullYear()} SKILLFORGE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
