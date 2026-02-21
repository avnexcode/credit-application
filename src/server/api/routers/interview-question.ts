import { InterviewQuestionService } from "@/server/features/interview-question";
import { errorFilter } from "@/server/filters";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateInterviewQuestionResponse,
  DeleteInterviewQuestionResponse,
  DeleteInterviewQuestionsResponse,
  InterviewQuestionResponse,
  UpdateInterviewQuestionResponse,
} from "@/server/models";
import {
  createInterviewQuestionRequest,
  deleteInterviewQuestionRequest,
  deleteInterviewQuestionsRequest,
  queryParams,
  updateInterviewQuestionRequest,
} from "@/server/validations";
import z from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const idValidation = z.uuid().min(1);

export const interviewQuestionRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(z.object({ params: queryParams }))
    .query(
      async ({
        ctx,
        input,
      }): Promise<QueryResponse<InterviewQuestionResponse>> => {
        const { db } = ctx;
        const { params } = input;
        try {
          const interviewQuestions = await InterviewQuestionService.getAll(
            db,
            params,
          );
          return interviewQuestions;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  getById: adminProcedure
    .input(z.object({ id: idValidation }))
    .query(async ({ ctx, input }): Promise<InterviewQuestionResponse> => {
      const { db } = ctx;
      const { id } = input;
      try {
        const interviewQuestion = await InterviewQuestionService.getById(
          db,
          id,
        );
        return interviewQuestion;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: protectedProcedure
    .input(z.object({ request: createInterviewQuestionRequest }))
    .mutation(
      async ({ ctx, input }): Promise<CreateInterviewQuestionResponse> => {
        const { db } = ctx;
        const { request } = input;
        try {
          const interviewQuestion = await InterviewQuestionService.create(
            db,
            request,
          );
          return interviewQuestion;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  update: protectedProcedure
    .input(
      z.object({ id: idValidation, request: updateInterviewQuestionRequest }),
    )
    .mutation(
      async ({ ctx, input }): Promise<UpdateInterviewQuestionResponse> => {
        const { db } = ctx;
        const { id, request } = input;
        try {
          const interviewQuestion = await InterviewQuestionService.update(
            db,
            id,
            request,
          );
          return interviewQuestion;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  delete: adminProcedure
    .input(z.object({ request: deleteInterviewQuestionRequest }))
    .mutation(
      async ({ ctx, input }): Promise<DeleteInterviewQuestionResponse> => {
        const { db } = ctx;
        const { request } = input;
        try {
          const interviewQuestion = await InterviewQuestionService.delete(
            db,
            request,
          );
          return interviewQuestion;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),

  deleteMany: adminProcedure
    .input(z.object({ request: deleteInterviewQuestionsRequest }))
    .mutation(
      async ({ ctx, input }): Promise<DeleteInterviewQuestionsResponse> => {
        const { db } = ctx;
        const { request } = input;
        try {
          const interviewQuestion = await InterviewQuestionService.deleteMany(
            db,
            request,
          );
          return interviewQuestion;
        } catch (error) {
          return errorFilter(error);
        }
      },
    ),
});
