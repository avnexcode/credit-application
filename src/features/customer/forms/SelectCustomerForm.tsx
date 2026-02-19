import { SelectPagination, SelectSearch } from "@/components/forms";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { capitalizeWords } from "@/utils";
import { renderElements } from "@/utils/render-elements";
import { Loader2 } from "lucide-react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useSelectCustomer } from "../hooks";

type SelectCustomerFormProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export const SelectCustomerForm = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
}: SelectCustomerFormProps<T>) => {
  const {
    page,
    selectedCustomer,
    isReady,
    totalPages,
    searchTerm,
    isCustomersLoading,
    form,
    combinedCustomers,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
    isSelectedCustomerLoading,
  } = useSelectCustomer<T>(name);

  if (!isReady) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn("w-full", className)}
        >
          <FieldLabel htmlFor={field.name} className="capitalize">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ""}
            defaultValue={field.value}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={`Pilih ${label.toLowerCase()}`}>
                {capitalizeWords(selectedCustomer?.fullName ?? "") ??
                  `Pilih ${label.toLowerCase()}`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-(--radix-select-trigger-width)">
              <SelectSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isCustomersLoading || isSelectedCustomerLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedCustomers,
                    keyExtractor: (customer) => customer.id,
                    render: (customer) => (
                      <SelectItem
                        key={customer.id}
                        value={customer.id}
                        className="capitalize"
                      >
                        {customer.fullName}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        Tidak ada data kategori tersedia
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isCustomersLoading}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
