import type { DBClient } from "@/server/db";
import type {
  InterviewQuestionResponse,
  CreateInterviewQuestionRequest,
  CreateInterviewQuestionResponse,
  DeleteInterviewQuestionRequest,
  DeleteInterviewQuestionResponse,
  DeleteInterviewQuestionsRequest,
  DeleteInterviewQuestionsResponse,
  QueryParams,
  UpdateInterviewQuestionRequest,
  UpdateInterviewQuestionResponse,
} from "@/server/models";

export class InterviewQuestionRepository {
  protected static orQuery = ["accountName", "accountNumber"];

  static findMany = async (
    db: DBClient,
    params: QueryParams,
  ): Promise<InterviewQuestionResponse[]> => {
    const { page, limit, search, sort } = params;

    const skip = (page - 1) * limit;

    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const interviewQuestion = await db.interviewQuestion.findMany({
      where: { ...(search && { OR: orQuery }) },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        category: true,
        isRequired: true,
        isActive: true,
        orderNumber: true,
        options: true,
        placeholder: true,
        creatorId: true,
        updaterId: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip,
      orderBy: sort.map((s) => ({ [s.id]: s.desc ? "desc" : "asc" })),
    });

    return interviewQuestion;
  };

  static findUniqueId = async (
    db: DBClient,
    interviewQuestionId: string,
  ): Promise<InterviewQuestionResponse | null> => {
    const interviewQuestion = await db.interviewQuestion.findUnique({
      where: { id: interviewQuestionId },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        category: true,
        isRequired: true,
        isActive: true,
        orderNumber: true,
        options: true,
        placeholder: true,
        creatorId: true,
        updaterId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return interviewQuestion;
  };

  static countAllSearch = async (
    db: DBClient,
    search?: string,
  ): Promise<number> => {
    const orQuery = this.orQuery.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));

    const interviewQuestionCount = await db.interviewQuestion.count({
      where: { ...(search && { OR: orQuery }) },
    });

    return interviewQuestionCount;
  };

  static countUniqueId = async (
    db: DBClient,
    interviewQuestionId: string,
  ): Promise<number> => {
    const interviewQuestionCount = await db.interviewQuestion.count({
      where: { id: interviewQuestionId },
    });

    return interviewQuestionCount;
  };

  static insert = async (
    db: DBClient,
    request: CreateInterviewQuestionRequest,
  ): Promise<CreateInterviewQuestionResponse> => {
    const interviewQuestion = await db.interviewQuestion.create({
      data: { ...request },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        category: true,
        isRequired: true,
        isActive: true,
        orderNumber: true,
        options: true,
        placeholder: true,
        creatorId: true,
        createdAt: true,
      },
    });

    return interviewQuestion;
  };

  static update = async (
    db: DBClient,
    interviewQuestionId: string,
    request: UpdateInterviewQuestionRequest,
  ): Promise<UpdateInterviewQuestionResponse> => {
    const interviewQuestion = await db.interviewQuestion.update({
      where: { id: interviewQuestionId },
      data: { ...request },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        category: true,
        isRequired: true,
        isActive: true,
        orderNumber: true,
        options: true,
        placeholder: true,
        updaterId: true,
        updatedAt: true,
      },
    });

    return interviewQuestion;
  };

  static destroy = async (
    db: DBClient,
    request: DeleteInterviewQuestionRequest,
  ): Promise<DeleteInterviewQuestionResponse> => {
    const interviewQuestion = await db.interviewQuestion.delete({
      where: { id: request.id },
      select: { id: true },
    });

    return interviewQuestion;
  };

  static destroyMany = async (
    db: DBClient,
    request: DeleteInterviewQuestionsRequest,
  ): Promise<DeleteInterviewQuestionsResponse> => {
    const interviewQuestion = await db.interviewQuestion.findMany({
      where: { id: { in: request.ids } },
      select: { id: true },
    });

    await db.interviewQuestion.deleteMany({
      where: { id: { in: request.ids } },
    });

    return interviewQuestion;
  };
}
