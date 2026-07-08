import {create} from 'zustand';

const useStore = create((set) => ({
  code:'',
  name:'',
  email:'',
  phoneNumber:'',
  username: '',
  diamondBalance: 0,
  atmBalance: 0,
  cardBalance: 0,
  promotionBalance: 0,
  createdAt: null,
  setUserProfile: (profile) => set({
    code:profile?.code,
    name: profile?.name,
    email: profile?.email,
    phoneNumber: profile?.phoneNumber,
    username: profile?.username,
    diamondBalance: profile?.diamondBalance || 0,
    atmBalance: profile?.atmBalance || 0,
    cardBalance: profile?.cardBalance || 0,
    promotionBalance: profile?.promotionBalance || 0,
    createdAt: profile?.createdAt || null,
  }),
}));

export default useStore;
