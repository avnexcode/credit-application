import { capitalizeWords } from "@/utils";
import type { Gender, MaritalStatus } from "@prisma";
import { t as translator, type TFunction } from "i18next";

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
