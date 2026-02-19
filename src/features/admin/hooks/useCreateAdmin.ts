import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createAdminFormSchema } from "../schemas";
import type { CreateAdminFormSchema } from "../types";

export const useCreateAdmin =
  (): MutateFunctionReturn<CreateAdminFormSchema> => {
    const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin`;
    const router = useRouter();
    const { t } = useTranslation();

    const form = useForm<CreateAdminFormSchema>({
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
      } satisfies DefaultValues<CreateAdminFormSchema>,
      resolver: zodResolver(createAdminFormSchema(t)),
    });

    const apiAdminUtils = api.useUtils().admin;

    const { mutate: createAdmin, isPending: isCreateAdminPending } =
      api.admin.create.useMutation({
        onSuccess: () => {
          form.reset();
          void apiAdminUtils.getAll.invalidate();
          void router.push(defaultUrl);
          toast.success(
            capitalizeSentence(
              t("successes.message.create", {
                field: t("models.admin.title"),
              }),
            ),
          );
        },
        onError: (error) => {
          toast.success(
            error.message ||
              capitalizeSentence(
                t("errors.messages.create", {
                  field: t("models.admin.title"),
                }),
              ),
          );
        },
      });

    const onSubmit = (values: CreateAdminFormSchema) => {
      createAdmin({
        request: {
          ...values,
          age: Number(values.age),
        },
      });
    };

    return { form, onSubmit, isPending: isCreateAdminPending, defaultUrl };
  };
