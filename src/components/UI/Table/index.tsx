import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface GSTableProps {
  columns: Column[];
  rows: Row[];
}

const GSTable = ({ columns, rows }: GSTableProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const pages = Math.ceil(rows?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows?.slice(start, end);
  }, [page, rows]);

  const getKeyValue = (item: Row, columnKey: string) => item[columnKey];

  return (
    <Table
      isStriped
      aria-label="Dynamic Table with Pagination"
      bottomContent={
        rows?.length > rowsPerPage ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page: number) => setPage(page)}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No data to display."} items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GSTable;
