import React, { FC } from "react";
import { Button, message, Space, Typography } from "antd";

import UserCardList from "@/components/UserCardList";
import UserFormModal from "@/components/User/UserFormModal";
import UserTable from "@/components/UserTable";
import { useUserCrud } from "@/hooks/useUserCrud";
import type { UserFormValues } from "@/types/user";
import { useResponsive } from "@/hooks/useResponsive";
import UserQuery from "@/components/User/UserQuery";
import { useUserDialog } from "@/hooks/useUserDialog";

const UserPage: FC = () => {
  const isMobile = useResponsive();

  const userManager = useUserCrud();

  const dialog = useUserDialog();

  const handleDelete = (id: number): void => {
    userManager.deleteUser(id);
    message.success("刪除成功");
  };

  const handleSubmit = async (values: UserFormValues): Promise<void> => {
    if (dialog.modalMode === "create") {
      userManager.createUser(values);
      message.success("新增成功");
    }

    if (dialog.modalMode === "edit" && dialog.editingItem) {
      userManager.updateUser(dialog.editingItem.id, values);
      message.success("更新成功");
    }
    dialog.handleCancel();
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Typography.Title level={3}>User CRUD Demo</Typography.Title>

      <UserQuery
        loading={userManager.loading}
        onSearch={userManager.searchUsers}
      />

      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={dialog.handleCreate}>
          新增使用者
        </Button>
      </Space>

      {/* 列表組件 */}
      {isMobile ? (
        <UserCardList
          list={userManager.list}
          onEdit={dialog.handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <UserTable
          list={userManager.list}
          onEdit={dialog.handleEdit}
          onDelete={handleDelete}
        />
      )}

      <UserFormModal
        mode={dialog.modalMode}
        open={dialog.open}
        initialValues={dialog.editingItem}
        onCancel={dialog.handleCancel}
        onSubmit={handleSubmit}
      />
    </Space>
  );
};

export default UserPage;
