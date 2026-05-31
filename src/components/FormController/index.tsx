import React, { useState, type ReactNode, type ChangeEvent, type ReactElement } from 'react';
import styled, { css } from 'styled-components';

const topCommonStyle = css`
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`;

const bottomCommonStyle = css`
  flex-direction: column-reverse;
  & > *:not(:first-child) {
    margin-bottom: 8px;
  }
`;

const ErrorMessage = styled.div<any>`
  font-size: 14px;
  margin-top: 4px !important;
  color: ${(props) => props.theme.color.error};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MaxLength = styled.div<any>`
  font-size: 14px;
  color: ${(props) => props.theme.color.primary};
`;

const RequiredSign = styled.span<any>`
  color: ${(props) => props.theme.color.error};
  margin-right: 3px;
`;

const topLeftStyle = css`
  ${topCommonStyle}
`;
const topStyle = css`
  align-items: center;
  ${topCommonStyle}
`;
const topRightStyle = css`
  align-items: flex-end;
  ${topCommonStyle}
`;
const bottomLeftStyle = css`
  ${bottomCommonStyle}
`;
const bottomStyle = css`
  align-items: center;
  ${bottomCommonStyle}
`;
const bottomRightStyle = css`
  align-items: flex-end;
  ${bottomCommonStyle}
`;

const leftStyle = css`
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const rightStyle = css`
  align-items: center;
  flex-direction: row-reverse;
  & > *:not(:first-child) {
    margin-right: 8px;
  }
`;

const placementStyleMap = {
  'top-left': topLeftStyle,
  'top': topStyle,
  'top-right': topRightStyle,
  'left': leftStyle,
  'right': rightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom': bottomStyle,
  'bottom-right': bottomRightStyle,
};

type Placement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

interface StyledFormItemProps {
  $placement?: Placement;
}

const StyledFormItem = styled.div<StyledFormItemProps>`
  display: inline-flex;
  ${(props) => props.$placement && placementStyleMap[props.$placement]}
`;

export interface FormItemProps {
  className?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string | null;
  maxLength?: number | null;
  placement?: Placement;
  label?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactElement;
}

const FormItem: React.FC<FormItemProps> = ({
  className = '',
  isRequired = false,
  isError = false,
  errorMessage = null,
  placement = 'top-left',
  maxLength = null,
  label = '',
  onChange = () => { },
  children = null,
  ...props
}) => {
  const [childrenValue, setChildrenValue] = useState('');
  const isSwitchComponent = children?.type && (children.type as any).name === 'Switch';

  /**
   * 重寫 onChange
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    if (maxLength && targetValue.length > maxLength) return;

    setChildrenValue(targetValue);
    onChange(event);
  };

  return (
    <StyledFormItem className={className} $placement={placement} {...props}>
      <LabelWrapper>
        <div>
          {isRequired && <RequiredSign>*</RequiredSign>}
          {label}
        </div>
        {maxLength && <MaxLength>{`${childrenValue?.length} / ${maxLength}`}</MaxLength>}
      </LabelWrapper>
      {isSwitchComponent
        ? children
        : !!children &&
        React.cloneElement((children as any), {
          isError,
          value: childrenValue,
          onChange: handleOnChange,
        })}
      {isError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledFormItem>
  );
};

export default FormItem;
