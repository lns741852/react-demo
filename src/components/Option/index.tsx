import { type FC, type ReactNode } from 'react';
import styled from 'styled-components';
import { BorderOutlined, CheckSquareOutlined } from '@ant-design/icons';
import useColor from '../../hooks/useColor';

const DISABLED_COLOR = '#dadada';


/**
 * base style
 */
const StyledOption = styled.div<{
  $isDisabled: boolean
  $btnColor: string
}>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#222222')};

	& > *:not(:first-child) {
		margin-left: 8px;
	}

  .option__checked-icon {
    color: ${(props) => props.$btnColor};
  }

  .option__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#808080')};
  }

  &:hover {
    .option__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$btnColor)};
    }
  }
`;

const Option: FC<OptionProps> = ({
  isChecked = false,
  isDisabled = false,
  themeColor = 'primary',
  onClick,
  checkedIcon = <CheckSquareOutlined className='option__checked-icon' />,
  unCheckedIcon = <BorderOutlined className='option__unchecked-icon' />,
  children = '',
  ...props
}) => {
  const makeColor = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledOption
      onClick={isDisabled ? undefined : onClick}
      $isDisabled={isDisabled}
      $btnColor={btnColor}
      {...props}
    >
      {
        isChecked ? checkedIcon : unCheckedIcon
      }
      {/* !!children 強制轉換成boolean，不會被誤判為string */}
      {!!children && <span>{children}</span>}
    </StyledOption>
  );
};

interface OptionProps {
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
  onClick?: () => void
  /**
   * 被選中的圖示
   */
  checkedIcon?: ReactNode
  /**
   * 未被選中的圖示
   */
  unCheckedIcon?: ReactNode
  /**
   * 內容
   */
  children?: ReactNode | string
};

export default Option;