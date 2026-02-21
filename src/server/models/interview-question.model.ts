import type { InterviewQuestion, Prisma } from "@prisma";
import type z from "zod";
import type {
  createInterviewQuestionRequest,
  deleteInterviewQuestionRequest,
  deleteInterviewQuestionsRequest,
  updateInterviewQuestionRequest,
} from "../validations";

export type CreateInterviewQuestionRequest = z.infer<
  typeof createInterviewQuestionRequest
>;

export type UpdateInterviewQuestionRequest = z.infer<
  typeof updateInterviewQuestionRequest
>;

export type DeleteInterviewQuestionRequest = z.infer<
  typeof deleteInterviewQuestionRequest
>;

export type DeleteInterviewQuestionsRequest = z.infer<
  typeof deleteInterviewQuestionsRequest
>;

export type InterviewQuestionResponse = Prisma.InterviewQuestionGetPayload<{
  select: {
    id: true;
    questionText: true;
    questionType: true;
    category: true;
    isRequired: true;
    isActive: true;
    orderNumber: true;
    options: true;
    placeholder: true;
    creatorId: true;
    updaterId: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type CreateInterviewQuestionResponse = Omit<
  InterviewQuestion,
  "updatedAt" | "updaterId"
>;

export type UpdateInterviewQuestionResponse = Omit<
  InterviewQuestion,
  "createdAt" | "creatorId"
>;

export type DeleteInterviewQuestionResponse = Pick<InterviewQuestion, "id">;

export type DeleteInterviewQuestionsResponse = Pick<InterviewQuestion, "id">[];
