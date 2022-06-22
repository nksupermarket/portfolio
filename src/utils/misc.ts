export function getCurrentTheme(): 'light' | 'dark' {
  const theme = localStorage.getItem('theme') as 'light' | 'dark';
  if (theme) return theme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
