/* eslint-disable import/prefer-default-export */
export const findAttributeInEvent = (
  event: React.SyntheticEvent,
  attr: string
): string | null => {
  const end = event.currentTarget as HTMLElement;

  let temp = event.target as HTMLElement;
  let dataId = temp.getAttribute(attr);

  while (temp !== end && !dataId) {
    temp = temp.parentElement as HTMLElement;
    if (temp === null) {
      break;
    }
    dataId = temp.getAttribute(attr);
  }
  return dataId;
};
