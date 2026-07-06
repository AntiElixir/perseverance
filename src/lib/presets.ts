export const presets: Record<string, {
  focus: number;
  break: number;
  tags: { name: string; color: string }[];
}> = {
  '考研/考公/职业资格备考_45-60': {
    focus: 50,
    break: 10,
    tags: [
      { name: '公共课复习', color: 'emerald' },
      { name: '专业课复习', color: 'sky' },
      { name: '刷题', color: 'amber' },
      { name: '复盘', color: 'rose' }
    ]
  },
  '期末/课程作业_25-45': {
    focus: 30,
    break: 5,
    tags: [
      { name: '期末复习', color: 'emerald' },
      { name: '论文撰写', color: 'sky' },
      { name: '小组作业', color: 'violet' }
    ]
  },
  '日常阅读/自我提升_<25': {
    focus: 25,
    break: 5,
    tags: [
      { name: '专业阅读', color: 'sky' },
      { name: '课外书', color: 'amber' },
      { name: '语言学习', color: 'rose' }
    ]
  },
  '工作办公_>60': {
    focus: 90,
    break: 15,
    tags: [
      { name: '深度工作', color: 'emerald' },
      { name: '邮件沟通', color: 'sky' },
      { name: '会议讨论', color: 'violet' }
    ]
  }
};