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
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            filterSearch: true,

            // 過濾器內容
            filters: list.map(user => ({
                text: user.name,
                value: user.name,
            })),

            //過濾器邏輯
            onFilter: (value, record) =>
                record.name
                    .toLowerCase()
                    .includes(String(value).toLowerCase()),

        },
        {
            title: '年齡',
            dataIndex: 'age',
            filters: [
                {
                    text: '18 以下',
                    value: 'under18',
                },
                {
                    text: '18~30',
                    value: '18-30',
                },
                {
                    text: '30 以上',
                    value: 'over30',
                },
            ],

            onFilter: (value, record) => {
                switch (value) {
                    case 'under18':
                        return record.age < 18;

                    case '18-30':
                        return record.age >= 18 && record.age <= 30;

                    case 'over30':
                        return record.age > 30;

                    default:
                        return true;
                }
            },
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
            filters: [
                {
                    text: '啟用',
                    value: 'active',
                },
                {
                    text: '停用',
                    value: 'inactive',
                },
            ],

            onFilter: (value, record) => {
                return record.status === value;
            },
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