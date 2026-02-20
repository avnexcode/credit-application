import { capitalizeWords } from "@/utils";
import type {
  ApplicationStatus,
  CreditScore,
  EmploymentType,
  Gender,
  Language,
  LoanStatus,
  LoanType,
  MaritalStatus,
  NotificationPriority,
  NotificationType,
  PaymentStatus,
  QuestionCategory,
  QuestionType,
  Relationship,
  ReportType,
  Theme,
} from "@prisma";
import { t as translator, type TFunction } from "i18next";

// ==================== EMPLOYMENT TYPE ====================
const EMPLOYMENT_TYPE_LABEL = {
  CIVIL_SERVANT: "enums.employmentType.civilServant",
  PRIVATE_EMPLOYEE: "enums.employmentType.privateEmployee",
  STATE_OWNED_EMPLOYEE: "enums.employmentType.stateOwnedEmployee",
  CONTRACT_EMPLOYEE: "enums.employmentType.contractEmployee",
  FREELANCER: "enums.employmentType.freelancer",
  ENTREPRENEUR: "enums.employmentType.entrepreneur",
  BUSINESS_OWNER: "enums.employmentType.businessOwner",
  FARMER: "enums.employmentType.farmer",
  FISHERMAN: "enums.employmentType.fisherman",
  LABORER: "enums.employmentType.laborer",
  TEACHER: "enums.employmentType.teacher",
  LECTURER: "enums.employmentType.lecturer",
  HEALTH_WORKER: "enums.employmentType.healthWorker",
  STUDENT: "enums.employmentType.student",
  HOMEMAKER: "enums.employmentType.homemaker",
  RETIRED: "enums.employmentType.retired",
  UNEMPLOYED: "enums.employmentType.unemployed",
} as const satisfies Record<EmploymentType, string>;

type GetEmploymentTypeProps = {
  employmentType?: EmploymentType | null;
  t?: TFunction;
};

export const getEmploymentType = ({
  employmentType,
  t = translator,
}: GetEmploymentTypeProps) => {
  return employmentType
    ? capitalizeWords(t(EMPLOYMENT_TYPE_LABEL[employmentType]))
    : "-";
};

// ==================== GENDER ====================
const GENDER_LABEL = {
  MALE: "enums.gender.male",
  FEMALE: "enums.gender.female",
} as const satisfies Record<Gender, string>;

type GetGenderProps = {
  gender?: Gender | null;
  t?: TFunction;
};

export const getGender = ({ gender, t = translator }: GetGenderProps) => {
  return gender ? capitalizeWords(t(GENDER_LABEL[gender])) : "-";
};

// ==================== MARITAL STATUS ====================
const MARITAL_STATUS_LABEL = {
  SINGLE: "enums.maritalStatus.single",
  MARRIED: "enums.maritalStatus.married",
  DIVORCED: "enums.maritalStatus.divorced",
  WIDOWED: "enums.maritalStatus.widowed",
} as const satisfies Record<MaritalStatus, string>;

type GetMaritalStatusProps = {
  maritalStatus?: MaritalStatus | null;
  t?: TFunction;
};

export const getMaritalStatus = ({
  maritalStatus,
  t = translator,
}: GetMaritalStatusProps) => {
  return maritalStatus
    ? capitalizeWords(t(MARITAL_STATUS_LABEL[maritalStatus]))
    : "-";
};

// ==================== RELATIONSHIP ====================
const RELATIONSHIP_LABEL = {
  FATHER: "enums.relationship.father",
  MOTHER: "enums.relationship.mother",
  HUSBAND: "enums.relationship.husband",
  WIFE: "enums.relationship.wife",
  CHILD: "enums.relationship.child",
  SIBLING: "enums.relationship.sibling",
  GRANDFATHER: "enums.relationship.grandfather",
  GRANDMOTHER: "enums.relationship.grandmother",
  UNCLE: "enums.relationship.uncle",
  AUNT: "enums.relationship.aunt",
  COUSIN: "enums.relationship.cousin",
  GUARDIAN: "enums.relationship.guardian",
  OTHER: "enums.relationship.other",
} as const satisfies Record<Relationship, string>;

type GetRelationshipProps = {
  relationship?: Relationship | null;
  t?: TFunction;
};

export const getRelationship = ({
  relationship,
  t = translator,
}: GetRelationshipProps) => {
  return relationship
    ? capitalizeWords(t(RELATIONSHIP_LABEL[relationship]))
    : "-";
};

// ==================== THEME ====================
const THEME_LABEL = {
  LIGHT: "enums.theme.light",
  DARK: "enums.theme.dark",
  SYSTEM: "enums.theme.system",
} as const satisfies Record<Theme, string>;

type GetThemeProps = {
  theme?: Theme | null;
  t?: TFunction;
};

export const getTheme = ({ theme, t = translator }: GetThemeProps) => {
  return theme ? capitalizeWords(t(THEME_LABEL[theme])) : "-";
};

// ==================== LANGUAGE ====================
const LANGUAGE_LABEL = {
  EN: "enums.language.en",
  ID: "enums.language.id",
} as const satisfies Record<Language, string>;

type GetLanguageProps = {
  language?: Language | null;
  t?: TFunction;
};

export const getLanguage = ({ language, t = translator }: GetLanguageProps) => {
  return language ? capitalizeWords(t(LANGUAGE_LABEL[language])) : "-";
};

// ==================== LOAN TYPE ====================
const LOAN_TYPE_LABEL = {
  PERSONAL: "enums.loanType.personal",
  MORTGAGE: "enums.loanType.mortgage",
  VEHICLE: "enums.loanType.vehicle",
  BUSINESS: "enums.loanType.business",
  MULTIPURPOSE: "enums.loanType.multipurpose",
} as const satisfies Record<LoanType, string>;

type GetLoanTypeProps = {
  loanType?: LoanType | null;
  t?: TFunction;
};

export const getLoanType = ({ loanType, t = translator }: GetLoanTypeProps) => {
  return loanType ? capitalizeWords(t(LOAN_TYPE_LABEL[loanType])) : "-";
};

// ==================== APPLICATION STATUS ====================
const APPLICATION_STATUS_LABEL = {
  DRAFT: "enums.applicationStatus.draft",
  SUBMITTED: "enums.applicationStatus.submitted",
  REVIEWING: "enums.applicationStatus.reviewing",
  APPROVED: "enums.applicationStatus.approved",
  REJECTED: "enums.applicationStatus.rejected",
  DISBURSED: "enums.applicationStatus.disbursed",
  CANCELLED: "enums.applicationStatus.cancelled",
} as const satisfies Record<ApplicationStatus, string>;

type GetApplicationStatusProps = {
  applicationStatus?: ApplicationStatus | null;
  t?: TFunction;
};

export const getApplicationStatus = ({
  applicationStatus,
  t = translator,
}: GetApplicationStatusProps) => {
  return applicationStatus
    ? capitalizeWords(t(APPLICATION_STATUS_LABEL[applicationStatus]))
    : "-";
};

// ==================== CREDIT SCORE ====================
const CREDIT_SCORE_LABEL = {
  ELIGIBLE: "enums.creditScore.eligible",
  NOT_ELIGIBLE: "enums.creditScore.notEligible",
} as const satisfies Record<CreditScore, string>;

type GetCreditScoreProps = {
  creditScore?: CreditScore | null;
  t?: TFunction;
};

export const getCreditScore = ({
  creditScore,
  t = translator,
}: GetCreditScoreProps) => {
  return creditScore
    ? capitalizeWords(t(CREDIT_SCORE_LABEL[creditScore]))
    : "-";
};

// ==================== LOAN STATUS ====================
const LOAN_STATUS_LABEL = {
  ACTIVE: "enums.loanStatus.active",
  COMPLETED: "enums.loanStatus.completed",
  OVERDUE: "enums.loanStatus.overdue",
  DEFAULT: "enums.loanStatus.default",
} as const satisfies Record<LoanStatus, string>;

type GetLoanStatusProps = {
  loanStatus?: LoanStatus | null;
  t?: TFunction;
};

export const getLoanStatus = ({
  loanStatus,
  t = translator,
}: GetLoanStatusProps) => {
  return loanStatus ? capitalizeWords(t(LOAN_STATUS_LABEL[loanStatus])) : "-";
};

// ==================== PAYMENT STATUS ====================
const PAYMENT_STATUS_LABEL = {
  ON_TIME: "enums.paymentStatus.onTime",
  LATE: "enums.paymentStatus.late",
  PENDING: "enums.paymentStatus.pending",
} as const satisfies Record<PaymentStatus, string>;

type GetPaymentStatusProps = {
  paymentStatus?: PaymentStatus | null;
  t?: TFunction;
};

export const getPaymentStatus = ({
  paymentStatus,
  t = translator,
}: GetPaymentStatusProps) => {
  return paymentStatus
    ? capitalizeWords(t(PAYMENT_STATUS_LABEL[paymentStatus]))
    : "-";
};

// ==================== REPORT TYPE ====================
const REPORT_TYPE_LABEL = {
  DAILY: "enums.reportType.daily",
  WEEKLY: "enums.reportType.weekly",
  MONTHLY: "enums.reportType.monthly",
  QUARTERLY: "enums.reportType.quarterly",
  YEARLY: "enums.reportType.yearly",
  CUSTOM: "enums.reportType.custom",
} as const satisfies Record<ReportType, string>;

type GetReportTypeProps = {
  reportType?: ReportType | null;
  t?: TFunction;
};

export const getReportType = ({
  reportType,
  t = translator,
}: GetReportTypeProps) => {
  return reportType ? capitalizeWords(t(REPORT_TYPE_LABEL[reportType])) : "-";
};

// ==================== NOTIFICATION TYPE ====================
const NOTIFICATION_TYPE_LABEL = {
  SYSTEM: "enums.notificationType.system",
  PERSONAL: "enums.notificationType.personal",
} as const satisfies Record<NotificationType, string>;

type GetNotificationTypeProps = {
  notificationType?: NotificationType | null;
  t?: TFunction;
};

export const getNotificationType = ({
  notificationType,
  t = translator,
}: GetNotificationTypeProps) => {
  return notificationType
    ? capitalizeWords(t(NOTIFICATION_TYPE_LABEL[notificationType]))
    : "-";
};

// ==================== NOTIFICATION PRIORITY ====================
const NOTIFICATION_PRIORITY_LABEL = {
  LOW: "enums.notificationPriority.low",
  NORMAL: "enums.notificationPriority.normal",
  HIGH: "enums.notificationPriority.high",
  URGENT: "enums.notificationPriority.urgent",
} as const satisfies Record<NotificationPriority, string>;

type GetNotificationPriorityProps = {
  notificationPriority?: NotificationPriority | null;
  t?: TFunction;
};

export const getNotificationPriority = ({
  notificationPriority,
  t = translator,
}: GetNotificationPriorityProps) => {
  return notificationPriority
    ? capitalizeWords(t(NOTIFICATION_PRIORITY_LABEL[notificationPriority]))
    : "-";
};

// ==================== QUESTION TYPE ====================
const QUESTION_TYPE_LABEL = {
  SINGLE_CHOICE: "enums.questionType.singleChoice",
  MULTIPLE_CHOICE: "enums.questionType.multipleChoice",
  YES_NO: "enums.questionType.yesNo",
  TRUE_FALSE: "enums.questionType.trueFalse",
  RATING: "enums.questionType.rating",
  SCALE: "enums.questionType.scale",
  PERCENTAGE: "enums.questionType.percentage",
} as const satisfies Record<QuestionType, string>;

type GetQuestionTypeProps = {
  questionType?: QuestionType | null;
  t?: TFunction;
};

export const getQuestionType = ({
  questionType,
  t = translator,
}: GetQuestionTypeProps) => {
  return questionType
    ? capitalizeWords(t(QUESTION_TYPE_LABEL[questionType]))
    : "-";
};

// ==================== QUESTION CATEGORY ====================
const QUESTION_CATEGORY_LABEL = {
  PERSONAL: "enums.questionCategory.personal",
  IDENTITY: "enums.questionCategory.identity",
  CONTACT: "enums.questionCategory.contact",
  ADDRESS: "enums.questionCategory.address",
  EMPLOYMENT: "enums.questionCategory.employment",
  INCOME: "enums.questionCategory.income",
  EXPENSE: "enums.questionCategory.expense",
  FINANCIAL: "enums.questionCategory.financial",
  BUSINESS: "enums.questionCategory.business",
  COLLATERAL: "enums.questionCategory.collateral",
  REFERENCE: "enums.questionCategory.reference",
  EMERGENCY: "enums.questionCategory.emergency",
  EDUCATION: "enums.questionCategory.education",
  FAMILY: "enums.questionCategory.family",
  LOAN_PURPOSE: "enums.questionCategory.loanPurpose",
  CREDIT_HISTORY: "enums.questionCategory.creditHistory",
  ASSETS: "enums.questionCategory.assets",
  LIABILITIES: "enums.questionCategory.liabilities",
  BANK_ACCOUNT: "enums.questionCategory.bankAccount",
  OTHER: "enums.questionCategory.other",
} as const satisfies Record<QuestionCategory, string>;

type GetQuestionCategoryProps = {
  questionCategory?: QuestionCategory | null;
  t?: TFunction;
};

export const getQuestionCategory = ({
  questionCategory,
  t = translator,
}: GetQuestionCategoryProps) => {
  return questionCategory
    ? capitalizeWords(t(QUESTION_CATEGORY_LABEL[questionCategory]))
    : "-";
};
