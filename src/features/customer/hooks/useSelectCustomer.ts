import { useSelectParams } from "@/hooks";
import { api } from "@/utils";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

export const useSelectCustomer = <T extends FieldValues>(name: Path<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const ITEMS_PER_PAGE = 10;

  const {
    page,
    totalPages,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  } = useSelectParams({
    totalData: totalData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const form = useFormContext<T>();
  const selectedCustomerId = form.watch(name);

  const { data: selectedCustomer, isLoading: isSelectedCustomerLoading } =
    api.customer.getById.useQuery(
      { id: selectedCustomerId },
      {
        enabled: !!selectedCustomerId,
        staleTime: Infinity,
      },
    );

  const { data: customers, isLoading: isCustomersLoading } =
    api.customer.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: [{ id: "fullName", desc: false }],
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && customers && !isCustomersLoading) {
      setIsReady(true);
      setTotalData(customers.meta.total);
    }
  }, [form.control, customers, isCustomersLoading]);

  const allCustomers = customers?.data ?? [];
  const combinedCustomers = [...allCustomers];

  if (
    selectedCustomer &&
    !allCustomers.some((customer) => customer.id === selectedCustomer.id)
  ) {
    combinedCustomers.unshift(selectedCustomer);
  }

  return {
    form,
    selectedCustomer,
    combinedCustomers,
    page,
    totalPages,
    searchTerm,
    isReady,
    isCustomersLoading,
    isSelectedCustomerLoading,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  };
};
