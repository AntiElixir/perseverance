'use client';

import { useEffect, useState } from 'react';
import { Play, Pause, Square, Plus, Lock, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import OnboardingModal from '@/components/OnboardingModal';
import DistractionMonitor from '@/components/DistractionMonitor';
import Dashboard from '@/components/Dashboard';
import { FocusSession } from '@/types';

const CONFETTI_COLORS = ['#10b981', '#0ea5e9', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];

export default function Home() {
  const { config, tags, sessions, addSession, addTag } = useApp();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => setSeconds((current) => current + 1), 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const todaySessions = sessions.filter((session) => new Date(session.timestamp).toDateString() === new Date().toDateString());
  const completedMinutes = Math.floor(todaySessions.reduce((sum, session) => sum + session.duration, 0) / 60);
  const goalMinutes = config.dailyGoalMinutes;
  const progressPercent = goalMinutes > 0 ? Math.min((completedMinutes / goalMinutes) * 100, 100) : 0;

  useEffect(() => {
    if (progressPercent >= 100 && !showCelebration) {
      setShowCelebration(true);
      window.setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [progressPercent, showCelebration]);

  const handleStart = () => {
    if (!selectedTag) {
      alert('请先选择一个任务标签');
      return;
    }

    setIsRunning(true);
  };

  const handleStop = () => {
    if (seconds > 10) {
      const tag = tags.find((item) => item.id === selectedTag);

      if (tag) {
        const session: FocusSession = {
          id: Date.now().toString(),
          tagId: tag.id,
          tagName: tag.name,
          tagColor: tag.color,
          duration: seconds,
          timestamp: Date.now(),
          distractions: 0,
        };

        addSession(session);
      }
    }

    setIsRunning(false);
    setSeconds(0);
  };

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const colors = ['emerald', 'sky', 'amber', 'rose', 'violet'];
    addTag(newTagName, colors[Math.floor(Math.random() * colors.length)]);
    setNewTagName('');
    setShowTagModal(false);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const currentTag = tags.find((tag) => tag.id === selectedTag);

  if (!config.onboardingDone) {
    return <OnboardingModal />;
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 py-8 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {isRunning && <DistractionMonitor isRunning={isRunning} />}

      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-200">FocusFlow</h1>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 cursor-pointer hover:border-emerald-500 transition-colors">
          <Lock className="w-3 h-3" />
          <span>升级 Pro 解锁深度分析</span>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center gap-8 relative z-10">
        <AnimatePresence>
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {Array.from({ length: 20 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: '400px', opacity: 0, rotate: 360 }}
                  transition={{ duration: 2 + Math.random() * 1, delay: Math.random() * 0.5 }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="h-8 flex items-center justify-center">
          {currentTag ? (
            <span className={`px-4 py-1 rounded-full text-sm font-medium bg-${currentTag.color}-500/10 text-${currentTag.color}-300 border border-${currentTag.color}-500/30`}>
              {currentTag.name}
            </span>
          ) : (
            <span className="text-sm text-slate-500">请选择任务标签开始专注</span>
          )}
        </div>

        <div className="text-7xl md:text-8xl font-bold tabular-nums tracking-tight text-slate-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          {formatTime(seconds)}
        </div>

        <div className="flex items-center gap-4">
          {!isRunning ? (
            <button onClick={handleStart} className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </button>
          ) : (
            <button onClick={() => setIsRunning(false)} className="w-16 h-16 rounded-full bg-amber-600 hover:bg-amber-500 transition-all flex items-center justify-center shadow-lg shadow-amber-600/30 hover:scale-105 active:scale-95">
              <Pause className="w-7 h-7 text-white" fill="white" />
            </button>
          )}
          <button onClick={handleStop} disabled={!isRunning && seconds === 0} className="w-12 h-12 rounded-full bg-slate-700 hover:bg-rose-600 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95">
            <Square className="w-5 h-5 text-white" fill="white" />
          </button>
        </div>

        <div className="w-full mt-4 pt-6 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-slate-400 font-medium uppercase tracking-wider">任务标签</h3>
            <button onClick={() => setShowTagModal(true)} disabled={isRunning} className="text-xs flex items-center gap-1 text-slate-400 hover:text-emerald-400 disabled:opacity-30">
              <Plus className="w-3 h-3" /> 新建
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                disabled={isRunning}
                className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                  selectedTag === tag.id
                    ? `bg-${tag.color}-500/20 border-${tag.color}-500 text-${tag.color}-200 scale-105`
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                } ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-slate-300">今日专注目标</h3>
          <span className="text-xs text-slate-400">{completedMinutes} / {goalMinutes} 分钟</span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">
          {progressPercent >= 100 ? '🎉 太棒了，已达成目标！' : `还差 ${goalMinutes - completedMinutes} 分钟达成目标`}
        </div>
      </div>

      <Dashboard />

      <AnimatePresence>
        {showTagModal && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTagModal(false)}>
            <motion.div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(event) => event.stopPropagation()}>
              <h3 className="text-lg font-medium text-slate-100 mb-4">新建任务标签</h3>
              <input type="text" value={newTagName} onChange={(event) => setNewTagName(event.target.value)} placeholder="例如：毕业论文" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 mb-4" autoFocus />
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowTagModal(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200">取消</button>
                <button onClick={handleCreateTag} className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1"><Check className="w-4 h-4" /> 创建</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}