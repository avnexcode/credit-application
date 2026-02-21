import serverI18n from "@/lib/i18n/server";
import type { DBClient } from "@/server/db";
import type { QueryResponse } from "@/server/interfaces";
import type {
  CreateInterviewQuestionRequest,
  CreateInterviewQuestionResponse,
  DeleteInterviewQuestionRequest,
  DeleteInterviewQuestionResponse,
  DeleteInterviewQuestionsRequest,
  DeleteInterviewQuestionsResponse,
  InterviewQuestionResponse,
  QueryParams,
  UpdateInterviewQuestionRequest,
  UpdateInterviewQuestionResponse,
} from "@/server/models";
import { BaseService } from "../common";
import { InterviewQuestionRepository } from "./interview-question.repository";

export class InterviewQuestionService extends BaseService {
  protected static baseModel = serverI18n.t("models.interviewQuestion.title");

  protected static checkInterviewQuestionExists = async (
    db: DBClient,
    interviewQuestionId: string,
  ): Promise<void> => {
    const isInterviewQuestionExists =
      await InterviewQuestionRepository.countUniqueId(db, interviewQuestionId);

    await this.checkExists(isInterviewQuestionExists === 0, this.baseModel);
  };

  static getAll = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<QueryResponse<InterviewQuestionResponse>> => {
    const { page, limit, search } = params;
    const totalCount = await InterviewQuestionRepository.countAllSearch(
      db,
      search,
    );

    const interviewQuestions = await InterviewQuestionRepository.findMany(
      db,
      params,
    );

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: interviewQuestions,
      meta: {
        total: totalCount,
        limit,
        page,
        lastPage,
      },
    };
  };

  static getById = async (
    db: DBClient,
    interviewQuestionId: string,
  ): Promise<InterviewQuestionResponse> => {
    const interviewQuestion = await InterviewQuestionRepository.findUniqueId(
      db,
      interviewQuestionId,
    );

    return this.checkNotNull(interviewQuestion, this.baseModel);
  };

  static create = async (
    db: DBClient,
    request: CreateInterviewQuestionRequest,
  ): Promise<CreateInterviewQuestionResponse> => {
    const interviewQuestion = await InterviewQuestionRepository.insert(
      db,
      request,
    );

    return interviewQuestion;
  };

  static update = async (
    db: DBClient,
    interviewQuestionId: string,
    request: UpdateInterviewQuestionRequest,
  ): Promise<UpdateInterviewQuestionResponse> => {
    await this.checkInterviewQuestionExists(db, interviewQuestionId);

    const interviewQuestion = await InterviewQuestionRepository.update(
      db,
      interviewQuestionId,
      request,
    );

    return interviewQuestion;
  };

  static delete = async (
    db: DBClient,
    request: DeleteInterviewQuestionRequest,
  ): Promise<DeleteInterviewQuestionResponse> => {
    await this.checkInterviewQuestionExists(db, request.id);

    const interviewQuestion = await InterviewQuestionRepository.destroy(
      db,
      request,
    );

    return interviewQuestion;
  };

  static deleteMany = async (
    db: DBClient,
    request: DeleteInterviewQuestionsRequest,
  ): Promise<DeleteInterviewQuestionsResponse> => {
    await Promise.all(
      request.ids.map(async (id) => {
        await this.checkInterviewQuestionExists(db, id);
      }),
    );

    const interviewQuestions = await InterviewQuestionRepository.destroyMany(
      db,
      request,
    );

    return interviewQuestions;
  };
}
