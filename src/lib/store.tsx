'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tag, FocusSession, DistractionRecord, UserConfig } from '@/types';
import { presets } from './presets';

interface AppContextType {
  config: UserConfig;
  tags: Tag[];
  sessions: FocusSession[];
  distractions: DistractionRecord[];
  updateConfig: (cfg: Partial<UserConfig>) => void;
  addSession: (session: FocusSession) => void;
  addDistraction: (d: DistractionRecord) => void;
  setupNewUser: (scenario: string, duration: string, autoBreak: string) => void;
  addTag: (name: string, color: string) => void;
}

const defaultConfig: UserConfig = {
  onboardingDone: false,
  focusDuration: 25,
  breakDuration: 5,
  autoBreak: true,
  dailyGoalMinutes: 240,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const storage = {
  get(key: string) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  },
  set(key: string, value: string) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  },
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<UserConfig>(defaultConfig);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [distractions, setDistractions] = useState<DistractionRecord[]>([]);

  useEffect(() => {
    const savedConfig = storage.get('ff_config');
    const savedTags = storage.get('ff_tags');
    const savedSessions = storage.get('ff_sessions');
    const savedDistractions = storage.get('ff_distractions');

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedTags) setTags(JSON.parse(savedTags));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedDistractions) setDistractions(JSON.parse(savedDistractions));
  }, []);

  const updateConfig = (cfg: Partial<UserConfig>) => {
    setConfig((current) => {
      const next = { ...current, ...cfg };
      storage.set('ff_config', JSON.stringify(next));
      return next;
    });
  };

  const addSession = (session: FocusSession) => {
    setSessions((current) => {
      const next = [...current, session];
      storage.set('ff_sessions', JSON.stringify(next));
      return next;
    });
  };

  const addDistraction = (d: DistractionRecord) => {
    setDistractions((current) => {
      const next = [...current, d];
      storage.set('ff_distractions', JSON.stringify(next));
      return next;
    });
  };

  const addTag = (name: string, color: string) => {
    const newTag: Tag = { id: Date.now().toString(), name, color };

    setTags((current) => {
      const next = [...current, newTag];
      storage.set('ff_tags', JSON.stringify(next));
      return next;
    });
  };

  const setupNewUser = (scenario: string, duration: string, autoBreak: string) => {
    const key = `${scenario}_${duration}`;
    const preset = presets[key] || presets['期末/课程作业_25-45'];
    const newTags = preset.tags.map((tag, index) => ({
      ...tag,
      id: `${Date.now()}-${index}`,
    }));

    setTags(newTags);
    storage.set('ff_tags', JSON.stringify(newTags));

    setConfig((current) => {
      const next = {
        ...current,
        onboardingDone: true,
        focusDuration: preset.focus,
        breakDuration: preset.break,
        autoBreak: autoBreak === '需要',
      };
      storage.set('ff_config', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AppContext.Provider value={{ config, tags, sessions, distractions, updateConfig, addSession, addDistraction, setupNewUser, addTag }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}