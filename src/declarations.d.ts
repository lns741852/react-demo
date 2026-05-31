/**
 * @description: 為 redux-persist/integration/react 模塊提供類型定義
 */
declare module "redux-persist/integration/react" {
  import { ReactNode, ComponentType } from "react";
  import { Persistor } from "redux-persist";

  export interface PersistGateProps {
    container?: ReactNode;
    className?: string;
    style?: object;
    persistor: Persistor;
    onBeforeLift?(): void | Promise<void>;
    children?: ReactNode | ((bootstrapped: boolean) => ReactNode);
  }

  export const PersistGate: ComponentType<PersistGateProps>;
}
