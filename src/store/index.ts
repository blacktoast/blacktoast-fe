import { atom } from 'recoil';

export const userState = atom({
  key: 'user', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    name: '',
    token: '',
  }, // default value (aka initial value)
});
