// components/UserTable/index.tsx

import React, { FC } from 'react';
import {
    Button,
    Popconfirm,
    Space,
    Table,
    Tag,
} from 'antd';

import type { ColumnsType } from 'antd/es/table';

import type { UserItem } from '@/types/user';

/**
 * Props 定義
 */
interface Props {
    list: UserItem[];
    onEdit: (record: UserItem) => void;
    onDelete: (id: number) => void;
}

/**
 * 桌面版 Table
 */
const UserTable: FC<Props> = ({
    list,
    onEdit,
    onDelete,
}) => {
    /**
     * Table Columns
     */
    const columns: ColumnsType<UserItem> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '年齡',
            dataIndex: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '狀態',
            dataIndex: 'status',

            render: (status: UserItem['status']) => {
                return status === 'active' ? (
                    <Tag color="green">啟用</Tag>
                ) : (
                    <Tag color="red">停用</Tag>
                );
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 220,

            render: (_, record) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => onEdit(record)}
                        >
                            編輯
                        </Button>

                        <Popconfirm
                            title="確定刪除嗎？"
                            onConfirm={() => onDelete(record.id)}
                        >
                            <Button danger>
                                刪除
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return (
        <Table<UserItem>
            rowKey="id"
            columns={columns}
            dataSource={list}
            pagination={{
                pageSize: 5,
            }}
        />
    );
};

export default UserTable;