import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "@/api/question";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from "@/constant";
import { QuestionPage } from "@/types/question";

interface LoadQuestionListType {
  isStar: boolean;
  isDeleted: boolean;
}

export function useLoadQuestionList({
  isStar,
  isDeleted,
}: Partial<LoadQuestionListType>) {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 0;
  const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || 0;

  const DEFAULT_QUESTION_PAGE: QuestionPage = {
    list: [],
    total: 0,
    page: 0,
    limit: 0,
  };

  const {
    // data ={} as QuestionPage,
    data = DEFAULT_QUESTION_PAGE, // 給一個默認值，避免解構賦值時出錯
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["questionList", keyword, page, pageSize], //變數刷新執行API
    queryFn: () =>
      getQuestionListService({ keyword, isStar, isDeleted, page, pageSize }),
  });

  return {
    data,
    loading,
    error,
  };
}

export function useLoadMoreQuestionList() {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  const {
    data = {
      pages: [],
      pageParams: [],
    },
    fetchNextPage, // 觸發加載下一頁
    hasNextPage, // 是否下一頁
  } = useInfiniteQuery({
    queryKey: ["questionList", keyword],
    queryFn: async ({ pageParam = 1 }) => {
      const { list, total } = await getQuestionListService({
        page: pageParam,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });

      let totalPages = Math.ceil(total / LIST_PAGE_SIZE);
      let nextPage = pageParam + 1;

      return {
        list,
        nextPage,
        hasMore: nextPage <= totalPages,
        total,
      };
    },
    // 初始頁碼
    initialPageParam: 1,

    // 計算下一頁的頁碼邏輯
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    // 視窗大小改變或重新聚焦時，不要重新抓取
    refetchOnWindowFocus: false,
  });

  return {
    data,
    fetchNextPage, // 觸發加載下一頁
    hasNextPage,
  };
}
