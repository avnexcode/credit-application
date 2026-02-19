import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateGuarantorFormSchema } from "../schemas";
import type { GuarantorResponse, UpdateGuarantorFormSchema } from "../types";

export const useUpdateGuarantor = (
  guarantor: GuarantorResponse,
): MutateFunctionReturn<UpdateGuarantorFormSchema> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/guarantor`;
  const router = useRouter();
  const { t } = useTranslation();
  const [hasGuarantorChanges, setHasGuarantorChanges] = useState(false);
  const [initialData, setInitialData] =
    useState<UpdateGuarantorFormSchema | null>(null);

  const form = useForm<UpdateGuarantorFormSchema>({
    defaultValues: {
      fullName: guarantor?.fullName,
      nationalId: guarantor?.nationalId,
      birthPlace: guarantor?.birthPlace,
      birthDate: guarantor?.birthDate ?? new Date(),
      gender: guarantor?.gender,
      age: String(guarantor?.age),
      phone: guarantor?.phone,
      email: guarantor?.email,
      address: guarantor?.address,
      maritalStatus: guarantor?.maritalStatus,
      employmentType: guarantor?.employmentType,
      employmentName: guarantor?.employmentName,
      employmentPeriod: String(guarantor?.employmentPeriod),
      relationship: guarantor?.relationship,
      customerId: guarantor?.customerId,
    } satisfies DefaultValues<UpdateGuarantorFormSchema>,
    resolver: zodResolver(updateGuarantorFormSchema(t)),
  });

  useEffect(() => {
    const initGuarantorValues = {
      fullName: guarantor?.fullName,
      nationalId: guarantor?.nationalId,
      birthPlace: guarantor?.birthPlace,
      birthDate: guarantor?.birthDate ?? new Date(),
      gender: guarantor?.gender,
      age: String(guarantor?.age),
      phone: guarantor?.phone,
      email: guarantor?.email,
      address: guarantor?.address,
      maritalStatus: guarantor?.maritalStatus,
      employmentType: guarantor?.employmentType,
      employmentName: guarantor?.employmentName,
      employmentPeriod: String(guarantor?.employmentPeriod),
      relationship: guarantor?.relationship,
      customerId: guarantor?.customerId,
    };

    setInitialData(initGuarantorValues);
  }, [guarantor, form]);

  const watchedValues = form.watch();

  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasGuarantorChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiGuarantorUtils = api.useUtils().guarantor;

  const { mutate: updateGuarantor, isPending: isUpdateGuarantorPending } =
    api.guarantor.update.useMutation({
      onSuccess: () => {
        form.reset();
        void apiGuarantorUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.update", {
              field: t("models.guarantor.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.update", {
                field: t("models.guarantor.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = (values: UpdateGuarantorFormSchema) => {
    updateGuarantor({
      id: guarantor.id,
      request: {
        ...values,
        age: Number(values.age),
        employmentPeriod: Number(values.employmentPeriod),
      },
    });
  };

  return {
    form,
    onSubmit,
    hasChanges: hasGuarantorChanges,
    isPending: isUpdateGuarantorPending,
    defaultUrl,
  };
};
