import React, { FC } from "react";

import { Form, Input, InputNumber, Modal } from "antd";

import type { UserFormValues, UserItem } from "@/types/user";
import { useUserForm } from "@/hooks/useUserForm";
import { userFormRules } from "./userFormRules";

/**
 * Props
 */
interface Props {
  mode: "create" | "edit";
  open: boolean;
  initialValues?: UserItem | null;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

/**
 * User Form Modal
 */
const UserFormModal: FC<Props> = ({
  mode,
  open,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const { form, handleOk, handleCancel } = useUserForm({
    mode,
    initialValues,
    onSubmit,
    onCancel,
  });

  return (
    <Modal
      title={mode === "create" ? "新增使用者" : "編輯使用者"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnHidden
    >
      <Form<UserFormValues> form={form} layout="vertical">
        <Form.Item label="姓名" name="name" rules={userFormRules.name}>
          <Input placeholder="請輸入姓名" />
        </Form.Item>

        <Form.Item label="年齡" name="age" rules={userFormRules.age}>
          <InputNumber style={{ width: "100%" }} placeholder="請輸入年齡" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={userFormRules.email}>
          <Input placeholder="請輸入 Email" />
        </Form.Item>

        <Form.Item label="地址" name="address" rules={userFormRules.address}>
          <Input placeholder="請輸入地址" />
        </Form.Item>

        <Form.Item label="狀態" name="status" rules={userFormRules.status}>
          <Input placeholder="active / inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
