'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { Star, Users, Clock, PlayCircle, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

export default function CourseDetailClient() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = COURSES.find((c) => c.id === courseId);
  const { enrolledCourseIds, enrollCourse } = useLearning();

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#17251D]">Course Not Found</h2>
        <p className="text-[#647067]">The course you are looking for does not exist or has been removed.</p>
        <Link href="/courses" className="inline-block px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-sm font-bold shadow-md">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const firstLesson = course.modules[0]?.lessons[0];

  const handleEnrollAndStart = () => {
    enrollCourse(course.id);
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen pb-20 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#F0FDF4] via-[#F8FAF9] to-white border-b border-[#DCE9DF] pt-10 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Left Header Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D1FAE5] text-[#14532D] border border-[#10B981]/30">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#17251D] border border-[#DCE9DF]">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17251D] tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-[#647067] leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#647067] pt-2 border-t border-[#DCE9DF]">
                <div className="flex items-center gap-1.5 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-[#647067] font-normal">({course.reviewsCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#15803D]" />
                  <span className="text-[#17251D] font-semibold">{course.students.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#15803D]" />
                  <span className="text-[#17251D] font-semibold">{course.duration} total length</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#10B981]"
                />
                <div>
                  <div className="text-xs text-[#647067]">Course Instructor</div>
                  <div className="text-sm font-bold text-[#17251D]">{course.instructor.name}</div>
                </div>
              </div>
            </div>

            {/* Right Course Card CTA Box */}
            <div className="bg-white border border-[#DCE9DF] rounded-3xl p-6 shadow-xl space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#F0FDF4] border border-[#DCE9DF]">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#14532D]/30 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#15803D] text-white flex items-center justify-center shadow-lg shadow-[#15803D]/40">
                    <PlayCircle className="w-8 h-8 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#647067] block">Tuition</span>
                  <span className="text-2xl font-black text-[#17251D]">
                    {course.price === 0 ? <span className="text-[#15803D]">Free Access</span> : course.priceLabel}
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D1FAE5] text-[#14532D]">
                  Full Lifetime Access
                </span>
              </div>

              {/* Start Learning / Enroll Button */}
              {firstLesson && (
                <Link
                  href={`/courses/${course.id}/learn?lesson=${firstLesson.id}`}
                  onClick={handleEnrollAndStart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#15803D] to-[#10B981] hover:from-[#14532D] hover:to-[#15803D] shadow-xl shadow-[#15803D]/25 transition-all text-center"
                >
                  <PlayCircle className="w-5 h-5 fill-white" />
                  Start Learning
                </Link>
              )}

              <div className="space-y-2 text-xs text-[#647067] pt-2 border-t border-[#DCE9DF]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#15803D]" /> 100% Online & Self-Paced
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#15803D]" /> Certificate of Completion Included
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#15803D]" /> Diagnostic Knowledge Quiz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Curriculum & Overview */}
          <div className="lg:col-span-2 space-y-10">
            {/* Course Overview */}
            <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-[#17251D] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#15803D]" /> What You Will Learn
              </h2>
              <p className="text-[#647067] text-sm leading-relaxed">
                This course delivers practical hands-on exercises, structural architecture walkthroughs, and guided projects designed to prepare you for production software engineering challenges.
              </p>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#17251D]">Course Curriculum</h2>
                <span className="text-xs font-bold text-[#15803D] bg-[#D1FAE5] px-3 py-1 rounded-full">
                  {course.modules.length} Modules • {course.modules.flatMap((m) => m.lessons).length} Lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="bg-white border border-[#DCE9DF] rounded-2xl p-6 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#14532D]">{mod.title}</h3>
                      <span className="text-xs text-[#647067] font-mono">{mod.lessons.length} Lessons</span>
                    </div>

                    <div className="divide-y divide-[#DCE9DF] pt-1">
                      {mod.lessons.map((les) => (
                        <div key={les.id} className="py-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3 text-[#17251D] font-medium">
                            <PlayCircle className="w-4 h-4 text-[#15803D]" />
                            <span>{les.title}</span>
                          </div>
                          <span className="text-xs text-[#647067] font-mono">{les.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Callout Box */}
            {course.quiz && (
              <div className="bg-gradient-to-r from-[#14532D] to-[#15803D] border border-[#10B981]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-xl">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-[#D1FAE5] text-xs font-bold uppercase backdrop-blur">
                    Knowledge Evaluation
                  </div>
                  <h3 className="text-xl font-bold">{course.quiz.title}</h3>
                  <p className="text-[#D1FAE5]/90 text-xs">
                    Test your comprehension with diagnostic multiple-choice questions.
                  </p>
                </div>
                <Link
                  href={`/courses/${course.id}/quiz`}
                  className="shrink-0 px-6 py-3 rounded-xl bg-white text-[#14532D] text-sm font-bold shadow-lg hover:bg-[#F0FDF4] transition"
                >
                  Take Quiz
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Instructor Info & Metadata */}
          <div className="space-y-6">
            <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#17251D]">About the Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#10B981]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#17251D]">{course.instructor.name}</h4>
                  <p className="text-xs text-[#15803D] font-semibold">{course.instructor.role}</p>
                </div>
              </div>
              <p className="text-xs text-[#647067] leading-relaxed">{course.instructor.bio}</p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-[#DCE9DF] text-[#647067]">
                <div>
                  <span className="font-bold text-[#17251D] block">{course.instructor.rating}★</span> Rating
                </div>
                <div>
                  <span className="font-bold text-[#17251D] block">{course.instructor.students.toLocaleString()}</span> Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
