
import type { FC, ReactNode } from 'react';
import Option from '../Option';

/**
 * `Radio` 是一個單選框元件，讓我們在一組選項當中選擇其中一個選項。
 * 當我們的情境是希望用戶可以一次看到所有選項時，可以使用 Radio Button。
 * Radio Button 的選項不宜多，
 * `如果你的選項多到需要被折疊，那建議你使用更不佔空間的下拉選單元件`。
 */
const Radio: FC<RadioProps> = (props) => (


    <Option
        {...props}
    />
);

export interface RadioProps {
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
    onClick?: () => void,
    /**
     * 在 RadioGroup 中用來幫助判斷是否被選中
     */
    value: string | number,
    /**
     * 內容
     */
    children?: ReactNode | string
};

export default Radio;