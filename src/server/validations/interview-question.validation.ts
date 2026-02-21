import { enumToObject } from "@/utils";
import { QuestionCategory, QuestionType } from "@prisma";
import z from "zod";

const questionType = enumToObject(QuestionType);
const questionCategory = enumToObject(QuestionCategory);

export const createInterviewQuestionRequest = z.object({
  questionText: z.string().min(1).trim().toLowerCase(),
  questionType: z.enum(questionType),
  category: z.enum(questionCategory).nullable().optional(),
  isRequired: z.boolean(),
  isActive: z.boolean(),
  orderNumber: z.int(),
  options: z.array(z.string()).optional(),
  placeholder: z.string().max(255).nullable().optional(),
});

export const updateInterviewQuestionRequest =
  createInterviewQuestionRequest.partial();

export const deleteInterviewQuestionRequest = z.object({
  id: z.uuid().min(1),
});

export const deleteInterviewQuestionsRequest = z.object({
  ids: z.array(z.string()).min(1),
});
