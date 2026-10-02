'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { Lesson } from '@/types';
import { useLearning } from '@/context/LearningContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CurriculumSidebar } from '@/components/CurriculumSidebar';
import { ChevronLeft, ChevronRight, CheckCircle, FileText, HelpCircle } from 'lucide-react';

export default function LessonPlayerClient() {
  const params = useParams();
  const searchParams = useSearchParams();

  const courseId = params?.id as string;
  const lessonIdFromQuery = searchParams?.get('lesson');

  const course = COURSES.find((c) => c.id === courseId);
  const { markLessonComplete, isLessonCompleted, enrollCourse } = useLearning();

  const allLessons = course ? course.modules.flatMap((m) => m.lessons) : [];
  const initialLesson = allLessons.find((l) => l.id === lessonIdFromQuery) || allLessons[0];

  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(initialLesson);

  useEffect(() => {
    if (courseId) {
      enrollCourse(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (lessonIdFromQuery && allLessons.length > 0) {
      const found = allLessons.find((l) => l.id === lessonIdFromQuery);
      if (found) setCurrentLesson(found);
    }
  }, [lessonIdFromQuery]);

  if (!course || !currentLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Lesson Not Found</h2>
        <Link href="/courses" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const isCompleted = isLessonCompleted(course.id, currentLesson.id);

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setCurrentLesson(prevLesson);
    }
  };

  /**
   * INTENTIONAL BUG 6: Next Lesson opens wrong lesson
   * Expected: Advances to `allLessons[currentIndex + 1]`.
   * Actual: Advances to `allLessons[currentIndex + 2]` (skips lesson), opening the wrong lesson.
   */
  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      setCurrentLesson(nextLesson);
    }
  };

  const handleMarkComplete = () => {
    markLessonComplete(course.id, currentLesson.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Course Overview
        </Link>
        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
          {course.title}
        </span>
      </div>

      {/* Main Grid: Left Sidebar + Center Video + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Curriculum Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <CurriculumSidebar
            courseId={course.id}
            modules={course.modules}
            currentLessonId={currentLesson.id}
            onSelectLesson={(lesson) => setCurrentLesson(lesson)}
          />
        </div>

        {/* Center/Right Column: Video Player & Lesson Info */}
        <div className="order-1 lg:order-2 lg:col-span-2 space-y-6">
          {/* Video Player */}
          <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />

          {/* Navigation & Mark Complete Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevLesson}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Lesson
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentIndex >= allLessons.length - 1}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
              >
                Next Lesson <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleMarkComplete}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                isCompleted
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/25'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isCompleted ? 'Marked as Complete' : 'Mark as Complete'}
            </button>
          </div>

          {/* Lesson Details & Resources */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-violet-400">
                Lesson {currentIndex + 1} of {allLessons.length}
              </span>
              <h1 className="text-2xl font-bold text-white">{currentLesson.title}</h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentLesson.description || 'In this lesson, you will explore foundational concepts and practice applying them in practical code scenarios.'}
              </p>
            </div>

            {/* Resources Section */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-400" /> Lesson Downloads & Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-violet-500/50 text-xs text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                        <span className="truncate font-medium">{res.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 uppercase font-mono">
                        {res.type}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz CTA Banner */}
            {course.quiz && (
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <HelpCircle className="w-4 h-4 text-violet-400" /> Ready to test your comprehension?
                </div>
                <Link
                  href={`/courses/${course.id}/quiz`}
                  className="text-xs font-bold text-violet-400 hover:text-violet-300 transition"
                >
                  Take Course Quiz →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
