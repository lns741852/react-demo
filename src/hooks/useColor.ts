import theme from "../config/form/theme";

type themeColorProps = "primary" | "secondary" | "disable" | "error";

interface ColorProps {
  themeColor: themeColorProps;
  isDisabled?: boolean;
}

export const useColor = () => {
  return ({ themeColor, isDisabled }: ColorProps) => {
    const madeColor = theme.color[themeColor] || theme.color.primary;
    return isDisabled ? theme.color.disable : madeColor;
  };
};

export default useColor;
