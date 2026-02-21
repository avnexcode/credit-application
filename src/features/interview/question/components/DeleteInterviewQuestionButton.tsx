import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { DeleteInterviewQuestionDialog } from "./DeleteInterviewQuestionDialog";
import { useDeleteInterviewQuestion } from "../hooks";

type DeleteInterviewQuestionButtonProps = {
  interviewQuestionId: string;
};

export const DeleteInterviewQuestionButton = ({
  interviewQuestionId,
}: DeleteInterviewQuestionButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { onDelete, isPending } = useDeleteInterviewQuestion();

  const handleDelete = () => {
    onDelete({ id: interviewQuestionId });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="default"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        {t("pages.interviewQuestion.detail.deleteButton")}
      </Button>
      <DeleteInterviewQuestionDialog
        onDelete={handleDelete}
        isPending={isPending}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
