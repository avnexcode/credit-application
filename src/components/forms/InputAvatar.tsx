import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

type InputAvatarprops<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
  image?: string | null;
  defaultImage: string;
};

export const InputAvatar = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
  image,
  defaultImage,
}: InputAvatarprops<T>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const selectedImage = form.watch(name);

  const selectedImagePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return null;
  }, [selectedImage]);
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(className)}>
          <FieldLabel htmlFor={field.name} className="capitalize">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>

          {/* Preview Gambar */}
          <div className="aspect-square w-full overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImagePreview ?? image ?? defaultImage}
              alt="image-preview"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Tombol Pilih/Ganti File */}
          <div className="flex flex-col items-center justify-center gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleOpenFileExplorer}
              className="px-10"
            >
              {!!selectedImage
                ? t("forms.actions.changeFile")
                : t("forms.actions.chooseFile")}
            </Button>

            {selectedImage && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => form.resetField(name)}
                className="px-10"
              >
                {t("forms.actions.removeFile")}
              </Button>
            )}
          </div>

          {/* Input File Tersembunyi */}
          <input
            id={field.name}
            type="file"
            accept="image/*"
            ref={inputFileRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              field.onChange(file);
            }}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

type InputAvatarSkeletonProps = {
  withRemoveButton?: boolean;
};

export const InputAvatarSkeleton = ({
  withRemoveButton = false,
}: InputAvatarSkeletonProps = {}) => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="aspect-square w-full rounded-full" />
      <div className="flex flex-col items-center justify-center gap-2">
        <Skeleton className="h-9 w-32" />
        {withRemoveButton && <Skeleton className="h-9 w-32" />}
      </div>
    </div>
  );
};
