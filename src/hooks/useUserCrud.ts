import { useState } from "react";
import type { UserFormValues, UserItem } from "@/types/user";

import { mockData } from "@/mock/user";

export const useUserCrud = () => {
  const [list, setList] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchUsers = (name: string, address: string) => {
    console.log(name + address);
    setLoading(true);
    try {
      setList(mockData);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

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
    loading,
    searchUsers, // 暴露給外部按鈕呼叫
    createUser,
    updateUser,
    deleteUser,
  };
};

/*  crud常用方法

// 新增
[...prev, item]
[item, ...prev]

// 更新
prev.map(...)

// 刪除
prev.filter(...)

// 查找
prev.find(...)
prev.some(...)

// 排序
[...prev].sort(...)

// 合併
[...prev, ...newItems]

// 物件更新
{
  ...prev,
  name: 'Tom'
}

// 物件刪除欄位
const { password, ...rest } = prev
*/

/* 

// 陣列轉物件 

const users = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'John' },
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {} as Record<number, UserItem>);

{
  1: { id: 1, name: 'Tom' },
  2: { id: 2, name: 'John' }
}
*/
