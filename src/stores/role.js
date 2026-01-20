import {create} from 'zustand';

const useRoleStore = create((set) => ({
  role: "",
  balance: 0,
  setRole: (role) => set({ role }),
  setBalance: (balance) => set({ balance }),
}));

export default useRoleStore;
