/**
 * 過濾掉值為空字串、undefined、null的參數
 * @param str
 * @returns
 */
export function filterEmptyKeyword(str: Object) {
  const params = Object.fromEntries(
    Object.entries(str).filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
  return params;
}
