import { deleteQuestionsService, updateQuestionService } from "@/api/question";
import { sleep } from "@/utils/ut";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { waitForDebugger } from "inspector";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";

/**
 * 恢復問卷
 */
export function useTrashRecover(
  selectedIds: string[],
  clearSelection: () => void,
) {
  const queryClient = useQueryClient();

  const { mutate: recover, isPending: recoverLoading } = useMutation({
    mutationFn: async () => {
      for (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    onSuccess: () => {
      message.success("恢復成功");
      // 刷新問卷列表,queryKey:為查詢時定義的key
      queryClient.invalidateQueries({ queryKey: ["questionList"] });
      clearSelection();
    },
  });

  //防止重複點擊
  const debouncedRecover = useMemo(
    () =>
      debounce(() => {
        recover();
      }, 500), // 延遲 500 毫秒執行
    [recover],
  );

  return { recover: debouncedRecover, recoverLoading };
}

/**
 * 徹底刪除問卷
 */
export function useTrashDeleted(
  selectedIds: string[],
  clearSelection: () => void,
) {
  const queryClient = useQueryClient();

  const { mutate: deleted, isPending: deletedLoading } = useMutation({
    mutationFn: async () => await deleteQuestionsService(selectedIds),
    onSuccess: () => {
      message.success("刪除成功");
      // 刷新問卷列表,queryKey:為查詢時定義的key
      queryClient.invalidateQueries({ queryKey: ["questionList"] });
      clearSelection();
    },
  });

  //防止重複點擊
  const debouncedDeleted = useMemo(
    () =>
      debounce(() => {
        deleted();
      }, 500), // 延遲 500 毫秒執行
    [deleted],
  );

  return { deleted: debouncedDeleted, deletedLoading };
}
