'use client';

import React from 'react';
import { Module, Lesson } from '../types';
import { CheckCircle, PlayCircle } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface CurriculumSidebarProps {
  courseId: string;
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  courseId,
  modules,
  currentLessonId,
  onSelectLesson
}) => {
  const { isLessonCompleted } = useLearning();

  return (
    <div className="bg-white border border-[#DCE9DF] rounded-2xl p-4 space-y-4 shadow-sm">
      <h3 className="text-lg font-bold text-[#17251D] px-2">Course Curriculum</h3>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="text-xs font-bold text-[#14532D] uppercase tracking-wider px-2 pt-2 border-t border-[#DCE9DF]">
              {module.title}
            </div>

            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const active = lesson.id === currentLessonId;
                const completed = isLessonCompleted(courseId, lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      active
                        ? 'bg-[#D1FAE5] text-[#14532D] font-bold border border-[#10B981]/50 shadow-sm'
                        : 'bg-[#F8FAF9] hover:bg-[#F0FDF4] text-[#17251D] border border-[#DCE9DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {completed ? (
                        <CheckCircle className="w-4 h-4 shrink-0 text-[#15803D]" />
                      ) : (
                        <PlayCircle className={`w-4 h-4 shrink-0 ${active ? 'text-[#15803D]' : 'text-[#647067]'}`} />
                      )}
                      <span className="text-xs sm:text-sm truncate">{lesson.title}</span>
                    </div>
                    <span
                      className={`text-[11px] font-mono shrink-0 ml-2 ${
                        active ? 'text-[#14532D] font-bold' : 'text-[#647067]'
                      }`}
                    >
                      {lesson.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
