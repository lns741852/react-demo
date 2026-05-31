import React, { useRef } from 'react';
import CrossChildInput from './CrossChildInput';

const CrossParentInput = () => {
    const childInputRef = useRef<{ focusInput: () => void }>(null);

    return (
        <div>
            <ChildInput ref={childInputRef} />
            <button onClick={() => childInputRef.current?.focusInput()}>聚焦輸入框</button>
        </div>
    );
};

export default CrossParentInput;
