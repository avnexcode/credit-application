import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createCustomerFormSchema } from "../schemas";
import type { CreateCustomerFormSchema } from "../types";

export const useCreateCustomer =
  (): MutateFunctionReturn<CreateCustomerFormSchema> => {
    const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/customer`;
    const router = useRouter();
    const { t } = useTranslation();

    const form = useForm<CreateCustomerFormSchema>({
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
      } satisfies DefaultValues<CreateCustomerFormSchema>,
      resolver: zodResolver(createCustomerFormSchema(t)),
    });

    const apiCustomerUtils = api.useUtils().customer;

    const { mutate: createCustomer, isPending: isCreateCustomerPending } =
      api.customer.create.useMutation({
        onSuccess: () => {
          form.reset();
          void apiCustomerUtils.getAll.invalidate();
          void router.push(defaultUrl);
          toast.success(
            capitalizeSentence(
              t("successes.message.create", {
                field: t("models.customer.title"),
              }),
            ),
          );
        },
        onError: (error) => {
          toast.success(
            error.message ||
              capitalizeSentence(
                t("errors.messages.create", {
                  field: t("models.customer.title"),
                }),
              ),
          );
        },
      });

    const onSubmit = (values: CreateCustomerFormSchema) => {
      createCustomer({
        request: {
          ...values,
          age: Number(values.age),
          employmentPeriod: Number(values.employmentPeriod),
        },
      });
    };

    return { form, onSubmit, isPending: isCreateCustomerPending, defaultUrl };
  };
