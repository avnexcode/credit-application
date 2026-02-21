import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TogglePasswordVisibility } from "@/features/auth/components";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";

type InputPasswordProps<T extends FieldValues> = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type"
> & {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
};

const InputPasswordInner = <T extends FieldValues>(
  { name, label, required, className, ...inputProps }: InputPasswordProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const form = useFormContext<T>();

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
          <div className="relative">
            <Input
              {...field}
              {...inputProps}
              ref={ref}
              id={field.name}
              type={isPasswordVisible ? "text" : "password"}
              aria-invalid={fieldState.invalid}
              value={field.value ?? ""}
              placeholder={
                inputProps.placeholder ??
                t("forms.placeholders.input", { field: label })
              }
            />
            <TogglePasswordVisibility
              isVisible={isPasswordVisible}
              setIsVisible={setIsPasswordVisible}
            />
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const InputPassword = forwardRef(InputPasswordInner) as <
  T extends FieldValues,
>(
  props: InputPasswordProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => React.ReactElement;

export const InputPasswordSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
};
