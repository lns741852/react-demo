/**
 * @Date        2024/03/03 22:51:09
 * @Author      zono
 * @Description 判斷是否登錄，如果沒有登錄就跳轉到登錄頁面
 * */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from "../router/index";

/**
 * @description 判斷是否登錄，如果沒有登錄就跳轉到登錄頁面
 * */
function useNavPage() {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    // 已經登錄了
    if (username) {
      // 如果是登錄或者注冊頁面，就跳轉到首頁
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登錄 跳轉到登錄頁面
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [username, pathname]);
}

export default useNavPage;
