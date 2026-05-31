// components/UserFormModal/index.tsx

import React, { FC, useEffect } from 'react';

import { Form, Input, InputNumber, Modal } from 'antd';

import type { UserFormValues, UserItem } from '@/types/user';

/**
 * Props
 */
interface Props {
    mode: 'create' | 'edit';
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



    /**
     * Form Instance
     */
    const [form] = Form.useForm<UserFormValues>();

    /**
     * 回填表單資料
     */
    useEffect(() => {
        if (mode === 'edit' && initialValues) {
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
    }, [
        form,
        initialValues,
        mode,
    ]);

    /**
     * 提交表單
     */
    const handleOk = async (): Promise<void> => {
        try {
            /**
             * 驗證所有欄位
             */
            const values = await form.validateFields();

            /**
             * 呼叫父層 submit
             */
            await onSubmit(values);

            /**
             * 重置表單
             */
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * 關閉 Modal
     */
    const handleCancel = (): void => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={
                mode === 'create'
                    ? '新增使用者'
                    : '編輯使用者'
            }
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnHidden
        >
            <Form<UserFormValues>
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '請輸入姓名',
                        },
                        {
                            min: 2,
                            message: '至少需要 2 個字',
                        },
                    ]}
                >
                    <Input placeholder="請輸入姓名" />
                </Form.Item>

                <Form.Item
                    label="年齡"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: '請輸入年齡',
                        },
                        {
                            type: 'number',
                            min: 1,
                            max: 120,
                            message: '年齡需介於 1 ~ 120',
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="請輸入年齡"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: '請輸入 Email',
                        },
                        {
                            type: 'email',
                            message: 'Email 格式錯誤',
                        },
                    ]}
                >
                    <Input placeholder="請輸入 Email" />
                </Form.Item>

                <Form.Item
                    label="地址"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: '請輸入地址',
                        },
                    ]}
                >
                    <Input placeholder="請輸入地址" />
                </Form.Item>

                <Form.Item
                    label="狀態"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: '請輸入狀態',
                        },
                        {
                            validator: async (_, value) => {
                                if (
                                    value !== 'active' &&
                                    value !== 'inactive'
                                ) {
                                    throw new Error(
                                        '只能是 active 或 inactive',
                                    );
                                }
                            },
                        },
                    ]}
                >
                    <Input placeholder="active / inactive" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;