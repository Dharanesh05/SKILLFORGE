'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, UserProgress } from '../types';
import { COURSES } from '../data/courses';

interface LearningContextType {
  user: { name: string; email: string } | null;
  isLoggedIn: boolean;
  login: (email?: string, password?: string) => void;
  logout: () => void;
  enrolledCourseIds: string[];
  enrollCourse: (courseId: string) => void;
  completedLessonIds: Record<string, string[]>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  quizScores: Record<string, number>;
  saveQuizScore: (courseId: string, score: number) => void;
  getCourseProgress: (courseId: string) => number;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Johnson',
    email: 'alex.student@skillforge.io'
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Initial enrolled courses for realistic student dashboard
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([
    'course-1',
    'course-2',
    'course-3',
    'course-7'
  ]);

  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, string[]>>({
    'course-1': ['les-1-1-1'],
    'course-2': ['les-2-1-1'],
    'course-3': [],
    'course-7': ['les-7-1-1']
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const login = (email?: string, password?: string) => {
    setUser({
      name: email ? email.split('@')[0] : 'Student',
      email: email || 'student@skillforge.io'
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCompletedLessonIds(prev => {
      const current = prev[courseId] || [];
      if (current.includes(lessonId)) return prev;
      return {
        ...prev,
        [courseId]: [...current, lessonId]
      };
    });
  };

  const isLessonCompleted = (courseId: string, lessonId: string): boolean => {
    return (completedLessonIds[courseId] || []).includes(lessonId);
  };

  const saveQuizScore = (courseId: string, score: number) => {
    setQuizScores(prev => ({
      ...prev,
      [courseId]: score
    }));
  };

  /**
   * INTENTIONAL BUG 4: Course progress percentage calculation bug
   * Expected: Calculate completed lessons / total lessons for the specific course.
   * Actual: Calculates completed lessons divided by hardcoded total 100 lessons, causing progress to remain incorrect/stale.
   */
  const getCourseProgress = (courseId: string): number => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const completedList = completedLessonIds[courseId] || [];
    const totalLessons = course.modules.flatMap(m => m.lessons).length;
    if (totalLessons === 0) return 0;
    return Math.round((completedList.length / totalLessons) * 100);
  };

  return (
    <LearningContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        enrolledCourseIds,
        enrollCourse,
        completedLessonIds,
        markLessonComplete,
        isLessonCompleted,
        quizScores,
        saveQuizScore,
        getCourseProgress
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
