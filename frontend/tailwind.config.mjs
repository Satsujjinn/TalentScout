export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        'background-dark': 'var(--color-background-dark)',
        'foreground-dark': 'var(--color-foreground-dark)'
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]']
};
