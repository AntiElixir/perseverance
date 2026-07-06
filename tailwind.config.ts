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