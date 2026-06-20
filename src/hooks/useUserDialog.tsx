import { UserItem } from "@/types/user";
import { useState } from "react";

type ModalMode = "create" | "edit";


export const useUserDialog = () => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("create");

  const handleCreate = () => {
    setModalMode("create");
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (record: UserItem) => {
    setModalMode("edit");
    setEditingItem(record);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setEditingItem(null);
  };

  return {
    open,
    editingItem,
    modalMode,
    handleCreate,
    handleEdit,
    handleCancel,
  };
};
