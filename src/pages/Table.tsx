import React, { FC, useState } from "react";
import { Button, message, Space, Typography } from "antd";

import UserCardList from "@/components/UserCardList";
import UserFormModal from "@/components/UserFormModal";
import UserTable from "@/components/UserTable";
import { useUserCrud } from "@/hooks/useUserCrud";
import type { ModalMode, UserFormValues, UserItem } from "@/types/user";
import { useResponsive } from "@/hooks/useResponsive";
import UserQuery from "@/components/User/UserQuery";

const UserPage: FC = () => {
  const isMobile = useResponsive();

  /**
   *  CRUD Hook
   */
  const { list, updateUser, deleteUser, createUser, searchUsers, loading } =
    useUserCrud();

  /**
   * Modal 相關狀態
   */
  const [open, setOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("create");

  /**
   * =========================
   * Event Handlers
   * =========================
   */
  const handleCancel = (): void => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (record: UserItem): void => {
    setModalMode("edit");
    setEditingItem(record);
    setOpen(true);
  };

  const handleDelete = (id: number): void => {
    deleteUser(id);
    message.success("刪除成功");
  };

  const handleCreate = (): void => {
    setModalMode("create");
    setEditingItem(null);
    setOpen(true);
  };

  const handleSubmit = async (values: UserFormValues): Promise<void> => {
    if (modalMode === "create") {
      createUser(values);
      message.success("新增成功");
    }

    if (modalMode === "edit" && editingItem) {
      updateUser(editingItem.id, values);
      message.success("更新成功");
    }
    handleCancel();
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Typography.Title level={3}>User CRUD Demo</Typography.Title>

      <UserQuery loading={loading} onSearch={searchUsers} />

      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreate}>
          新增使用者
        </Button>
      </Space>

      {/* 列表組件 */}
      {isMobile ? (
        <UserCardList list={list} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <UserTable list={list} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <UserFormModal
        mode={modalMode}
        open={open}
        initialValues={editingItem}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </Space>
  );
};

export default UserPage;
