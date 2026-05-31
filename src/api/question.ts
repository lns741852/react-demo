import { filterEmptyKeyword } from "@/utils/objUtil";
import axios from "./axios";
import { Question, QuestionPage } from "@/types/question";

interface SearchOption {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
}

/**
 * 獲取question
 * @returns
 * */
export function getQuestionService(id?: string) {
  return axios.get<Question>(`/api/question/${id}`);
}

/**
 * 創建問卷
 * */
export function createQuestionService() {
  return axios.post<{ id: string }>(`/api/question`);
}

/**
 * 查詢問卷列表
 * */

// Partial 讓SearchOption裡的屬性變成可選的
export function getQuestionListService(opt: Partial<SearchOption>) {
  const params = filterEmptyKeyword(opt);
  return axios.get<QuestionPage>(`/api/question`, { params });
}

export function updateQuestionService(id: string, data: Partial<Question>) {
  const url = `/api/question/${id}`;
  return axios.put(url, data);
}

export function deleteQuestionsService(ids: string[]) {
  return axios.delete(`/api/question`, { data: { ids } });
}

// 複製
export function duplicateQuestionService(id: string) {
  return axios.post(`/api/question/duplicate/${id}`);
}
