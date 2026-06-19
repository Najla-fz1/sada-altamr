import type { ThemeMode } from '@/types';

// ── Brand Colors (ثابتة، لا تتغيّر بتغيّر الثيم) ──────
export const BRAND = {
  dalal:       '#B53E2A',
  dalalDark:   '#8F2D1C',
  dalalGlow:   'rgba(181,62,42,0.18)',
  dalalMuted:  'rgba(181,62,42,0.10)',
  dalalRing:   'rgba(181,62,42,0.30)',

  admin:       '#C9A546',
  adminDark:   '#A6832E',
  adminGlow:   'rgba(201,165,70,0.18)',
  adminMuted:  'rgba(201,165,70,0.10)',
  adminRing:   'rgba(201,165,70,0.28)',

  palm:        '#5E8B4A',
  palmMuted:   'rgba(94,139,74,0.15)',
  palmGlow:    'rgba(94,139,74,0.12)',
  dateBrown:   '#6B4423',
  gold:        '#C9A546',
} as const;

// ── Role Configs ───────────────────────────────────────
export const ROLE_CONFIGS = [
  {
    id:       'dalal',
    icon:     '🎤',
    title:    'الدّلال',
    desc:     'لإدارة المزاد وتسجيل المزايدات الصوتية لحظياً',
    features: [],
    // features: ['بدء جلسات المزاد', 'تسجيل المزايدات صوتيًا', 'إدارة سير المزاد'],
    accent:   BRAND.dalal,
    glow:     BRAND.dalalGlow,
    shadow:   'rgba(181,62,42,0.35)',
  },
  {
    id:       'admin',
    icon:     '📊',
    title:    'مسؤول النظام',
    desc:     'لمتابعة الأداء والإحصائيات وإدارة المزادات',
    features: [],
    // features: ['التقارير والإحصائيات', 'مراقبة مؤشرات الأسعار', 'تحليل توجهات السوق'],
    accent:   BRAND.admin,
    glow:     BRAND.adminGlow,
    shadow:   'rgba(201,165,70,0.30)',
  },
] as const satisfies readonly import('@/types').RoleConfig[];

// ── Surface Tokens ─────────────────────────────────────
interface ThemeTokens {
  bg:            string;
  bgSubtle:      string;
  card:          string;
  cardBorder:    string;
  cardSelected:  (accent: string) => string;
  cardElevated:  string;
  input:         string;
  inputFocus:    string;
  header:        string;
  text:          string;
  textMuted:     string;
  textFaint:     string;
  textInverse:   string;
  border:        string;
  borderStrong:  string;
  divider:       string;
  badge:         string;
  badgeBorder:   string;
  badgeText:     string;
  gridColor:     string;
  gridOpacity:   number;
  radialOpacity: number;
  shadowSm:      string;
  shadowMd:      string;
  shadowLg:      string;
  success:       string;
  successBg:     string;
  error:         string;
  errorBg:       string;
}

export const THEMES: Record<ThemeMode, ThemeTokens> = {
  dark: {
    bg:           '#131417',
    bgSubtle:     '#0F1013',
    card:         'rgba(255,248,235,0.03)',
    cardBorder:   'rgba(201,165,70,0.10)',
    cardSelected: (a) => `${a}1A`,
    cardElevated: 'rgba(255,248,235,0.05)',
    input:        'rgba(255,248,235,0.04)',
    inputFocus:   'rgba(255,248,235,0.07)',
    header:       'rgba(19,20,23,0.90)',
    text:         '#F5EDD8',
    textMuted:    '#A89880',
    textFaint:    '#5E4E3A',
    textInverse:  '#131417',
    border:       'rgba(201,165,70,0.10)',
    borderStrong: 'rgba(201,165,70,0.20)',
    divider:      'rgba(201,165,70,0.08)',
    badge:        'rgba(94,139,74,0.15)',
    badgeBorder:  'rgba(94,139,74,0.28)',
    badgeText:    '#7BC563',
    gridColor:    '#C8A96E',
    gridOpacity:  0.04,
    radialOpacity:1,
    shadowSm:     '0 1px 3px rgba(0,0,0,0.30)',
    shadowMd:     '0 4px 12px rgba(0,0,0,0.40)',
    shadowLg:     '0 12px 32px rgba(0,0,0,0.55)',
    success:      '#7BC563',
    successBg:    'rgba(123,197,99,0.12)',
    error:        '#F87171',
    errorBg:      'rgba(248,113,113,0.10)',
  },
  light: {
    bg:           '#F0E6CC',
    bgSubtle:     '#E8D9B5',
    card:         'rgba(255,251,240,0.72)',
    cardBorder:   'rgba(122,98,68,0.20)',
    cardSelected: (a) => `${a}12`,
    cardElevated: 'rgba(255,255,255,0.85)',
    input:        'rgba(255,251,240,0.80)',
    inputFocus:   '#FFFFFF',
    header:       'rgba(240,230,204,0.92)',
    text:         '#2A1F0E',
    textMuted:    '#7A6244',
    textFaint:    '#B09870',
    textInverse:  '#FFFFFF',
    border:       'rgba(122,98,68,0.18)',
    borderStrong: 'rgba(122,98,68,0.30)',
    divider:      '#E0D4B8',
    badge:        'rgba(61,107,42,0.10)',
    badgeBorder:  'rgba(61,107,42,0.25)',
    badgeText:    '#3D6B2A',
    gridColor:    '#8B6B3D',
    gridOpacity:  0.025,
    radialOpacity:0.8,
    shadowSm:     '0 1px 3px rgba(107,68,35,0.08)',
    shadowMd:     '0 4px 12px rgba(107,68,35,0.10)',
    shadowLg:     '0 12px 32px rgba(107,68,35,0.12)',
    success:      '#3D6B2A',
    successBg:    'rgba(61,107,42,0.10)',
    error:        '#B53E2A',
    errorBg:      'rgba(181,62,42,0.08)',
  },
};