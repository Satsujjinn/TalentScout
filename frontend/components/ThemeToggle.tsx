'use client';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="hover:underline">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
