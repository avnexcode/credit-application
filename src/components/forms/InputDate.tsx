import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import { id, enUS } from "date-fns/locale";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Icon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";

type InputDateProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
};

export const InputDate = <T extends FieldValues>({
  name,
  label,
  required,
  className,
}: InputDateProps<T>) => {
  const { t } = useTranslation();
  const form = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const dateValue =
          (field.value as any) instanceof Date && isValid(field.value as any)
            ? (field.value as Date)
            : undefined;

        return (
          <Field data-invalid={fieldState.invalid} className={cn(className)}>
            <FieldLabel htmlFor={field.name} className="capitalize">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={field.name}
                  variant="outline"
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateValue && "text-muted-foreground",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                >
                  <Icon name="Calendar" className="mr-2 h-4 w-4 shrink-0" />
                  {dateValue
                    ? format(dateValue, "dd/MM/yyyy", { locale: id })
                    : t("forms.placeholders.select", { field: label })}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={(date) => field.onChange(date ?? null)}
                  captionLayout="dropdown"
                  locale={enUS}
                />
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export const InputDateSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
};
