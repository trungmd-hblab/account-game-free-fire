import {create} from 'zustand';

const useStore = create((set) => ({
  code:'',
  name:'',
  email:'',
  phoneNumber:'',
  username: '',
  diamondBalance: 0,
  moneyBalance: 0,
  setUserProfile: (profile) => set({
    code:profile?.code,
    name: profile?.name,
    email: profile?.email,
    phoneNumber: profile?.phoneNumber,
    username: profile?.username,
    diamondBalance: profile?.diamondBalance,
    moneyBalance: profile?.moneyBalance,
  }),
}));

export default useStore;
