'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '@/lib/store';
import { Lock, AlertCircle, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#10b981', '#0ea5e9', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { sessions, distractions } = useApp();

  const tagAgg = sessions.reduce((acc, session) => {
    acc[session.tagName] = (acc[session.tagName] || 0) + session.duration / 60;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(tagAgg).map((name) => ({ name, value: parseFloat(tagAgg[name].toFixed(1)) }));
  const todayDist = distractions.filter((record) => new Date(record.timestamp).toDateString() === new Date().toDateString());

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
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-slate-600 text-sm">暂无数据</div>
        )}
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
            <span className="text-amber-400 font-bold">{Math.max(...todayDist.map((record) => record.duration), 0)} 秒</span>
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