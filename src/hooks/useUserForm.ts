import { UserFormValues, UserItem } from "@/types/user";
import { Form } from "antd"; // 確保引入 antd 的 Form
import { useEffect } from "react";


interface UseUserFormProps {
  mode: "create" | "edit";
  initialValues?: UserItem | null;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export const useUserForm = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
}: UseUserFormProps) => {
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        age: initialValues.age,
        email: initialValues.email,
        address: initialValues.address,
        status: initialValues.status,
      });
    } else {
      form.resetFields();
    }
  }, [form, initialValues, mode]);

  // 處理確認送出
  const handleOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("表單驗證或送出失敗:", error);
    }
  };

  // 處理取消
  const handleCancel = (): void => {
    form.resetFields();
    onCancel();
  };

  // 回傳組件需要的屬性與方法
  return {
    form,
    handleOk,
    handleCancel,
  };
};
