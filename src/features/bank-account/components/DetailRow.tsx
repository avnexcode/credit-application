import { cn } from "@/lib/utils";

type DetailRowProps = {
  label: string;
  value?: string | React.ReactNode;
  className?: string;
};

export const DetailRow = ({ label, value, className }: DetailRowProps) => {
  return (
    <div className={cn("flex flex-col gap-2 py-3", className)}>
      <p className="text-muted-foreground text-xs font-medium uppercase">
        {label}
      </p>
      <p className="text-sm font-medium capitalize">{value || "-"}</p>
    </div>
  );
};
