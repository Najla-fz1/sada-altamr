import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { THEMES, BRAND } from '@/lib/theme';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// بيانات الأدمن الثابتة مؤقتاً (استبدلها بـ API لاحقاً)
const ADMIN_EMAIL    = 'admin@sada.sa';
const ADMIN_PASSWORD = 'Admin@1234';

export default function LoginPage() {
  const navigate           = useNavigate();
  const { theme, isDark }  = useTheme();
  const T                  = THEMES[theme];
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState<{ email?: string; password?: string }>({});

  // التحقق من صحة الإيميل
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    const e: typeof errors = {};
    if (!email)               e.email    = 'البريد الإلكتروني مطلوب';
    else if (!isValidEmail(email)) e.email = 'صيغة البريد غير صحيحة';
    if (!password)            e.password = 'كلمة المرور مطلوبة';
    else if (password.length < 6) e.password = 'كلمة المرور قصيرة جداً';
    return e;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      setLoading(false);
      // تحقق من البيانات
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('role', 'admin');
        navigate('/admin');
      } else {
        setErrors({ password: 'البريد أو كلمة المرور غير صحيحة' });
      }
    }, 1000);
  };

  return (
    <PageShell>
      {/* Glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 60% 40% at 50% 0%,
          ${isDark ? 'rgba(201,165,70,0.06)' : 'rgba(201,165,70,0.10)'} 0%,
          transparent 100%)`,
      }} />

      {/* زر الرجوع */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12, cursor: 'pointer',
            color: T.textMuted,
            background: isDark ? T.cardElevated : '#EDE3CC',
            border: `1px solid ${T.borderStrong}`,
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
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '40px 20px',
        boxSizing: 'border-box',
      }}>

        {/* أيقونة */}
        <div style={{
          width: 72, height: 72, borderRadius: 20, marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isDark ? 'rgba(201,165,70,0.08)' : 'rgba(201,165,70,0.12)',
          border: `1px solid ${isDark ? 'rgba(201,165,70,0.20)' : 'rgba(201,165,70,0.30)'}`,
          boxShadow: `0 8px 24px rgba(201,165,70,0.15)`,
        }}>
          <Lock size={28} color={BRAND.admin} strokeWidth={1.8} />
        </div>

        {/* العنوان */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            color: T.text, fontSize: 26, fontWeight: 900,
            margin: '0 0 8px', letterSpacing: '-0.5px',
          }}>
            تسجيل الدخول
          </h1>
          <p style={{ color: T.textMuted, fontSize: 13, margin: 0 }}>
            لوحة تحكم مسؤول النظام
          </p>
        </div>

        {/* الفورم */}
        <div style={{ width: '100%', maxWidth: 360 }}>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{
              background: isDark ? T.cardElevated : 'rgba(255,251,240,0.85)',
              border: `1px solid ${T.borderStrong}`,
              borderRadius: 20, padding: 24,
              backdropFilter: 'blur(12px)',
              boxShadow: T.shadowMd,
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>

              {/* البريد */}
              <Input
                label="البريد الإلكتروني"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  // مسح الخطأ فور الكتابة
                  if (errors.email) setErrors(p => ({ ...p, email: undefined }));
                }}
                placeholder="example@email.com"
                dir="ltr"
                icon={<Mail size={15} />}
                error={errors.email}
                // يمنع اللصق لو أردت — اختياري
                // onPaste={e => e.preventDefault()}
              />

              {/* كلمة المرور */}
              <Input
                label="كلمة المرور"
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(p => ({ ...p, password: undefined }));
                }}
                dir="ltr"
                icon={<Lock size={15} />}
                error={errors.password}
              />

              {/* زر الدخول */}
              <Button
                type="submit"
                variant="admin"
                size="lg"
                fullWidth
                loading={loading}
                style={{ marginTop: 4 }}
              >
                الانتقال إلى لوحة التحكم
              </Button>
            </div>
          </form>

          {/* ملاحظة أمان */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginTop: 16,
          }}>
            <ShieldCheck size={13} color={T.textFaint} />
            <p style={{ fontSize: 12, color: T.textFaint, margin: 0 }}>
              هذه الصفحة مخصصة لمسؤولي النظام فقط
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}