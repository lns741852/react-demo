import { useState, useRef, useLayoutEffect, type MouseEventHandler, type FC } from 'react';
import styled, { css } from 'styled-components';
import useColor from '../../hooks/useColor';


/**
 * 過度效果
 * 屬性 過渡時間(稍微加速) 過度效果 延遲時間
 */
const transitionStyle = css`
  transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
   right 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

/**
 * child 元件樣式
 */
const Thumb = styled.div<{
    $thumbSize: number
    $switchWidth: number
    $isChecked: boolean
}>`
  width: ${(props) => props.$thumbSize}px;
  height: ${(props) => props.$thumbSize}px;
  border-radius: 50px;
  background: #FFF;
  position: absolute;
  ${(props) => {
        if (props.$isChecked) {
            return `left: ${props.$switchWidth - props.$thumbSize}px;`;  //同屬性發生變化時才能觸發transition
        }
        return 'left: 0px;';
    }}
  ${transitionStyle}
`;

const Label = styled.div<{
    $switchWidth: number
    $isChecked: boolean
    $padding: number
    $labelWidth: number
}>`
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
  padding: 0px ${(props) => props.$padding}px;
  ${(props) => {
        if (props.$isChecked) {
            return `right: ${props.$switchWidth - props.$labelWidth}px;`;
        }
        return `
    right: 0px;
    `;
    }}
  ${transitionStyle}
`;


/**
 * 基礎樣式
 */

const SwitchButton = styled.div<{
    $thumbSize: number
    $switchWidth: number
    $switchColor: string
    $isDisabled: boolean
}>`
  height: ${(props) => props.$thumbSize}px;
  width: ${(props) => props.$switchWidth}px;
  background: ${(props) => props.$switchColor};
  display: inline-flex;
  color: #FFF;
  border-radius: 50px;
  position: relative;
  border: 3px solid ${(props) => props.$switchColor};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  box-sizing: content-box;  //padding跟margin 不包含在寬跟高之中
`;


/**
 * `Switch` 元件
 */
const Switch: FC<SwitchProps> = ({
    isChecked,
    isDisabled = false,
    size = 'default',
    themeColor = 'primary',
    onChange,
    checkedChildren = 'open',
    unCheckedChildren = 'close',
    ...props
}) => {
    const labelRef = useRef<HTMLDivElement | null>(null);
    const makeColor = useColor();
    const [labelWidth, setLabelWidth] = useState(0);
    const thumbSize = size === 'small' ? 16 : 24;
    const switchWidth = thumbSize + labelWidth;
    const switchColor = makeColor({ themeColor, isDisabled: !isChecked });

    useLayoutEffect(() => {
        const currentLabelWidth = labelRef?.current?.clientWidth;
        currentLabelWidth && setLabelWidth(currentLabelWidth);
    }, [labelRef?.current?.clientWidth]);

    return (
        <SwitchButton
            $switchWidth={switchWidth}
            $thumbSize={thumbSize}
            $switchColor={switchColor}
            $isDisabled={isDisabled}
            onClick={isDisabled ? undefined : onChange}
            {...props}
        >
            <Thumb
                $isChecked={isChecked}
                $thumbSize={thumbSize}
                $switchWidth={switchWidth}
            />
            <Label
                ref={labelRef}
                $padding={thumbSize / 3}
                $labelWidth={labelWidth}
                $switchWidth={switchWidth}
                $isChecked={isChecked}
            >
                {
                    isChecked
                        ? checkedChildren
                        : unCheckedChildren
                }
            </Label>
        </SwitchButton>
    );
};

interface SwitchProps {
    /**
     * 開啟狀態的內容。若設置，則由外部參數控制；若不設置，則由內部 state 控制
     */
    isChecked: boolean;
    /**
     * 禁用狀態
     */
    isDisabled?: boolean;
    /**
     * 主題配色，primary、secondary 或是自己傳入色票
     */
    themeColor?: 'primary' | 'secondary';
    /**
     * 狀態改變的 callback function
     */
    onChange?: MouseEventHandler<HTMLDivElement>
    /**
     * 開關大小
     */
    size?: 'default' | 'small'
    /**
     * 開啟狀態的內容
     */
    checkedChildren?: string
    /**
     * 關閉狀態的內容
     */
    unCheckedChildren?: string,
};

export default Switch;