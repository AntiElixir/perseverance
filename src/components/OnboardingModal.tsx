'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/lib/store';

export default function OnboardingModal() {
  const { setupNewUser } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ scenario: '', duration: '', autoBreak: '' });

  const questions = [
    {
      title: '主要使用场景？',
      key: 'scenario',
      options: ['考研/考公/职业资格备考', '期末/课程作业', '日常阅读/自我提升', '工作办公']
    },
    {
      title: '单次持续专注时长？',
      key: 'duration',
      options: ['<25', '25-45', '45-60', '>60']
    },
    {
      title: '是否需要自动休息提醒？',
      key: 'autoBreak',
      options: ['需要', '不需要']
    }
  ] as const;

  const handleSelect = (value: string) => {
    const key = questions[step].key;
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      window.setTimeout(() => setStep((current) => current + 1), 200);
      return;
    }

    window.setTimeout(() => setupNewUser(nextAnswers.scenario, nextAnswers.duration, nextAnswers.autoBreak), 200);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex gap-2 mb-6">
          {questions.map((_, index) => (
            <div key={index} className={`h-1 flex-1 rounded-full ${index <= step ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl text-slate-100 font-medium mb-6">{questions[step].title}</h2>
            <div className="space-y-3">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-5 py-3 rounded-xl border transition-all ${
                    answers[questions[step].key] === option
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}