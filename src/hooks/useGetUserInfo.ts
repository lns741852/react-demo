import { useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStateType } from "../store/userReducer";

/**
 *  @description: 從 Redux store 中獲取用戶信息
 */
export const useGetUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user,
  ) as UserStateType;
  return { username, nickname };
};
export default useGetUserInfo;
