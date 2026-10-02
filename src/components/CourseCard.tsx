'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Users, Clock, ArrowUpRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group flex flex-col bg-white border border-[#DCE9DF] rounded-2xl overflow-hidden hover:border-[#10B981] shadow-sm hover:shadow-xl hover:shadow-[#15803D]/10 transition-all duration-300 transform hover:-translate-y-1.5">
      {/* Thumbnail Container */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F0FDF4]">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14532D]/40 via-transparent to-transparent opacity-60" />
        
        {/* Category & Level Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#D1FAE5]/95 backdrop-blur text-[#14532D] border border-[#10B981]/30 shadow-sm">
            {course.category}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 backdrop-blur text-[#17251D] border border-[#DCE9DF] shadow-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Rating & Duration */}
          <div className="flex items-center justify-between text-xs text-[#647067]">
            <div className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-[#647067] font-normal">({course.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#15803D]" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-[#17251D] group-hover:text-[#15803D] transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#647067] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Instructor & Metrics */}
        <div className="pt-3 border-t border-[#DCE9DF] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover border border-[#10B981]/40"
              />
              <span className="text-[#17251D] font-semibold truncate max-w-[120px]">
                {course.instructor.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#647067]">
              <Users className="w-3.5 h-3.5 text-[#15803D]" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer Price & View Course Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#647067] block">Tuition</span>
              <span className="text-base font-extrabold text-[#17251D]">
                {course.price === 0 ? (
                  <span className="text-[#15803D] font-extrabold">Free</span>
                ) : (
                  course.priceLabel
                )}
              </span>
            </div>

            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#F0FDF4] hover:bg-[#15803D] text-[#14532D] hover:text-white border border-[#DCE9DF] hover:border-[#15803D] text-xs font-bold transition-all duration-200 group/btn shadow-sm"
            >
              View Course
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
