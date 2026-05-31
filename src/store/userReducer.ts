import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserStateType {
  username: string;
  nickname: string;
}

const INIT_STATE: UserStateType = {
  username: "",
  nickname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    // 登入
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>,
    ) => {
      state = action.payload;
      return state;
    },
    // 登出
    logoutReducer: () => INIT_STATE,
  },
});

// 導出reducer，可使用useDispatch調用action來修改store
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
