import { Grid } from "antd";
import { useMemo } from "react";

/**
 *
 * @returns 監聽頁面寬度
 */
export const useResponsive = () => {
  const screens = Grid.useBreakpoint();

  return useMemo(() => {
    return !screens.md;
  }, [screens.md]);
};
