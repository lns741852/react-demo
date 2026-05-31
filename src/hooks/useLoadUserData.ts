/**
 * @Date        2024/03/03 22:47:38
 * @Author      zono
 * @Description 從後端獲取用戶信息
 * */
import { useDispatch } from "react-redux";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../api/user";
import { loginReducer, logoutReducer } from "../store/userReducer";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

/**
 * @description 從後端獲取用戶信息的 hook
 * */
function useLoadUserData() {
  const dispatch = useDispatch();
  const { username } = useGetUserInfo();

  useEffect(() => {
    if (username) return;
    getUserInfo();
  }, [username]);

  // 使用 useMutation 代替 useRequest 與 useEffect
  const { mutate: getUserInfo, isPending: getUserInfoLoading } = useMutation({
    mutationFn: async () => {
      return await getUserInfoService();
    },
    onSuccess: (data) => {
      const { username, nickname } = data;
      dispatch(loginReducer({ username, nickname }));
      return data;
    },
  });

  return { getUserInfoLoading };
}

export default useLoadUserData;
