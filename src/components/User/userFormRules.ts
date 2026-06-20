import { Rule } from "antd/es/form";


export const userFormRules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: "請輸入姓名",
    },
    {
      min: 2,
      message: "至少需要 2 個字",
    },
  ],
  age: [
    {
      required: true,
      message: "請輸入年齡",
    },
    {
      type: "number",
      min: 1,
      max: 120,
      message: "年齡需介於 1 ~ 120",
    },
  ],
  email: [
    {
      required: true,
      message: "請輸入 Email",
    },
    {
      type: "email",
      message: "Email 格式錯誤",
    },
  ],
  address: [
    {
      required: true,
      message: "請輸入地址",
    },
  ],
  status: [
    {
      required: true,
      message: "請輸入狀態",
    },
    {
      validator: async (_, value) => {
        if (value !== "active" && value !== "inactive") {
          throw new Error("只能是 active 或 inactive");
        }
      },
    },
  ],
};
