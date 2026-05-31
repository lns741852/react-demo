export interface Question {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
}

export interface QuestionPage {
  list: Question[];
  page: number;
  limit: number;
  total: number;
}
