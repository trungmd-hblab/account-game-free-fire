import { create } from "zustand";

const initialStateValue = {
  keyword: "",
  page: 1,
  limit: 10,
  status: [],
  startDate: "",
  endDate: "",
};

export const useCardQueryStore = create((set) => ({
  value: { ...initialStateValue },
  clearState: () => {
    set({ value: { ...initialStateValue } });
  },
  changeState: (newState) => {
    set((state) => ({ value: { ...state.value, ...newState } }));
  },
}));
