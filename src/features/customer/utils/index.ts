import { capitalizeWords } from "@/utils";
import type { EmploymentType, Gender, MaritalStatus } from "@prisma";
import { t as translator, type TFunction } from "i18next";

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

const GENDER_LABEL = {
  MALE: "enums.gender.male",
  FEMALE: "enums.gender.female",
} as const satisfies Record<Gender, string>;

const MARITAL_STATUS_LABEL = {
  SINGLE: "enums.maritalStatus.single",
  MARRIED: "enums.maritalStatus.married",
  DIVORCED: "enums.maritalStatus.divorced",
  WIDOWED: "enums.maritalStatus.widowed",
} as const satisfies Record<MaritalStatus, string>;

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

type GetGenderProps = {
  gender?: Gender | null;
  t?: TFunction;
};

export const getGender = ({ gender, t = translator }: GetGenderProps) => {
  return gender ? capitalizeWords(t(GENDER_LABEL[gender])) : "-";
};

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
