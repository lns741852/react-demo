import { Form, type FormInstance, type FormProps } from 'antd';
import { type ReactNode, forwardRef, useImperativeHandle } from 'react';
import { formFields } from '../config/form/userFields';

interface UserFormProps extends FormProps {
    children?: ReactNode;
}

// UserForm 組件
const UserForm = forwardRef<FormInstance, UserFormProps>(({ children, ...props }, ref) => {
    const [form] = Form.useForm();

    // 讓 ref 能夠控制 form
    useImperativeHandle(ref, () => form);

    return (
        <Form {...props} form={form} layout="vertical">
            {formFields(form).map(({ label, name, rules, component }) => (
                <Form.Item key={name} label={label} name={name} rules={rules}>
                    {component}
                </Form.Item>
            ))}
            {children}
        </Form>
    );
});

export default UserForm;