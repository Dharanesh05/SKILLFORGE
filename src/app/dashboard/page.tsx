'use client';

import React from 'react';
import Link from 'next/link';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, CheckCircle, Clock, Flame, PlayCircle, ArrowRight, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentDashboardPage() {
  const { user, enrolledCourseIds, getCourseProgress, completedLessonIds, quizScores } = useLearning();

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));

  // Count courses fully completed
  const completedCoursesCount = enrolledCourses.filter((course) => {
    const total = course.modules.flatMap((m) => m.lessons).length;
    const completed = (completedLessonIds[course.id] || []).length;
    return completed >= total && total > 0;
  }).length;

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#10B981] border border-[#10B981]/40 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#D1FAE5] text-xs font-bold uppercase tracking-wider backdrop-blur border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D1FAE5]" /> Student Learning Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-[#D1FAE5]/90 text-sm max-w-xl leading-relaxed">
              Track your ongoing tech courses, view learning stats, and jump straight back into your active lessons.
            </p>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Courses Enrolled */}
          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#14532D] flex items-center justify-center shrink-0 font-bold">
              <BookOpen className="w-6 h-6 text-[#15803D]" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#17251D]">{enrolledCourses.length}</div>
              <div className="text-xs text-[#647067] font-semibold">Courses Enrolled</div>
            </div>
          </div>

          {/* Courses Completed */}
          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#14532D] flex items-center justify-center shrink-0 font-bold">
              <CheckCircle className="w-6 h-6 text-[#15803D]" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#17251D]">{completedCoursesCount}</div>
              <div className="text-xs text-[#647067] font-semibold">Courses Completed</div>
            </div>
          </div>

          {/* Learning Hours */}
          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#14532D] flex items-center justify-center shrink-0 font-bold">
              <Clock className="w-6 h-6 text-[#15803D]" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#17251D]">24.5 hrs</div>
              <div className="text-xs text-[#647067] font-semibold">Learning Hours</div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              <Flame className="w-6 h-6 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#17251D]">7 Days</div>
              <div className="text-xs text-[#647067] font-semibold">Current Streak</div>
            </div>
          </div>
        </div>

        {/* My Learning Enrolled Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#17251D]">My Learning Track</h2>
            <Link
              href="/courses"
              className="text-xs font-bold text-[#15803D] hover:text-[#14532D] transition flex items-center gap-1"
            >
              Explore More Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => {
                const progressPct = getCourseProgress(course.id);
                const firstLesson = course.modules[0]?.lessons[0];

                return (
                  <motion.div
                    key={course.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-[#DCE9DF] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-[#10B981] transition shadow-sm hover:shadow-md"
                  >
                    <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-[#F0FDF4] shrink-0 relative border border-[#DCE9DF]">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#D1FAE5]/95 text-[10px] font-bold text-[#14532D] uppercase border border-[#10B981]/30">
                        {course.category}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-[#17251D] line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#647067] line-clamp-1">
                          Instructor: {course.instructor.name}
                        </p>
                      </div>

                      {/* Progress Bar & Percentage */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#647067]">Course Progress</span>
                          <span className="font-bold text-[#15803D]">{progressPct}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-[#F0FDF4] rounded-full overflow-hidden border border-[#DCE9DF]">
                          <div
                            className="h-full bg-gradient-to-r from-[#15803D] to-[#10B981] transition-all duration-300 rounded-full"
                            style={{ width: `${Math.min(progressPct, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Action */}
                      {firstLesson && (
                        <Link
                          href={`/courses/${course.id}/learn?lesson=${firstLesson.id}`}
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#F0FDF4] hover:bg-[#15803D] text-[#14532D] hover:text-white border border-[#DCE9DF] hover:border-[#15803D] text-xs font-bold transition shadow-sm"
                        >
                          <PlayCircle className="w-4 h-4" /> Continue Learning
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-[#DCE9DF] rounded-2xl p-10 text-center space-y-4 shadow-sm">
              <BookOpen className="w-10 h-10 text-[#15803D] mx-auto" />
              <h3 className="text-lg font-bold text-[#17251D]">No enrolled courses yet</h3>
              <p className="text-sm text-[#647067]">
                Browse our course catalogue and start building modern tech skills today.
              </p>
              <Link
                href="/courses"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#15803D] text-white font-bold text-sm hover:bg-[#14532D] transition shadow-md"
              >
                Explore Catalogue
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
