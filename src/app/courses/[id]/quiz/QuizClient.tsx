'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { Award, ChevronLeft, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizClient() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = COURSES.find((c) => c.id === courseId);
  const quiz = course?.quiz;

  const { saveQuizScore } = useLearning();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    totalQuestions: number;
    percentage: number;
  } | null>(null);

  if (!course || !quiz) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#17251D]">Quiz Not Found</h2>
        <p className="text-[#647067]">This course does not have an active diagnostic quiz.</p>
        <Link href={`/courses/${courseId}`} className="inline-block px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-sm font-bold shadow-md">
          Return to Course
        </Link>
      </div>
    );
  }

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const result = { correctCount, totalQuestions, percentage };
    setScoreResult(result);
    setIsSubmitted(true);
    saveQuizScore(course.id, percentage);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-[#F8FAF9] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Quiz Header */}
        <div className="space-y-4">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:text-[#14532D] transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Course Page
          </Link>

          <div className="bg-white border border-[#DCE9DF] rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <span className="px-3.5 py-1 rounded-full bg-[#D1FAE5] text-[#14532D] border border-[#10B981]/30 text-xs font-bold uppercase tracking-wider">
              Diagnostic Knowledge Check
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17251D]">{quiz.title}</h1>
            <p className="text-sm text-[#647067]">
              Select the single best answer for each of the {quiz.questions.length} questions below.
            </p>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {quiz.questions.map((q, qIdx) => {
            const selectedOption = selectedAnswers[qIdx];

            return (
              <div
                key={q.id}
                className="bg-white border border-[#DCE9DF] rounded-2xl p-6 space-y-4 shadow-sm animate-slide-up"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#D1FAE5] text-[#14532D] font-bold text-xs flex items-center justify-center shrink-0 border border-[#10B981]/30">
                    {qIdx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#17251D] pt-0.5 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    let borderStyle = 'border-[#DCE9DF] bg-[#F8FAF9] hover:bg-[#F0FDF4] text-[#17251D]';

                    if (isSelected) {
                      borderStyle = 'border-[#10B981] bg-[#D1FAE5] text-[#14532D] font-bold shadow-sm';
                    }

                    if (isSubmitted) {
                      if (optIdx === q.correctAnswer) {
                        borderStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                      } else if (isSelected && optIdx !== q.correctAnswer) {
                        borderStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(qIdx, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition ${borderStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#15803D] text-white'
                              : 'bg-white text-[#647067] border border-[#DCE9DF]'
                          }`}
                        >
                          {optionLabels[optIdx] || optIdx + 1}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit / Results Bar */}
        {!isSubmitted ? (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#15803D] to-[#10B981] hover:from-[#14532D] hover:to-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#15803D]/25 transition-all"
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <div 
            className="bg-white border border-[#10B981]/50 rounded-2xl p-8 text-center space-y-6 shadow-xl animate-fade-in"
          >
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] border border-[#10B981]/30 flex items-center justify-center mx-auto text-[#15803D]">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#17251D]">Quiz Complete!</h2>
              <p className="text-sm text-[#647067]">
                You answered <strong className="text-[#17251D]">{scoreResult?.correctCount}</strong> out of{' '}
                <strong className="text-[#17251D]">{scoreResult?.totalQuestions}</strong> questions correctly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#DCE9DF] max-w-sm mx-auto shadow-inner">
              <span className="text-xs text-[#647067] uppercase tracking-widest font-bold block mb-1">
                Final Computed Score
              </span>
              <span className="text-4xl font-black text-[#15803D]">{scoreResult?.percentage}%</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={handleRetakeQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F8FAF9] hover:bg-[#F0FDF4] text-[#17251D] text-sm font-bold border border-[#DCE9DF] transition"
              >
                <RefreshCw className="w-4 h-4 text-[#15803D]" /> Retake Quiz
              </button>
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-bold shadow-md transition"
              >
                Back to Course <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
