import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export interface UserProperty {
  name: string;
  id: string;
  score: number;
  status: "admin" | "user" | "visitor";
}

export const initialState = {
  name: "",
  id: "",
  score: 0,
  status: "visitor",
} as UserProperty;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserProperty>) => {
      return { ...state, ...action.payload };
    },
    userLogout: () => initialState,
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
