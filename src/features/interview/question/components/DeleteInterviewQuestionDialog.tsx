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

type DeleteInterviewQuestionDialogProps = {
  onDelete: () => void;
  isPending: boolean;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
};

export const DeleteInterviewQuestionDialog = ({
  onDelete,
  isPending,
  setIsOpen,
  isOpen,
}: DeleteInterviewQuestionDialogProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("components.deleteDialog.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("components.deleteDialog.description", {
              model: t("models.interviewQuestion.title"),
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-5">
          <AlertDialogAction
            onClick={onDelete}
            variant={"destructive"}
            className="px-10"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 />
                {t("components.deleteDialog.deleteButtonLoading")}
              </>
            ) : (
              t("components.deleteDialog.deleteButton")
            )}
          </AlertDialogAction>
          <AlertDialogCancel className="px-10">
            {t("components.deleteDialog.cancelButton")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
