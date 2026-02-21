import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateCustomerFormSchema } from "../schemas";
import type { CustomerResponse, UpdateCustomerFormSchema } from "../types";

export const useUpdateCustomer = (
  customer: CustomerResponse,
): MutateFunctionReturn<UpdateCustomerFormSchema> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/customer`;
  const router = useRouter();
  const { t } = useTranslation();
  const [hasCustomerChanges, setHasCustomerChanges] = useState(false);
  const [initialData, setInitialData] =
    useState<UpdateCustomerFormSchema | null>(null);

  const form = useForm<UpdateCustomerFormSchema>({
    defaultValues: {
      fullName: customer?.fullName,
      nationalId: customer?.nationalId,
      birthPlace: customer?.birthPlace,
      birthDate: customer?.birthDate ?? new Date(),
      gender: customer?.gender,
      age: String(customer?.age),
      phone: customer?.phone,
      email: customer?.email,
      address: customer?.address,
      maritalStatus: customer?.maritalStatus,
      employmentType: customer?.employmentType,
      employmentName: customer?.employmentName,
      employmentPeriod: String(customer?.employmentPeriod),
    } satisfies DefaultValues<UpdateCustomerFormSchema>,
    resolver: zodResolver(updateCustomerFormSchema(t)),
  });

  useEffect(() => {
    const initCustomerValues = {
      fullName: customer?.fullName,
      nationalId: customer?.nationalId,
      birthPlace: customer?.birthPlace,
      birthDate: customer?.birthDate ?? new Date(),
      gender: customer?.gender,
      age: String(customer?.age),
      phone: customer?.phone,
      email: customer?.email,
      address: customer?.address,
      maritalStatus: customer?.maritalStatus,
      employmentType: customer?.employmentType,
      employmentName: customer?.employmentName,
      employmentPeriod: String(customer?.employmentPeriod),
    };

    setInitialData(initCustomerValues);
    form.reset(initCustomerValues);
  }, [customer, form]);

  const watchedValues = form.watch();

  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasCustomerChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiCustomerUtils = api.useUtils().customer;

  const { mutate: updateCustomer, isPending: isUpdateCustomerPending } =
    api.customer.update.useMutation({
      onSuccess: () => {
        form.reset();
        void apiCustomerUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.update", {
              field: t("models.customer.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.update", {
                field: t("models.customer.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = (values: UpdateCustomerFormSchema) => {
    updateCustomer({
      id: customer.id,
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
    hasChanges: hasCustomerChanges,
    isPending: isUpdateCustomerPending,
    defaultUrl,
  };
};
