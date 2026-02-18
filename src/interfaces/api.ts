import type { UseFormReturn } from "react-hook-form";

export interface QueryResponse<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    page: number;
    lastPage: number;
  };
}

export interface MutateFunctionReturn<
  TFormValues extends Record<string, unknown>,
> {
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  hasChanges?: boolean;
  isPending: boolean;
  defaultUrl: string;
}

export interface QueryFunctionReturn {
  data: [];
  isLoading: boolean;
  defaultUrl: string;
}

export interface DeleteFunctionReturn<T> {
  onDelete: (values: T) => void;
  isPending: boolean;
  defaultUrl: string;
}
