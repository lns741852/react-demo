import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { type MouseEventHandler, type ReactNode } from 'react';

import './styles.scss';

interface Props {
  className?: string;
  loading?: boolean;
  isStatic?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children, className, loading, isStatic, onClick }) => {
  return (
    <div
      className={classNames(
        'card',
        { ['center']: loading },
        { ['active']: !isStatic },
        className
      )}
      onClick={onClick}
    >
      {loading ? <Skeleton paragraph={{ rows: 1 }} /> : children}
    </div>
  );
};

export default Card;


// import type { FC, ReactElement } from 'react';
// import styled, { css } from 'styled-components';

// const verticalStyle = css`
//   display: inline-flex;
//   flex-direction: column;
// `;

// const horizontalStyle = css`
//   display: flex;
// `;

// const horizontalReverseStyle = css`
//   display: flex;
//   flex-direction: row-reverse;
// `;

// const variantMap = {
//     'vertical': verticalStyle,
//     'horizontal': horizontalStyle,
//     'horizontal-reverse': horizontalReverseStyle,
// };

// const StyledCard = styled.div<{ $variant: 'vertical' | 'horizontal' | 'horizontal-reverse' }>`
//   border: 1px solid #DDD;
//   border-radius: 4px;
//   box-shadow: 5px 5px 5px 0px #1212126b;
//   overflow: hidden;

//   ${(props) => variantMap[props.$variant] || variantMap.vertical}
// `;

// const Cover = styled.div`
//   overflow: hidden;
//   width: 300px;
//   img {
//     width: 100%;
//     display: block;
//   }
// `;

// const SpaceBetween = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// /**
//  * `Card` 是一個可以顯示單個主題內容及操作的元件，通常這個主題內容包含圖片、標題、描述或是一些操作。
//  */
// const Card: FC<CardProps> = ({
//     className = '',
//     cover = null,
//     variant = 'vertical',
//     children = null,
//     footer = null,
//     ...props
// }) => (
//     <StyledCard className={className} $variant={variant} {...props}>
//         <Cover className="card__cover">{cover}</Cover>
//         <SpaceBetween>
//             {children}
//             {footer}
//         </SpaceBetween>
//     </StyledCard>
// );

// interface CardProps {
//     /**
//      * 客製化樣式
//      */
//     className?: string,
//     /**
//      * 卡片封面媒體
//      */
//     cover?: ReactElement
//     /**
//      * 變化模式
//      */
//     variant?: 'vertical' | 'horizontal' | 'horizontal-reverse'
//     /**
//      * 卡片置底頁尾
//      */
//     footer?: ReactElement
//     /**
//      * 內容
//      */
//     children?: ReactElement
// };

// export default Card;