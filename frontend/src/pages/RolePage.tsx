import sadaLogo        from '@/assets/sada-logo.png';
import { useState }    from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme }    from '@/context/ThemeContext';
import { THEMES, BRAND, ROLE_CONFIGS } from '@/lib/theme';
import { PageShell }   from '@/components/layout/PageShell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button }      from '@/components/ui/Button';
import { Badge }       from '@/components/ui/Badge';
import type { RoleId } from '@/types';


function IconDalal({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8"  y1="22" x2="16" y2="22"/>
    </svg>
  );
}


function IconAdmin({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M7 8h2v5H7zM11 6h2v7h-2zM15 10h2v3h-2z"/>
    </svg>
  );
}


function RoleCard({
  config, isSelected, onSelect, theme,
}: {
  config:     typeof ROLE_CONFIGS[number];
  isSelected: boolean;
  onSelect:   () => void;
  theme:      'dark' | 'light';
}) {
  const T      = THEMES[theme];
  const isDark = theme === 'dark';
  const Icon   = config.id === 'dalal' ? IconDalal : IconAdmin;


  return (
    <button
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      style={{
        display:      'block',
        width:        '100%',
        textAlign:    'right',
        background:   isSelected ? T.cardSelected(config.accent) : T.card,
        border:       `1.5px solid ${isSelected ? config.accent : T.cardBorder}`,
        borderRadius: 18,
        padding:      '16px 18px',
        cursor:       'pointer',
        transform:    isSelected ? 'scale(1.012)' : 'scale(1)',
        boxShadow:    isSelected
          ? `0 0 0 1px ${config.accent}20, 0 8px 28px ${config.glow}`
          : isDark ? '0 1px 4px rgba(0,0,0,0.25)' : T.shadowSm,
        backdropFilter: 'blur(10px)',
        transition:   'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        outline:      'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>


        {/* أيقونة */}
        <div style={{
          width: 46, height: 46, borderRadius: 14, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background:  isSelected
            ? `${config.accent}18`
            : isDark ? 'rgba(255,248,235,0.05)' : 'rgba(107,68,35,0.07)',
          border: `1.5px solid ${isSelected ? `${config.accent}35` : T.cardBorder}`,
          transition: 'all 0.22s',
        }}>
          <Icon color={isSelected ? config.accent : T.textMuted} />
        </div>


        {/* النص */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            color: T.text, fontWeight: 700, fontSize: 15,
            margin: 0, lineHeight: 1.3,
          }}>
            {config.title}
          </p>
          <p style={{
            color: T.textMuted, fontSize: 12,
            margin: '4px 0 0', lineHeight: 1.5,
          }}>
            {config.desc}
          </p>
        </div>


        {/* مؤشر الاختيار */}
        <div style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          background:      isSelected ? config.accent : 'transparent',
          border:          `2px solid ${isSelected ? config.accent : T.border}`,
          transition:      'all 0.2s',
        }}>
          {isSelected && (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5L4.5 8L9 3"
                stroke="#fff" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>


      </div>
    </button>
  );
}


export default function RolePage() {
  const navigate          = useNavigate();
  const { theme, isDark } = useTheme();
  const T                 = THEMES[theme];
  const [selected, setSelected] = useState<RoleId | null>(null);
  const [loading]               = useState(false);
  const activeRole = ROLE_CONFIGS.find(r => r.id === selected);


  const handleContinue = () => {
    if (!selected || loading) return;
    localStorage.setItem('role', selected);
    if (selected === 'dalal') navigate('/voice-setup');
    else navigate('/login');
  };


  return (
    <PageShell>
      {/* Glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        opacity:  T.radialOpacity,
        background: `radial-gradient(ellipse 65% 45% at 50% 0%,
          ${activeRole?.glow ?? (isDark ? 'rgba(181,62,42,0.06)' : 'rgba(201,165,70,0.10)')} 0%,
          transparent 100%)`,
        transition: 'background 0.5s ease',
        zIndex: 0,
      }} />


      {/* ThemeToggle */}
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 50 }}>
        <ThemeToggle />
      </div>


      {/* Layout */}
      <div style={{
        position:       'relative',
        zIndex:         10,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',   
        width:          '100%',
        minHeight:      '100vh',
        padding:        '40px 20px',
        boxSizing:      'border-box',
      }}>


        <div style={{ width: '100%', maxWidth: 380 }}>


          {/* اللوجو */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background:     isDark ? 'rgba(255,255,255,0.04)' : 'rgba(240,230,204,0.70)',
              border:         `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(201,165,70,0.22)'}`,
              backdropFilter: 'blur(10px)',
              boxShadow:      isDark ? '0 8px 32px rgba(0,0,0,0.45)' : '0 4px 20px rgba(107,68,35,0.10)',
            }}>
              <img src={sadaLogo} alt="شعار صدى التمر" width={46} height={46}
                style={{ objectFit: 'contain' }} />
            </div>
          </div>


          {/* العنوان */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{
              color: T.text, fontSize: 26, fontWeight: 900,
              letterSpacing: '-0.5px', margin: '0 0 6px',
            }}>
              صدى التمر
            </h1>
<p style={{
  color:      isDark ? 'rgba(255,238,200,0.90)' : '#3D1F08',
  fontSize:   13,
  margin:     '0 0 14px',
  fontWeight: 600,
  textShadow: isDark
    ? '0 1px 6px rgba(0,0,0,0.60)'
    : '0 1px 8px rgba(255,245,220,0.90)',
}}>
  منصة ذكية لإدارة ومتابعة مزادات التمور
</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Badge variant="success" dot pulse style={{ padding: '6px 18px' }}>
                مدعوم بالذكاء الاصطناعي
              </Badge>
            </div>
          </div>


          {/* Divider */}
          <div style={{
            height: 1, marginBottom: 20,
            background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
          }} />


          {/* عنوان القسم */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ color: T.text, fontWeight: 700, fontSize: 14, margin: 0 }}>
              اختر دورك للمتابعة
            </p>
            {/* <p style={{ color: T.textFaint, fontSize: 12, margin: '3px 0 0' }}>
              حدد الدور المناسب للمتابعة
            </p> */}
          </div>


          {/* الكاردات */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROLE_CONFIGS.map(role => (
              <RoleCard
                key={role.id}
                config={role}
                isSelected={selected === role.id}
                onSelect={() => setSelected(role.id)}
                theme={theme}
              />
            ))}
          </div>


          {/* زر المتابعة */}
          <div style={{ marginTop: 16 }}>
            <Button
              variant={selected === 'admin' ? 'admin' : 'dalal'}
              size="lg"
              fullWidth
              loading={loading}
              disabled={!selected}
              onClick={handleContinue}
              style={{
                background: selected
                  ? `linear-gradient(135deg, ${activeRole?.accent}, ${
                      selected === 'dalal' ? BRAND.dalalDark : BRAND.adminDark})`
                  : isDark ? 'rgba(255,248,235,0.05)' : '#E8DFC8',
                color:      selected ? '#fff' : T.textFaint,
                boxShadow:  selected ? `0 6px 20px ${activeRole?.shadow}` : 'none',
                transition: 'all 0.3s ease',
                fontSize:   15,
              }}
            >
              {selected ? `الدخول كـ${activeRole?.title} ←` : 'اختر دوراً أولاً'}
            </Button>
          </div>


        </div>
      </div>
    </PageShell>
  );
} 