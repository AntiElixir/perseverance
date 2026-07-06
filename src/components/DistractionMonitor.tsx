'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function DistractionMonitor({ isRunning }: { isRunning: boolean }) {
  const { addDistraction, config, sessions } = useApp();
  const [showForceModal, setShowForceModal] = useState(false);
  const [leaveTime, setLeaveTime] = useState<number | null>(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const titleRef = useRef('FocusFlow | 标签化智能专注计时');
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!isRunning) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setLeaveTime(Date.now());
        setLeaveCount((current) => current + 1);
        return;
      }

      if (leaveTime) {
        const duration = (Date.now() - leaveTime) / 1000;
        addDistraction({ id: Date.now().toString(), timestamp: Date.now(), duration: Math.floor(duration) });

        if (duration > 120 || leaveCount >= 3) {
          setShowForceModal(true);
        }
      }

      setLeaveTime(null);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRunning, leaveTime, leaveCount, addDistraction]);

  useEffect(() => {
    if (leaveTime && isRunning) {
      intervalRef.current = setInterval(() => {
        document.title = document.title === titleRef.current ? '🚨 别走神哦，快回来专注！' : titleRef.current;

        if ((Date.now() - leaveTime) / 1000 > 30) {
          playBeep();
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1000);
    } else {
      document.title = titleRef.current;
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [leaveTime, isRunning]);

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.error('Audio playback failed', error);
    }
  };

  const todaySessions = sessions.filter((session) => new Date(session.timestamp).toDateString() === new Date().toDateString());
  const todayMinutes = Math.floor(todaySessions.reduce((sum, session) => sum + session.duration, 0) / 60);

  return (
    <AnimatePresence>
      {showForceModal && (
        <motion.div
          className="fixed inset-0 bg-rose-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-slate-900 border border-rose-500/50 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-xl text-slate-100 font-medium mb-2">注意力严重流失</h3>
            <p className="text-sm text-slate-400 mb-6">
              你已经离开较长时间。你今天的目标是专注 <span className="text-emerald-400 font-bold">{config.dailyGoalMinutes}</span> 分钟，当前已完成 <span className="text-emerald-400 font-bold">{todayMinutes}</span> 分钟，继续加油！
            </p>
            <button
              onClick={() => setShowForceModal(false)}
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors"
            >
              回到专注
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}