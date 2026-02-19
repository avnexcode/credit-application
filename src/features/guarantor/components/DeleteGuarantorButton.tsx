import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { DeleteGuarantorDialog } from "./DeleteGuarantorDialog";
import { useDeleteGuarantor } from "../hooks";

type DeleteGuarantorButtonProps = {
  guarantorId: string;
};

export const DeleteGuarantorButton = ({
  guarantorId,
}: DeleteGuarantorButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { onDelete, isPending } = useDeleteGuarantor();

  const handleDelete = () => {
    onDelete({ id: guarantorId });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        {t("pages.guarantor.detail.deleteButton")}
      </Button>
      <DeleteGuarantorDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={handleDelete}
        isPending={isPending}
      />
    </>
  );
};
