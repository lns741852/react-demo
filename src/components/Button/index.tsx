import { type FC, type MouseEventHandler, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Spin } from 'antd';
import useColor from '../../hooks/useColor';


type ButtonType = 'contained' | 'outlined' | 'text';
type ThemeType = 'primary' | 'secondary' | 'error';


interface StyledButtonProps {
  $btnColor: string;
  $variant: ButtonType
}

/**
 * 動態樣式
 */
const containedStyle = css<StyledButtonProps>`
  background: ${(props) => props.$btnColor};
  color: #FFF;
`;


const outlinedStyle = css<StyledButtonProps>`
  background: #FFF;
  color: ${(props) => props.$btnColor};
  border: 1px solid ${(props) => props.$btnColor};
  &:hover {
    background: ${(props) => `${props.$btnColor}10`};
  }
`;

const textStyle = css<StyledButtonProps>`
  background: #FFF;
  color: ${(props) => props.$btnColor};
  &:hover {
    background: ${(props) => `${props.$btnColor}10`};
  }
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
  text: textStyle,
};



/**
 * disable 樣式
 */

const disabledStyle = css`
  cursor: not-allowed;
  &:hover, &:active {
    opacity: 1;
  }
`;

/**
 * child 元件樣式
 */

const StyledSpin = styled(Spin) <StyledButtonProps>`
  margin-right: 8px;
  color: ${(props) => (props.$variant === 'contained' ? '#FFF' : props.$btnColor)} !important;
`;

const StartIcon = styled.span`
  margin-right: 8px;
`;

const EndIcon = styled.span`
  margin-left: 8px;
`;

/**
 * 基礎樣式
 */
const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  outline: none;
  min-width: 100px;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border 0.2s, opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    ${disabledStyle}
  }

  ${(props) => variantMap[props.$variant] || variantMap.contained}
`;

/**
 * Button 元件
 */
const Button: FC<ButtonProps> = ({
  className,
  children,
  themeColor = 'primary',
  variant = 'contained',
  isLoading = false,
  isDisabled = false,
  startIcon,
  endIcon,
  onClick,
  ...props
}) => {
  const makeColor = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledButton
      type="button"
      className={className}
      $btnColor={btnColor}
      $variant={variant}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      <>
        {isLoading && (
          <StyledSpin
            $variant={variant}
            $btnColor={btnColor}
          />)}
        {startIcon && <StartIcon>{startIcon}</StartIcon>}
        <span>{children}</span>
        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </>
    </StyledButton>
  );
};

interface ButtonProps {
  /**
   * 設置按鈕類型
   */
  variant?: ButtonType;
  /**
   * 客製化樣式
   */
  className?: string;
  /**
   * 內容
   */
  children: ReactNode;
  /**
   * 主題配色
   */
  themeColor?: ThemeType;
  /**
   * 載入中狀態
   */
  isLoading?: boolean;
  /**
   * 禁用狀態
   */
  isDisabled?: boolean;
  /**
   * 設置按鈕左方圖示
   */
  startIcon?: ReactNode;
  /**
   * 設置按鈕右方圖示
   */
  endIcon?: ReactNode;
  /**
   * 點擊事件
   */
  onClick?: () => void
};


export default Button;