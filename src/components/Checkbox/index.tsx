
import type { FC, ReactNode } from 'react';
import Option from '../Option';

/**
 * `Checkbox` 是一個多選框元件。通常使用情境是在一個群組的選項當中進行多項選擇時使用。
 */
const Checkbox: FC<CheckboxProps> = ({
    ...props
}) => <Option {...props} />;

interface CheckboxProps {
    /**
     * 開啟或關閉
     */
    isChecked?: boolean,
    /**
     * 是否禁用
     */
    isDisabled?: boolean,
    /**
     * 主題配色，primary、secondary 或是自己傳入色票
     */
    themeColor?: 'primary' | 'secondary'
    /**
     * 點擊事件
     */
    onClick: () => void
    /**
     * 內容
     */
    children: ReactNode | string
};

export default Checkbox;