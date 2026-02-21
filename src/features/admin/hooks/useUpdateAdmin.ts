import { env } from "@/configs/env";
import type { MutateFunctionReturn } from "@/interfaces";
import { api, capitalizeSentence } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateAdminFormSchema } from "../schemas";
import type { AdminResponse, UpdateAdminFormSchema } from "../types";

export const useUpdateAdmin = (
  admin: AdminResponse,
): MutateFunctionReturn<UpdateAdminFormSchema> => {
  const defaultUrl = `${env.NEXT_PUBLIC_BASE_URL}/dashboard/admin`;
  const router = useRouter();
  const { t } = useTranslation();
  const [hasAdminChanges, setHasAdminChanges] = useState(false);
  const [initialData, setInitialData] = useState<UpdateAdminFormSchema | null>(
    null,
  );

  const form = useForm<UpdateAdminFormSchema>({
    defaultValues: {
      fullName: admin?.fullName,
      nationalId: admin?.nationalId,
      birthPlace: admin?.birthPlace,
      birthDate: admin?.birthDate ?? new Date(),
      gender: admin?.gender,
      age: String(admin?.age),
      phone: admin?.phone,
      email: admin?.email,
      address: admin?.address,
      maritalStatus: admin?.maritalStatus,
    } satisfies DefaultValues<UpdateAdminFormSchema>,
    resolver: zodResolver(updateAdminFormSchema(t)),
  });

  useEffect(() => {
    const initAdminValues = {
      fullName: admin?.fullName,
      nationalId: admin?.nationalId,
      birthPlace: admin?.birthPlace,
      birthDate: admin?.birthDate ?? new Date(),
      gender: admin?.gender,
      age: String(admin?.age),
      phone: admin?.phone,
      email: admin?.email,
      address: admin?.address,
      maritalStatus: admin?.maritalStatus,
    };

    setInitialData(initAdminValues);
    form.reset(initAdminValues);
  }, [admin, form]);

  const watchedValues = form.watch();

  useEffect(() => {
    if (initialData) {
      const hasChanges =
        JSON.stringify(watchedValues) !== JSON.stringify(initialData);
      setHasAdminChanges(hasChanges);
    }
  }, [watchedValues, initialData]);

  const apiAdminUtils = api.useUtils().admin;

  const { mutate: updateAdmin, isPending: isUpdateAdminPending } =
    api.admin.update.useMutation({
      onSuccess: () => {
        form.reset();
        void apiAdminUtils.getAll.invalidate();
        void router.push(defaultUrl);
        toast.success(
          capitalizeSentence(
            t("successes.message.update", {
              field: t("models.admin.title"),
            }),
          ),
        );
      },
      onError: (error) => {
        toast.success(
          error.message ||
            capitalizeSentence(
              t("errors.messages.update", {
                field: t("models.admin.title"),
              }),
            ),
        );
      },
    });

  const onSubmit = (values: UpdateAdminFormSchema) => {
    updateAdmin({
      id: admin.id,
      request: {
        ...values,
        age: Number(values.age),
      },
    });
  };

  return {
    form,
    onSubmit,
    hasChanges: hasAdminChanges,
    isPending: isUpdateAdminPending,
    defaultUrl,
  };
};
