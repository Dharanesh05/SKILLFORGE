'use client';

import React, { useState, useMemo } from 'react';
import { COURSES } from '@/data/courses';
import { CourseCard } from '@/components/CourseCard';
import { Search, Filter, RefreshCw, SlidersHorizontal } from 'lucide-react';

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

  /**
   * Filter logic containing INTENTIONAL BUG 2:
   * Expected: Filter by `course.category === selectedCategory`.
   * Actual: Checks `course.level === selectedCategory`, returning wrong results.
   */
  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // Search filter
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Course Catalogue
        </h1>
        <p className="text-slate-400 text-base max-w-2xl">
          Browse our collection of 12+ industry-grade courses built for practical skill mastery.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course title, instructor, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm transition"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-violet-400" /> Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
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
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
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
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              Price Type
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
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
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredCourses.length}</strong> of {COURSES.length} courses
          </span>
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedPrice !== 'All' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold"
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
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No courses match your filter criteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search term, category, or level selection to discover available tech courses.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
