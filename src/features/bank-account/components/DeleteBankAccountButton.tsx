import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteBankAccountDialog } from "./DeleteBankAccountDialog";
import { useDeleteBankAccount } from "../hooks";

type DeleteBankAccountButtonProps = {
  bankAccountId: string;
};

export const DeleteBankAccountButton = ({
  bankAccountId,
}: DeleteBankAccountButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { onDelete, isPending } = useDeleteBankAccount();

  const handleDelete = () => {
    onDelete({ id: bankAccountId });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        {t("pages.bankAccount.detail.deleteButton")}
      </Button>
      <DeleteBankAccountDialog
        onDelete={handleDelete}
        isPending={isPending}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
