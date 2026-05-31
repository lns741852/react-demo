import { RefObject, useEffect } from "react";
import debounce from "lodash.debounce";

function useLoadMore(
  ref: RefObject<HTMLDivElement>,
  hasNextPage?: boolean,
  fetchNextPage?: () => void,
) {
  useEffect(() => {
    // debounce 防止連續觸發
    const tryLoadMore = debounce(() => {
      const elem = ref.current;

      if (!elem) return;

      const { bottom } = elem.getBoundingClientRect(); // 獲取元素的底部與視窗頂部距離

      // 元素已在底部，觸發加載(window.innerHeight 頁面高度)
      if (bottom <= window.innerHeight && hasNextPage) {
        fetchNextPage?.();
      }
    }, 500);

    window.addEventListener("scroll", tryLoadMore);

    // 初次進入也檢查一次
    tryLoadMore();

    return () => {
      window.removeEventListener("scroll", tryLoadMore);

      tryLoadMore.cancel();
    };
  }, [ref, hasNextPage, fetchNextPage]);
}

export default useLoadMore;
