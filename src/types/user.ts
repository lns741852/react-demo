/**
 * 使用者狀態
 */
export type UserStatus = "active" | "inactive";

/**
 * 使用者資料
 */
export interface UserItem {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
  status: UserStatus;
}

/**
 * Form 型別
 */
export interface UserFormValues {
  name: string;
  age: number;
  email: string;
  address: string;
  status: UserStatus;
}

export type ModalMode = "create" | "edit";
