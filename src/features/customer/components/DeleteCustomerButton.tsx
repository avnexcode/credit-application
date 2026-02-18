import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { DeleteCustomerDialog } from "./DeleteCustomerDialog";
import { useDeleteCustomer } from "../hooks";

type DeleteCustomerButtonProps = {
  customerId: string;
};

export const DeleteCustomerButton = ({
  customerId,
}: DeleteCustomerButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { onDelete, isPending } = useDeleteCustomer();

  const handleDelete = () => {
    onDelete({ id: customerId });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        {t("pages.customer.detail.deleteButton")}
      </Button>
      <DeleteCustomerDialog
        onDelete={handleDelete}
        isPending={isPending}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
