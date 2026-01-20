import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeMode: typeof window !== 'undefined' ? localStorage.getItem('themeMode') || 'default' : 'default',
  toggleTheme: () => set((state) => {
    const newTheme = state.themeMode === 'default' ? 'dark' : 'default';
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', newTheme);
    }
    return { themeMode: newTheme };
  }),
}));

export default useThemeStore;
