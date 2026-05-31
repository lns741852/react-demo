import { useEffect, type ReactNode, type FC } from 'react';
import ReactDOM from 'react-dom';



interface PortalProps {
    children: ReactNode
    customRootId: string
}

const Portal: FC<PortalProps> = ({ children, customRootId }) => {
    let portalRoot: HTMLElement;
    const rootId = customRootId || 'portal-root';

    if (document.getElementById(rootId)) {
        portalRoot = document.getElementById(rootId) as HTMLElement;
    } else {
        const divDOM = document.createElement('div');
        divDOM.id = rootId;
        document.body.appendChild(divDOM);
        portalRoot = divDOM;
    }

    useEffect(() => () => {
        portalRoot?.parentElement?.removeChild(portalRoot);
    }, [portalRoot]);

    return ReactDOM.createPortal(
        children,
        portalRoot,
    );
};

export default Portal;