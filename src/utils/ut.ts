/**
 * @description 防抖函数，限制函数在一定时间内只能被调用一次
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

/**
 *  模擬網絡延遲
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
