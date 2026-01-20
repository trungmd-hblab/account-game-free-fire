import { create } from "zustand";

const initialStateValue = {
  keyword: "",
  page: 1,
  limit: 10,
  startDate: "",
  endDate: "",
};

export const useFlashSaleQueryStore = create((set) => ({
  value: { ...initialStateValue },
  clearState: () => {
    set({ value: { ...initialStateValue } });
  },
  changeState: (newState) => {
    set((state) => ({ value: { ...state.value, ...newState } }));
  },
}));
