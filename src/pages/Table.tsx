import React, { FC, useState } from 'react';
import { Button, message, Space, Typography, } from 'antd';
import UserCardList from '@/components/UserCardList';
import UserFormModal from '@/components/UserFormModal';
import UserTable from '@/components/UserTable';
import { useUserCrud } from '@/hooks/useUserCrud';
import type { ModalMode, UserFormValues, UserItem, } from '@/types/user';
import { useResponsive } from '@/hooks/useResponsive';

/**
 * User CRUD Page
 */
const UserPage: FC = () => {

    const isMobile = useResponsive();

    /**
     * CRUD Hook
     */
    const { list, updateUser, deleteUser, createUser } = useUserCrud();

    /**
     * Modal 開關
     */
    const [open, setOpen] = useState<boolean>(false);

    /**
     * 目前編輯中的資料
     */
    const [editingItem, setEditingItem] = useState<UserItem | null>(null);

    /**
     * 編輯模式
     */
    const [modalMode, setModalMode] = useState<ModalMode>('create');

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
        setModalMode('edit');
        setEditingItem(record);
        setOpen(true);
    };


    const handleDelete = (id: number,): void => {
        deleteUser(id);
        message.success('刪除成功');
    };


    const handleCreate = (): void => {
        setModalMode('create');
        setEditingItem(null);
        setOpen(true);
    };

    /**
     * 提交表單
     */
    const handleSubmit = async (values: UserFormValues,): Promise<void> => {
        /**
         * 新增
         */
        if (modalMode === 'create') {
            createUser(values);
            message.success('新增成功');
        }

        /**
         * 編輯
         */
        if (modalMode === 'edit' && editingItem) {
            updateUser(editingItem.id, values);
            message.success('更新成功');
        }
        handleCancel();
    };

    return (
        <Space
            direction="vertical"
            size={24}
            style={{
                width: '100%',
            }}
        >
            <Space
                style={{
                    width: '100%',
                    justifyContent:
                        'space-between',
                }}
            >
                <Typography.Title level={3}>
                    User CRUD Demo
                </Typography.Title>

                <Button
                    type="primary"
                    onClick={handleCreate}
                >
                    新增使用者
                </Button>
            </Space>

            {isMobile ? (
                <UserCardList
                    list={list}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (

                <UserTable
                    list={list}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
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