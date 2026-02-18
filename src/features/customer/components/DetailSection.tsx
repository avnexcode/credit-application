import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { icons } from "lucide-react";
import React from "react";

type DetailSectionProps = {
  title: string;
  icon?: keyof typeof icons;
  children: React.ReactNode;
};

export const DetailSection = ({
  title,
  icon,
  children,
}: DetailSectionProps) => {
  return (
    <Card className="bg-card border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base capitalize">{title}</CardTitle>
        {icon && (
          <Icon name={icon} size={20} className="text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">{children}</div>
      </CardContent>
    </Card>
  );
};
