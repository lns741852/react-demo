import { useNavigate, useParams } from "react-router-dom";
import {
  duplicateQuestionService,
  getQuestionListService,
  getQuestionService,
  updateQuestionService,
} from "@/api/question";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { message } from "antd";

/**
 * 問卷查詢
 * */
export function useLoadQuestionData() {
  const { id = "" } = useParams();

  //   const [loading, setLoading] = useState(true);
  //   const [question, setQuestion] = useState({});

  //   useEffect(() => {
  //     async function fetchData() {
  //       setLoading(true);
  //       try {
  //         const res = await getQuestionService(id);
  //         setQuestion(res);
  //       } catch (error) {
  //         console.error("Failed to load question:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     fetchData();
  //   }, [id]);

  //   return { loading, question };
  // }
  const { data, isLoading, error } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionService(id),
    enabled: !!id, // 只有當id存在時才執行查詢
    // staleTime: 1000 * 10, // 資料10秒鐘內不會刷新
    retry: 0, // 關閉自動重試
  });
  error && console.error("Failed to load question:", error);

  return {
    isLoading,
    data,
  };
}

/**
 * 星標狀態更新
 * */
export function useQuestionStar({
  isStar,
  _id,
}: {
  isStar: boolean;
  _id: string;
}) {
  const [isStarState, setIsStarState] = useState(isStar);

  const { mutate: changeStar, isPending: changeStarLoading } = useMutation({
    mutationFn: async () => {
      return await updateQuestionService(_id, { isStar: !isStarState });
    },
    onSuccess: () => {
      setIsStarState(!isStarState);
      message.success("已更新");

      // 2. (選填) 如果你想同步刷新 React Query 快取中的資料，可以解開下方註解：
      // queryClient.invalidateQueries({ queryKey: QUESTION_QUERY_KEY })
    },
    // onError: (error) => {
    //   message.error("更新失敗，請稍後再試");
    // },
  });

  return {
    isStarState,
    changeStar,
    changeStarLoading,
  };
}

/**
 * 複製問卷
 * */
export function useQuestionDuplicated(_id: string) {
  const nav = useNavigate();

  const { mutate: duplicate, isPending: duplicateLoading } = useMutation({
    mutationFn: async () => {
      return await duplicateQuestionService(_id);
    },
    onSuccess: (res) => {
      message.success("複製成功");
      nav(`/question/edit/${res._id}`);
    },
  });

  return {
    duplicate,
    duplicateLoading,
  };
}

/**
 * 刪除問卷
 * */
export function useQuestionDeleted(_id: string) {
  const [isDeletedState, setIsDeletedState] = useState(false);

  const { mutate: deleteQuestion, isPending: deleteLoading } = useMutation({
    mutationFn: async () => {
      return await updateQuestionService(_id, { isDeleted: true });
    },
    onSuccess: (res) => {
      message.success("刪除成功");
      setIsDeletedState(true);
    },
  });

  return { deleteQuestion, deleteLoading, isDeletedState };
}
