import { create } from 'zustand';

const useClientConfigStore = create((set) => ({
  clientConfig: {
    atmRate: 1,
    cardRate: 1,
    logoUrl: "https://api.hungakirarandomff.com/uploads/3%20(11).gif",
    bannerUrl: "https://api.hungakirarandomff.com/uploads/banner%20shop%20hungakirarandom_vn.png",
    footerUrl: "",
    zaloUrl: "https://zalo.me/g/zxtlls574",
    messUrl: "https://www.facebook.com/profile.php?id=61561479104181",
  },
  setClientConfig: (config) => set({ clientConfig: config }),
}));

export default useClientConfigStore;
