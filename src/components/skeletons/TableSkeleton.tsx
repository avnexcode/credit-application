import { renderElements } from "@/utils";
import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export const TableCellSkeleton = () => {
  return <Skeleton className="h-4 w-full" />;
};

type TableBodySkeletonProps = {
  rowLength: number;
  cellLength: number;
};

export const TableBodySkeleton = ({
  rowLength,
  cellLength,
}: TableBodySkeletonProps) => {
  return renderElements({
    of: [...new Array<undefined>(rowLength)],
    keyExtractor: (_, index) => index,
    render: () => (
      <TableRow>
        {renderElements({
          of: [...new Array<undefined>(cellLength)],
          keyExtractor: (_, i) => i,
          render: () => {
            return (
              <TableCell className="py-4">
                <TableCellSkeleton />
              </TableCell>
            );
          },
        })}
      </TableRow>
    ),
  });
};
