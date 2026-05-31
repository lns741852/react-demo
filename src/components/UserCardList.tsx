// components/UserCardList/index.tsx

import React, { FC } from 'react';

import { Button, Card, Popconfirm, Space, Tag, Typography } from 'antd';

import type { UserItem } from '@/types/user';


const { Title, Text } = Typography

/**
 * Props
 */
interface Props {
    list: UserItem[];
    onEdit: (record: UserItem) => void;
    onDelete: (id: number) => void;
}

/**
 * 手機板 Card List
 */
const UserCardList: FC<Props> = ({
    list,
    onEdit,
    onDelete,
}) => {

    return (
        <Space
            direction="vertical"
            size={16}
            style={{
                width: '100%',
            }}
        >
            {list.map((item) => {
                return (
                    <Card
                        key={item.id}
                        size="small"
                        style={{
                            borderRadius: 12,
                        }}
                    >
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Title level={5}>
                                {item.name}
                            </Title>

                            <Text>
                                年齡：{item.age}
                            </Text>

                            <Text>
                                Email：{item.email}
                            </Text>

                            <Text>
                                地址：{item.address}
                            </Text>

                            <div>
                                {item.status === 'active' ? (
                                    <Tag color="green">
                                        啟用
                                    </Tag>
                                ) : (
                                    <Tag color="red">
                                        停用
                                    </Tag>
                                )}
                            </div>

                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => onEdit(item)}
                                >
                                    編輯
                                </Button>

                                <Popconfirm
                                    title="確定刪除嗎？"
                                    onConfirm={() =>
                                        onDelete(item.id)
                                    }
                                >
                                    <Button danger>
                                        刪除
                                    </Button>
                                </Popconfirm>
                            </Space>
                        </Space>
                    </Card>
                );
            })}
        </Space>
    );
};

export default UserCardList;