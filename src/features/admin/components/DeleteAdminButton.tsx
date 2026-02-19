import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { DeleteAdminDialog } from "./DeleteAdminDialog";
import { useDeleteAdmin } from "../hooks";

type DeleteAdminButtonProps = {
  adminId: string;
};

export const DeleteAdminButton = ({ adminId }: DeleteAdminButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { onDelete, isPending } = useDeleteAdmin();

  const handleDelete = () => {
    onDelete({ id: adminId });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        {t("pages.admin.detail.deleteButton")}
      </Button>
      <DeleteAdminDialog
        onDelete={handleDelete}
        isPending={isPending}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
