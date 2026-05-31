import { useState } from "react";
import type { UserFormValues, UserItem } from "@/types/user";

import { mockData } from "@/mock/user";

export const useUserCrud = () => {
  const [list, setList] = useState<UserItem[]>(mockData);

  const updateUser = (id: number, values: UserFormValues) => {
    setList(
      (prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...values } : item)), // 覆蓋
    );
  };

  const deleteUser = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id)); //刪除
  };

  const createUser = (values: UserFormValues): void => {
    const newUser: UserItem = {
      id: Date.now(),
      ...values,
    };

    setList((prev) => [newUser, ...prev]);
  };

  return {
    list,
    createUser,
    updateUser,
    deleteUser,
  };
};
