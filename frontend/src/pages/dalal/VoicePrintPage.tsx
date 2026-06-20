import { useState }    from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { useTheme }      from '@/context/ThemeContext';
import { THEMES, BRAND } from '@/lib/theme';
import { PageShell }     from '@/components/layout/PageShell';
import { Button }        from '@/components/ui/Button';

type Step = 'intro' | 'recording' | 'processing' | 'done';

const PHRASES = [
  'بسم الله الرحمن الرحيم، أنا الدلال المعتمد في سوق التمر',
  'مزاد تمر سكري، خمسين كرتون بسعر ٢٠٠ ريال للكرتون',
  'أقر وأتعهد بصحة جميع بيانات المزاد المسجلة',
];

// أيقونة الحالة داخل الزر
function MicIcon({ step }: { step: Step }) {
  if (step === 'done')      return <CheckCircle size={40} color="#fff" strokeWidth={1.8} />;
  if (step === 'recording') return <MicOff      size={40} color="#fff" strokeWidth={1.8} />;
  if (step === 'processing') return (
    <div className="flex flex-col items-center gap-1">
      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
  return <Mic size={40} color="#fff" strokeWidth={1.8} />;
}

export default function VoicePrintPage() {
  const navigate          = useNavigate();
  const { theme, isDark } = useTheme();
  const T                 = THEMES[theme];
  const REQUIRED = 3;

  const [step,          setStep]          = useState<Step>('intro');
  const [samples,       setSamples]       = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState('');

  const startRecording = () => {
    setCurrentPhrase(PHRASES[samples]);
    setStep('recording');
    setTimeout(() => {
      setStep('processing');
      setTimeout(() => {
        const next = samples + 1;
        setSamples(next);
        setCurrentPhrase('');
        setStep(next >= REQUIRED ? 'done' : 'intro');
      }, 1200);
    }, 2500);
  };

  // ألوان الزر حسب الحالة
  const btnBg = step === 'done'
    ? BRAND.palm
    : step === 'recording'
    ? '#DC2626'
    : BRAND.dalal;

  const btnShadow = step === 'recording'
    ? '0 0 0 10px rgba(220,38,38,0.12), 0 8px 32px rgba(220,38,38,0.35)'
    : step === 'done'
    ? `0 8px 32px rgba(74,124,89,0.35)`
    : `0 8px 32px ${BRAND.dalalGlow}`;

  // لون شريط التقدم الأعلى للبطاقة
  const barColor = step === 'recording'
    ? '#DC2626'
    : step === 'done'
    ? BRAND.palm
    : BRAND.dalal;

  const phrase = currentPhrase || PHRASES[Math.min(samples, REQUIRED - 1)];

  return (
    <PageShell>

      {/* زر الرجوع */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12, cursor: 'pointer',
            color:      T.textMuted,
            background: isDark ? T.cardElevated : '#EDE3CC',
            border:     `1px solid ${T.borderStrong}`,
            fontSize: 13, fontWeight: 600,
            direction: 'ltr',
          }}
        >
          <ArrowLeft size={14} />
          رجوع
        </button>
      </div>

      {/* المحتوى */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '60px 20px 40px',
        boxSizing: 'border-box',
      }}>
        <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* العنوان */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ color: T.text, fontSize: 24, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
              التحقق الصوتي
            </h1>
            <p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>
              سجّل صوتك {REQUIRED} مرات لإعداد البصمة الصوتية
            </p>
          </div>

          {/* Progress bars */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {Array.from({ length: REQUIRED }).map((_, i) => (
              <div key={i} style={{
                height: 6, width: 64, borderRadius: 9999,
                background: i < samples ? BRAND.dalal : T.cardBorder,
                transition: 'background 0.4s ease',
              }} />
            ))}
          </div>
          <p style={{ color: T.textFaint, fontSize: 12, marginBottom: 32 }}>
            {samples} / {REQUIRED} تسجيلات مكتملة
          </p>

          {/* زر المايك */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            {step === 'recording' && (
              <span style={{
                position: 'absolute',
                width: 140, height: 140,
                borderRadius: '50%',
                background: 'rgba(220,38,38,0.08)',
                animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
              }} />
            )}
            <button
              onClick={step === 'intro' ? startRecording : undefined}
              disabled={step === 'processing' || step === 'done'}
              aria-label={step === 'recording' ? 'جارٍ التسجيل' : 'بدء التسجيل'}
              style={{
                width: 112, height: 112,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background:  btnBg,
                boxShadow:   btnShadow,
                border:      'none',
                cursor:      step === 'intro' ? 'pointer' : 'default',
                transition:  'all 0.3s ease',
                outline:     'none',
              }}
            >
              <MicIcon step={step} />
            </button>
          </div>

          {/* بطاقة العبارة */}
          <div style={{
            width: '100%',
            background:   isDark ? T.cardElevated : 'rgba(255,251,240,0.90)',
            border:       `1px solid ${step === 'recording' ? 'rgba(220,38,38,0.25)' : T.cardBorder}`,
            borderRadius: 18,
            overflow:     'hidden',
            boxShadow:    step === 'recording' ? '0 0 0 3px rgba(220,38,38,0.07)' : T.shadowSm,
            transition:   'all 0.3s ease',
            marginBottom: 20,
          }}>

            {/* شريط ملوّن علوي */}
            <div style={{
              height: 3, width: '100%',
              background:  barColor,
              opacity:     0.75,
              transition:  'background 0.4s ease',
            }} />

            <div style={{ padding: '14px 18px', textAlign: 'center' }}>

              {/* حالة نصية */}
              <p style={{
                fontSize: 12, fontWeight: 600, marginBottom: 10,
                color: step === 'recording'  ? '#DC2626'
                     : step === 'processing' ? BRAND.dalal
                     : step === 'done'       ? BRAND.palm
                     : T.textMuted,
              }}>
                {step === 'intro'      && 'اقرأ العبارة التالية بصوت واضح'}
                {step === 'recording'  && 'جارٍ التسجيل الآن...'}
                {step === 'processing' && 'جارٍ معالجة الصوت...'}
                {step === 'done'       && 'اكتملت البصمة الصوتية بنجاح'}
              </p>

              {/* العبارة أو رسالة الاكتمال */}
              {step !== 'done' ? (
                <p style={{
                  color: T.text, fontSize: 14, fontWeight: 600,
                  lineHeight: 1.7, margin: 0,
                  background:   isDark ? 'rgba(255,255,255,0.04)' : 'rgba(107,68,35,0.05)',
                  borderRadius: 10,
                  padding:      '10px 14px',
                }}>
                  "{phrase}"
                </p>
              ) : (
                <p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>
                  يمكنك الآن الدخول إلى لوحة التحكم
                </p>
              )}
            </div>
          </div>

          {/* زر الانتقال عند الاكتمال */}
          {step === 'done' && (
            <div style={{ width: '100%' }}>
              <Button variant="dalal" size="lg" fullWidth onClick={() => navigate('/dalal')}>
                الانتقال إلى لوحة التحكم
              </Button>
            </div>
          )}

        </div>
      </div>
    </PageShell>
  );
}