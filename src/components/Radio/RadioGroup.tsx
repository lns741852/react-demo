import React, { type FC, type ReactElement } from 'react';
import styled from 'styled-components';
import type { RadioProps } from '.';


const StyledRadioGroup = styled.div < { $columns: number }> `
  display: flex;
  grid-gap: 8px;
`;

const RadioGroup: FC<RadioGroupProps> = ({
    value,
    children,
    onChange,
    columns = 1,
    ...props
}) => {

    return (
        <StyledRadioGroup
            $columns={columns}
            {...props}
        >
            {React.Children.map(children, (child) => (
                React.cloneElement(child, {
                    onClick: () => onChange(child.props.value),
                    isChecked: child.props.value === value,
                })
            ))}
        </StyledRadioGroup>
    );
};

interface RadioGroupProps {
    columns?: number,
    /**
     * Selected value
     */
    value: number | string
    /**
     * children of RadioGroup
     */
    children: ReactElement<RadioProps> | ReactElement<RadioProps>[]
    /**
     * callback when event on change
     */
    onChange: (value: number | string) => void
};



export default RadioGroup;