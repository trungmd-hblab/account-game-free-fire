import { create } from 'zustand';

const useClientConfigStore = create((set) => ({
  clientConfig: {
    atmRate: 1,
    cardRate: 1,
    logoUrl: "https://api.supitv.com/uploads/3%20(11).gif",
    bannerUrl: "https://api.supitv.com/uploads/banner%20shop%20supitv_vn.png",
    footerUrl: "",
    zaloUrl: "https://zalo.me/g/iiahcy892",
    messUrl: "https://zalo.me/g/iiahcy892",
  },
  setClientConfig: (config) => set({ clientConfig: config }),
}));

export default useClientConfigStore;
