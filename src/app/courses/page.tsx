'use client';

import React, { useState, useMemo } from 'react';
import { COURSES } from '@/data/courses';
import { CourseCard } from '@/components/CourseCard';
import { Search, Filter, RefreshCw, SlidersHorizontal, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const categories = [
    'All',
    'Web Development',
    'Programming',
    'Data & AI',
    'Cybersecurity',
    'Cloud Computing',
    'Design'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const prices = ['All', 'Free', 'Paid'];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // Search filter
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter (Fixed)
      if (selectedCategory !== 'All') {
        const matchesCategory = course.category === selectedCategory;
        if (!matchesCategory) return false;
      }

      // Level filter
      if (selectedLevel !== 'All') {
        if (course.level !== selectedLevel) return false;
      }

      // Price filter
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'Free' && course.price !== 0) return false;
        if (selectedPrice === 'Paid' && course.price === 0) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedPrice('All');
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] text-xs font-bold uppercase tracking-wider border border-[#10B981]/30">
            <BookOpen className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Course Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#17251D] tracking-tight">
            Explore Engineering Catalogue
          </h1>
          <p className="text-[#647067] text-sm max-w-2xl">
            Filter through our complete catalog of industry-curated courses and hands-on modules.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 space-y-6 shadow-sm">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#647067] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course title, instructor, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] placeholder-[#647067] focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-[#10B981]/20 text-sm font-medium transition"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#17251D] flex items-center gap-1.5 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-[#15803D]" /> Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] text-sm font-medium focus:outline-none focus:border-[#15803D] transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#17251D] flex items-center gap-1.5 uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#15803D]" /> Difficulty Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] text-sm font-medium focus:outline-none focus:border-[#15803D] transition"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#17251D] flex items-center gap-1.5 uppercase tracking-wider">
                Tuition Type
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE9DF] text-[#17251D] text-sm font-medium focus:outline-none focus:border-[#15803D] transition"
              >
                {prices.map((pr) => (
                  <option key={pr} value={pr}>
                    {pr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Summary & Reset */}
          <div className="flex items-center justify-between pt-3 border-t border-[#DCE9DF] text-xs text-[#647067]">
            <span>
              Showing <strong className="text-[#17251D]">{filteredCourses.length}</strong> of {COURSES.length} available courses
            </span>
            {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedPrice !== 'All' || searchQuery !== '') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[#15803D] hover:text-[#14532D] font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="animate-fade-in">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto text-[#15803D]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#17251D]">No courses match your filter criteria</h3>
            <p className="text-sm text-[#647067] max-w-md mx-auto">
              Try adjusting your search query, category selection, or level filter to explore available courses.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#15803D] text-white font-bold text-sm hover:bg-[#14532D] transition shadow-md shadow-[#15803D]/20"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
