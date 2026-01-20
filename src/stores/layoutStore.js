import { create } from 'zustand';

const useLayoutStore = create((set) => ({
  isSidebarOpened: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpened: !state.isSidebarOpened })),
}));

export default useLayoutStore;