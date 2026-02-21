import type { Prisma } from "@prisma";
import type z from "zod";
import type {
  createInterviewQuestionFormSchema,
  updateInterviewQuestionFormSchema,
} from "../schemas";

export type CreateInterviewQuestionFormSchema = z.infer<
  ReturnType<typeof createInterviewQuestionFormSchema>
>;

export type UpdateInterviewQuestionFormSchema = z.infer<
  ReturnType<typeof updateInterviewQuestionFormSchema>
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
