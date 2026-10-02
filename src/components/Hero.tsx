'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Users, Award, Code, CheckCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F0FDF4] via-[#F8FAF9] to-white pt-16 pb-20 md:pt-24 md:pb-32 border-b border-[#DCE9DF]">
      {/* Background Soft Mint Radial Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#D1FAE5]/60 via-[#A7F3D0]/30 to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-7 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D1FAE5] border border-[#10B981]/30 text-[#14532D] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Next-Gen Engineering Learning Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17251D] tracking-tight leading-[1.1]">
              MASTER TECH SKILLS <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#10B981]">
                BUILD PRODUCTION CODE.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#647067] font-medium leading-relaxed max-w-2xl">
              Accelerate your software career with structured interactive courses, real-world development environments, and automated diagnostic evaluations.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#15803D] to-[#10B981] hover:from-[#14532D] hover:to-[#15803D] shadow-xl shadow-[#15803D]/25 hover:shadow-[#15803D]/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore All Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-[#14532D] bg-white hover:bg-[#F0FDF4] border border-[#DCE9DF] hover:border-[#10B981] shadow-md transition-all duration-200"
              >
                <Play className="w-4 h-4 text-[#15803D] fill-[#15803D]" />
                Student Dashboard
              </Link>
            </div>

            {/* Key Trust Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#DCE9DF]/80 max-w-xl">
              <div className="space-y-1">
                <div className="text-2xl font-black text-[#14532D]">12,500+</div>
                <div className="text-xs text-[#647067] font-medium">Active Learners</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-[#14532D]">42+ Hours</div>
                <div className="text-xs text-[#647067] font-medium">HD Video Modules</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-[#14532D]">4.9 / 5.0</div>
                <div className="text-xs text-[#647067] font-medium">Student Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive 3D Perspective Card Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-white border border-[#DCE9DF] p-6 shadow-2xl shadow-[#15803D]/15 space-y-6">
              
              {/* Header Floating Badge */}
              <div className="flex items-center justify-between border-b border-[#DCE9DF] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-[#647067] ml-2">skillforge-editor.tsx</span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#D1FAE5] text-[#14532D] text-[11px] font-bold">
                  ACTIVE LESSON
                </span>
              </div>

              {/* Code Snippet Box */}
              <div className="p-4 rounded-xl bg-[#17251D] text-white font-mono text-xs space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-emerald-400">
                  <span>{`// Full Stack React & Node Architecture`}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-slate-300">
                  <span className="text-emerald-400">const</span> course = <span className="text-amber-300">useCourse</span>(<span className="text-emerald-300">&apos;full-stack-dev&apos;</span>);
                </p>
                <p className="text-slate-300">
                  <span className="text-emerald-400">await</span> course.<span className="text-emerald-300">executeDiagnosticQuiz</span>();
                </p>
              </div>

              {/* Stats Card Overlay */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCE9DF] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
                    <ShieldCheck className="w-4 h-4" /> Verified Certificate
                  </div>
                  <div className="text-xs text-[#647067]">Upon completion</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCE9DF] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
                    <Code className="w-4 h-4" /> Real Code Projects
                  </div>
                  <div className="text-xs text-[#647067]">Hands-on labs</div>
                </div>
              </div>

              {/* Floating Badge Accent */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white border border-[#DCE9DF] p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#14532D] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-[#15803D]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#17251D]">Diagnostic Score: 100%</div>
                  <div className="text-[11px] text-[#647067]">Module 1 Verified</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
