import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type DeleteCustomerDialogProps = {
  onDelete: () => void;
  isPending: boolean;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
};

export const DeleteCustomerDialog = ({
  onDelete,
  isPending,
  setIsOpen,
  isOpen,
}: DeleteCustomerDialogProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("components.customer.deleteDialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("components.customer.deleteDialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onDelete}
            variant={"destructive"}
            className="px-10"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 />
                {t("components.customer.deleteDialog.deleteButtonLoading")}
              </>
            ) : (
              t("components.customer.deleteDialog.deleteButton")
            )}
          </AlertDialogAction>
          <AlertDialogCancel className="px-10">
            {t("components.customer.deleteDialog.cancelButton")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
