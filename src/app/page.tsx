'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { CourseCard } from '@/components/CourseCard';
import { COURSES } from '@/data/courses';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Palette, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Target, 
  Zap,
  Users,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'Web Development', title: 'Web Development', icon: Code2, count: '4 Courses', desc: 'React, Next.js, HTML5, CSS Grid, Express & MongoDB' },
  { id: 'Programming', title: 'Programming & CS', icon: Terminal, count: '3 Courses', desc: 'Python ES6, Data Structures, Algorithms & OOP' },
  { id: 'Data & AI', title: 'Data Science & AI', icon: Cpu, count: '3 Courses', desc: 'Machine Learning, PyTorch, Pandas & Neural Nets' },
  { id: 'Cybersecurity', title: 'Cybersecurity & Cloud', icon: ShieldCheck, count: '2 Courses', desc: 'AWS VPC, EC2, Ethical Hacking & Security Tools' },
  { id: 'Cloud Computing', title: 'DevOps & Cloud', icon: Layers, count: '2 Courses', desc: 'Docker, Kubernetes, Terraform & CI/CD Pipelines' },
  { id: 'Design', title: 'UI/UX & Design', icon: Palette, count: '2 Courses', desc: 'Figma Systems, Design Tokens & User Experience' },
];

const FEATURES = [
  {
    icon: Target,
    title: 'Hands-on Code Labs',
    desc: 'Practice directly inside video modules with real-world interactive code examples and exercise challenges.'
  },
  {
    icon: Zap,
    title: 'Automated Quizzes',
    desc: 'Instant scoring and diagnostic feedback on end-of-module knowledge checks to measure mastery.'
  },
  {
    icon: Award,
    title: 'Verified Certificates',
    desc: 'Earn shareable credentials upon completing course modules and passing final diagnostic tests.'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    desc: 'Courses authored and curated by principal architects and senior industry practitioners.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Marcus Chen',
    role: 'Full Stack Engineer @ Vercel',
    text: 'SkillForge helped me master modern React architecture and Next.js 14 in record time. The interactive quizzes made concepts stick!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Elena Rostova',
    role: 'Cloud Architect @ AWS Partner',
    text: 'The cloud security and DevOps modules are incredibly detailed. I went from beginner to configuring AWS VPCs confidently.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'David Patel',
    role: 'AI Researcher & Student',
    text: 'Clear explanations, practical exercises, and sleek interface. Easily the best engineering learning platform available.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredCourses = activeTab === 'All' 
    ? COURSES.slice(0, 6)
    : COURSES.filter(c => c.category === activeTab).slice(0, 6);

  return (
    <div className="bg-[#F8FAF9] text-[#17251D] min-h-screen">
      {/* ── Hero Section ───────────────────────────── */}
      <Hero />

      {/* ── Popular Categories Section ───────────── */}
      <section id="categories" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
            Explore Tracks
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17251D] tracking-tight">
            Popular Learning Categories
          </h2>
          <p className="text-[#647067] text-base max-w-2xl mx-auto">
            Select a specialized track tailored to high-demand industry engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/courses?category=${encodeURIComponent(cat.id)}`}
                  className="group block p-6 rounded-2xl bg-white border border-[#DCE9DF] hover:border-[#10B981] shadow-sm hover:shadow-xl hover:shadow-[#15803D]/10 transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] group-hover:bg-[#15803D] text-[#15803D] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#D1FAE5] text-[#14532D]">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17251D] group-hover:text-[#15803D] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#647067] leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#DCE9DF] flex items-center gap-1.5 text-xs font-bold text-[#15803D] group-hover:translate-x-1 transition-transform">
                    Explore Track <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Featured Courses Showcase ──────────────── */}
      <section className="py-20 bg-white border-y border-[#DCE9DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
                Top Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#17251D] tracking-tight">
                Featured Industry Courses
              </h2>
              <p className="text-[#647067] text-sm max-w-xl">
                Hands-on courses structured with video lessons, code downloads, and diagnostic quizzes.
              </p>
            </div>

            {/* Category Tab Filters */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Web Development', 'Programming', 'Data & AI'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-[#15803D] text-white shadow-md shadow-[#15803D]/20'
                      : 'bg-[#F0FDF4] text-[#647067] hover:text-[#17251D] hover:bg-[#D1FAE5]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-[#14532D] bg-[#F0FDF4] hover:bg-[#D1FAE5] border border-[#DCE9DF] hover:border-[#10B981] transition-all shadow-sm"
            >
              Browse Full Course Catalogue <ArrowRight className="w-4 h-4 text-[#15803D]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Why Choose SkillForge ───────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
            Why SkillForge
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#17251D] tracking-tight">
            Designed for Practical Mastery
          </h2>
          <p className="text-[#647067] text-base max-w-xl mx-auto">
            Traditional learning focuses on theory. SkillForge emphasizes practical execution and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white border border-[#DCE9DF] hover:border-[#10B981] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#14532D] flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6 text-[#15803D]" />
                </div>
                <h3 className="text-lg font-bold text-[#17251D]">{feat.title}</h3>
                <p className="text-xs text-[#647067] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Student Reviews ─────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#DCE9DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
              Student Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#17251D] tracking-tight">
              Trusted by 12,000+ Engineers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#DCE9DF] space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-[#17251D] italic leading-relaxed">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#DCE9DF]">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#10B981]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#17251D]">{t.name}</h4>
                    <p className="text-[11px] text-[#647067]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action Banner ───────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#10B981] p-10 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <span className="px-4 py-1.5 rounded-full bg-white/15 text-[#D1FAE5] text-xs font-bold uppercase tracking-wider backdrop-blur inline-block border border-white/20">
            Start Your Odyssey Today
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Upgrade Your Tech Capabilities?
          </h2>

          <p className="text-sm sm:text-base text-[#D1FAE5]/90 max-w-xl mx-auto leading-relaxed">
            Access 12+ production-ready courses, hands-on video modules, and diagnostic quizzes today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-[#14532D] bg-white hover:bg-[#F0FDF4] shadow-xl transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#14532D]/60 hover:bg-[#14532D] border border-white/30 backdrop-blur transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
