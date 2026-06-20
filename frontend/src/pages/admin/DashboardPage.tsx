import { useTheme }  from '@/context/ThemeContext';
import { THEMES }    from '@/lib/theme';
import { PageShell } from '@/components/layout/PageShell';

export default function AdminDashboard() {
  const { theme } = useTheme();
  const T = THEMES[theme];
  return (
    <PageShell>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-black" style={{ color: T.text }}>
          لوحة تحكم المسؤول 📊
        </h1>
      </div>
    </PageShell>
  );
}