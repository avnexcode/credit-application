import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { InterviewQuestionResponse } from "../types";

type InterviewQuestionDetailCardProps = {
  interviewQuestion: InterviewQuestionResponse;
};

export const InterviewQuestionDetailCard = ({
  interviewQuestion,
}: InterviewQuestionDetailCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full border-0 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500/20">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col justify-between">
              <Heading size="h2" className="line-clamp-2">
                {interviewQuestion.questionText}
              </Heading>
              <p className="text-muted-foreground text-sm">
                {t("models.interviewQuestion.fields.orderNumber")}:{" "}
                {interviewQuestion.orderNumber}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-2">
          {interviewQuestion.questionType && (
            <Badge variant="secondary" className="capitalize">
              {t(
                `enums.questionType.${interviewQuestion.questionType.toLowerCase()}` as any,
              )}
            </Badge>
          )}
          {interviewQuestion.category && (
            <Badge variant="secondary" className="capitalize">
              {t(
                `enums.questionCategory.${interviewQuestion.category.toLowerCase()}` as any,
              )}
            </Badge>
          )}
          <Badge
            variant={interviewQuestion.isRequired ? "default" : "outline"}
            className="capitalize"
          >
            {interviewQuestion.isRequired
              ? t("common.required")
              : t("common.optional")}
          </Badge>
          <Badge
            variant={interviewQuestion.isActive ? "default" : "secondary"}
            className="capitalize"
          >
            {interviewQuestion.isActive
              ? t("common.active")
              : t("common.inactive")}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};
