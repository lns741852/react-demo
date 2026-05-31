import { type FC, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

const errorStyle = css<any>`
  border: 1px solid ${(props) => props.theme.color.error};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.error};
  }
`;

const disabledStyle = css<any>`
  border: 1px solid ${(props) => props.theme.color.disable};
  cursor: not-allowed;
  background: ${(props) => props.theme.color.disable}22;
  .text-field__input {
    cursor: not-allowed;
    background: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.color.disable};
  }
`;

const InputWapper = styled.div<{ $isError: boolean, $isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  border: 1px solid #DDD;
  border-radius: 4px;
  padding: 8px 12px;
  box-sizing: border-box;
  height: 36px;

  &:hover {
    border: 1px solid #222;
  }

  ${(props) => (props.$isError ? errorStyle : null)}
  ${(props) => (props.$isDisabled ? disabledStyle : null)}

  input{
    outline: none;
    border: none;
    font-size: 14px;
    color: #333;
    width: 100%;
  }

`;



/**
 * `Input` 是一個允許用戶輸入和編輯文字的元件。
 */
const Input: FC<InputProps> = ({
  className = '',
  prefix,
  suffix,
  isError = false,
  isDisabled = false,
  ...props
}) => {
  return (
    <InputWapper
      className={className}
      $isError={isError}
      $isDisabled={isDisabled}
    >
      {prefix}
      <input
        type="text"
        className="text-field__input"
        disabled={isDisabled}
        {...props}
      />
      {suffix}
    </InputWapper>
  );
}

interface InputProps {
  /**
   * 客製化 class 樣式
   */
  className?: string
  /**
   * 前綴元件
   */
  prefix?: ReactNode
  /**
   * 後綴元件
   */
  suffix?: ReactNode
  /**
   * 佔位文字
   */
  placeholder?: string,
  /**
   * 錯誤狀態
   */
  isError?: boolean
  /**
   * 禁用狀態
   */
  isDisabled?: boolean
  /**
   *  狀態改變的 callback function
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export default Input;