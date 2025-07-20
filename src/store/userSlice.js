import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: '',
    email: '',
    displayName: '',
    plan: 'free'
  },
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload }),
    clearUser: (state) => ({ uid: '', email: '', displayName: '', plan: 'free' }),
    updatePlan: (state, action) => ({ ...state, plan: action.payload })
  }
});

export const { setUser, clearUser, updatePlan } = userSlice.actions;
export default userSlice.reducer;
