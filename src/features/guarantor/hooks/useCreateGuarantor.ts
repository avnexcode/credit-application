import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createGuarantorFormSchema } from "../schemas";
import type { CreateGuarantorFormSchema } from "../types";

export const useCreateGuarantor =
  (): MutateFunctionReturn<CreateGuarantorFormSchema> => {
    const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/guarantor`;
    const router = useRouter();
    const { t } = useTranslation();

    const form = useForm<CreateGuarantorFormSchema>({
      defaultValues: {
        fullName: "",
        nationalId: "",
        birthPlace: "",
        birthDate: new Date(),
        gender: "MALE",
        age: "",
        phone: "",
        email: "",
        address: "",
        maritalStatus: "SINGLE",
        employmentType: "UNEMPLOYED",
        employmentName: "",
        employmentPeriod: "",
        relationship: "OTHER",
      } satisfies DefaultValues<CreateGuarantorFormSchema>,
      resolver: zodResolver(createGuarantorFormSchema(t)),
    });

    const apiGuarantorUtils = api.useUtils().guarantor;

    const { mutate: createGuarantor, isPending: isCreateGuarantorPending } =
      api.guarantor.create.useMutation({
        onSuccess: () => {
          form.reset();
          void apiGuarantorUtils.getAll.invalidate();
          void router.push(defaultUrl);
          toast.success(
            capitalizeSentence(
              t("successes.message.create", {
                field: t("models.guarantor.title"),
              }),
            ),
          );
        },
        onError: (error) => {
          toast.success(
            error.message ||
              capitalizeSentence(
                t("errors.messages.create", {
                  field: t("models.guarantor.title"),
                }),
              ),
          );
        },
      });

    const onSubmit = (values: CreateGuarantorFormSchema) => {
      createGuarantor({
        request: {
          ...values,
          age: Number(values.age),
          employmentPeriod: Number(values.employmentPeriod),
        },
      });
    };

    return { form, onSubmit, isPending: isCreateGuarantorPending, defaultUrl };
  };
