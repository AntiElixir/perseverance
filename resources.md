为了让你能直接导入 GitHub 并通过 Vercel 或 Netlify 等平台一键部署，我为你整理了完整的标准 Next.js 项目结构。

请按照以下步骤操作：

### 🚀 部署步骤简述
1. 在 GitHub 上创建一个新仓库（例如命名为 `focus-flow`）。
2. 在本地创建一个同名文件夹，将下面的所有文件按目录结构创建并填入代码。
3. 在文件夹根目录运行 `npm install` 安装依赖。
4. 运行 `git init`, `git add .`, `git commit -m "Initial commit"`。
5. 运行 `git remote add origin <你的GitHub仓库地址>` 并 `git push -u origin main`。
6. 登录 [Vercel](https://vercel.com/) 或 [Netlify](https://www.netlify.com/)，导入该 GitHub 仓库，直接点击 Deploy，无需额外配置即可自动部署成功。

---

### 📂 项目文件结构
```text
focus-flow/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── OnboardingModal.tsx
│   │   ├── DistractionMonitor.tsx
│   │   └── Dashboard.tsx
│   ├── lib/
│   │   ├── presets.ts
│   │   └── store.tsx
│   └── types/
│       └── index.ts
```

---

### 📝 各文件代码内容

#### 1. `package.json`
```json
{
  "name": "focus-flow",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.331.0",
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

#### 2. `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

#### 3. `tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 4. `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
    'bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500',
    'bg-emerald-500/10', 'bg-sky-500/10', 'bg-amber-500/10', 'bg-rose-500/10', 'bg-violet-500/10',
    'border-emerald-500', 'border-sky-500', 'border-amber-500', 'border-rose-500', 'border-violet-500',
    'border-emerald-500/30', 'border-sky-500/30', 'border-amber-500/30', 'border-rose-500/30', 'border-violet-500/30',
    'text-emerald-300', 'text-sky-300', 'text-amber-300', 'text-rose-300', 'text-violet-300',
    'text-emerald-200', 'text-sky-200', 'text-amber-200', 'text-rose-200', 'text-violet-200',
    'bg-emerald-500/20', 'bg-sky-500/20', 'bg-amber-500/20', 'bg-rose-500/20', 'bg-violet-500/20',
  ],
  plugins: [],
}
export default config
```

#### 5. `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### 6. `.gitignore`
```text
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

#### 7. `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  background-color: #0f172a; /* slate-900 */
}
```

#### 8. `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FocusFlow | 标签化智能专注计时",
  description: "面向大学生的标签化智能专注计时应用",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

#### 9. `src/app/page.tsx`
*(注：修正了之前版本中潜在的图标命名冲突问题)*
```tsx
'use client';
import { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Lock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const todaySessions = sessions.filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString());
  const completedMinutes = Math.floor(todaySessions.reduce((acc, s) => acc + s.duration, 0) / 60);
  const goalMinutes = config.dailyGoalMinutes;
  const progressPercent = Math.min((completedMinutes / goalMinutes) * 100, 100);

  useEffect(() => {
    if (progressPercent >= 100 && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
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
      const tag = tags.find(t => t.id === selectedTag)!;
      const session: FocusSession = {
        id: Date.now().toString(),
        tagId: tag.id,
        tagName: tag.name,
        tagColor: tag.color,
        duration: seconds,
        timestamp: Date.now(),
        distractions: 0
      };
      addSession(session);
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
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const currentTag = tags.find(t => t.id === selectedTag);

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
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length], left: `${Math.random() * 100}%`, top: '-10px' }}
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

        <div className="text-7xl md:text-8xl font-bold tabular-nums tracking-tier text-slate-50 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
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
          {progressPercent >= 100 ? "🎉 太棒了，已达成目标！" : `还差 ${goalMinutes - completedMinutes} 分钟达成目标`}
        </div>
      </div>

      <Dashboard />

      <AnimatePresence>
        {showTagModal && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTagModal(false)}>
            <motion.div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-medium text-slate-100 mb-4">新建任务标签</h3>
              <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="例如：毕业论文" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 mb-4" autoFocus />
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
```

#### 10. `src/types/index.ts`
```typescript
export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface FocusSession {
  id: string;
  tagId: string;
  tagName: string;
  tagColor: string;
  duration: number;
  timestamp: number;
  distractions: number;
}

export interface DistractionRecord {
  id: string;
  timestamp: number;
  duration: number;
}

export interface UserConfig {
  onboardingDone: boolean;
  focusDuration: number;
  breakDuration: number;
  autoBreak: boolean;
  dailyGoalMinutes: number;
}
```

#### 11. `src/lib/presets.ts`
```typescript
export const presets: Record<string, {
  focus: number;
  break: number;
  tags: { name: string; color: string }[];
}> = {
  '考研/考公/职业资格备考_45-60': {
    focus: 50, break: 10, tags: [
      { name: '公共课复习', color: 'emerald' },
      { name: '专业课复习', color: 'sky' },
      { name: '刷题', color: 'amber' },
      { name: '复盘', color: 'rose' }
    ]
  },
  '期末/课程作业_25-45': {
    focus: 30, break: 5, tags: [
      { name: '期末复习', color: 'emerald' },
      { name: '论文撰写', color: 'sky' },
      { name: '小组作业', color: 'violet' }
    ]
  },
  '日常阅读/自我提升_<25': {
    focus: 25, break: 5, tags: [
      { name: '专业阅读', color: 'sky' },
      { name: '课外书', color: 'amber' },
      { name: '语言学习', color: 'rose' }
    ]
  },
  '工作办公_>60': {
    focus: 90, break: 15, tags: [
      { name: '深度工作', color: 'emerald' },
      { name: '邮件沟通', color: 'sky' },
      { name: '会议讨论', color: 'violet' }
    ]
  }
};
```

#### 12. `src/lib/store.tsx`
```tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<UserConfig>(defaultConfig);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [distractions, setDistractions] = useState<DistractionRecord[]>([]);

  useEffect(() => {
    const savedConfig = localStorage.getItem('ff_config');
    const savedTags = localStorage.getItem('ff_tags');
    const savedSessions = localStorage.getItem('ff_sessions');
    const savedDistractions = localStorage.getItem('ff_distractions');
    
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedTags) setTags(JSON.parse(savedTags));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedDistractions) setDistractions(JSON.parse(savedDistractions));
  }, []);

  const persistConfig = (newConfig: UserConfig) => {
    setConfig(newConfig);
    localStorage.setItem('ff_config', JSON.stringify(newConfig));
  };

  const updateConfig = (cfg: Partial<UserConfig>) => {
    persistConfig({ ...config, ...cfg });
  };

  const addSession = (session: FocusSession) => {
    const newSessions = [...sessions, session];
    setSessions(newSessions);
    localStorage.setItem('ff_sessions', JSON.stringify(newSessions));
  };

  const addDistraction = (d: DistractionRecord) => {
    const newDistractions = [...distractions, d];
    setDistractions(newDistractions);
    localStorage.setItem('ff_distractions', JSON.stringify(newDistractions));
  };

  const addTag = (name: string, color: string) => {
    const newTag: Tag = { id: Date.now().toString(), name, color };
    const newTags = [...tags, newTag];
    setTags(newTags);
    localStorage.setItem('ff_tags', JSON.stringify(newTags));
  };

  const setupNewUser = (scenario: string, duration: string, autoBreak: string) => {
    const key = `${scenario}_${duration}`;
    const preset = presets[key] || presets['期末/课程作业_25-45'];
    const newTags = preset.tags.map(t => ({ ...t, id: Date.now() + Math.random() }));
    
    setTags(newTags);
    localStorage.setItem('ff_tags', JSON.stringify(newTags));
    
    persistConfig({
      ...config,
      onboardingDone: true,
      focusDuration: preset.focus,
      breakDuration: preset.break,
      autoBreak: autoBreak === '需要',
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
```

#### 13. `src/components/OnboardingModal.tsx`
```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ];

  const handleSelect = (value: string) => {
    const key = questions[step].key as keyof typeof answers;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (step < 2) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setupNewUser(newAnswers.scenario, newAnswers.duration, newAnswers.autoBreak), 200);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex gap-2 mb-6">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-emerald-500' : 'bg-slate-700'}`} />
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
              {questions[step].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-5 py-3 rounded-xl border transition-all ${
                    answers[questions[step].key as keyof typeof answers] === opt
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
```

#### 14. `src/components/DistractionMonitor.tsx`
```tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function DistractionMonitor({ isRunning }: { isRunning: boolean }) {
  const { addDistraction, config, sessions } = useApp();
  const [showForceModal, setShowForceModal] = useState(false);
  const [leaveTime, setLeaveTime] = useState<number | null>(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const titleRef = useRef<string>('FocusFlow | 标签化智能专注计时');
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isRunning) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setLeaveTime(Date.now());
        setLeaveCount(prev => prev + 1);
      } else {
        if (leaveTime) {
          const duration = (Date.now() - leaveTime) / 1000;
          addDistraction({ id: Date.now().toString(), timestamp: Date.now(), duration: Math.floor(duration) });
          
          if (duration > 120 || leaveCount >= 3) {
            setShowForceModal(true);
          }
        }
        setLeaveTime(null);
      }
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
          clearInterval(intervalRef.current);
        }
      }, 1000);
    } else {
      document.title = titleRef.current;
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [leaveTime, isRunning]);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const todaySessions = sessions.filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString());
  const todayMinutes = Math.floor(todaySessions.reduce((acc, s) => acc + s.duration, 0) / 60);

  return (
    <AnimatePresence>
      {showForceModal && (
        <motion.div 
          className="fixed inset-0 bg-rose-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-slate-900 border border-rose-500/50 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
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
```

#### 15. `src/components/Dashboard.tsx`
```tsx
'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '@/lib/store';
import { Lock, AlertCircle, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#10b981', '#0ea5e9', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { sessions, distractions } = useApp();

  const tagAgg = sessions.reduce((acc, s) => {
    acc[s.tagName] = (acc[s.tagName] || 0) + s.duration / 60;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.keys(tagAgg).map(name => ({ name, value: parseFloat(tagAgg[name].toFixed(1)) }));
  const todayDist = distractions.filter(d => new Date(d.timestamp).toDateString() === new Date().toDateString());

  return (
    <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-sm text-slate-300 font-medium mb-4 flex items-center gap-2">
          <PieChartIcon className="w-4 h-4" /> 标签时间占比 (分钟)
        </h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : <div className="h-[200px] flex items-center justify-center text-slate-600 text-sm">暂无数据</div>}
      </div>

      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden">
        <h3 className="text-sm text-slate-300 font-medium mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> 今日分心监测
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-slate-400">分心次数</span>
            <span className="text-rose-400 font-bold">{todayDist.length} 次</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-slate-400">最长离开时间</span>
            <span className="text-amber-400 font-bold">{Math.max(...todayDist.map(d => d.duration), 0)} 秒</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer border border-slate-700 rounded-2xl transition-all hover:bg-slate-900/90">
          <Lock className="w-6 h-6 text-slate-500 mb-2" />
          <p className="text-slate-400 text-sm font-medium">解锁高级分心时段热力图</p>
          <p className="text-slate-600 text-xs mt-1">订阅 Pro 版查看注意力薄弱点分析</p>
        </div>
      </div>
    </div>
  );
}
```