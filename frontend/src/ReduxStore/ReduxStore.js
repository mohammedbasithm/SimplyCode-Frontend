import {createSlice} from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user_id: null,
    username: null,
    access_token: null,
    refresh_token: null,
    role:null,
    is_approvel:null,
    teacher_request:null,
  },
  reducers: {
    setCredential: (state, action) => {
      console.log('yyyy');
      const { username, user_id, access_token, refresh_token,role,is_approvel,teacher_request } = action.payload;
      return {
        ...state,
        username,
        user_id,
        access_token,
        refresh_token,
        role,
        is_approvel,
        teacher_request,
      };
    },
    userLogout: (state) => {
      return {
        ...state,
        username: null,
        user_id: null,
        access_token: null,
        refresh_token: null,
        role:null,
        is_approvel:null,
        teacher_request:null,
      };
    },
  },
});
export const {setCredential,userLogout}=authSlice.actions;

export default authSlice.reducer;