import { useState } from "react";
import styles from "./DataTable.module.css";
import DataPaginationClient from "../DataPaginationClient";

function DataTableClient({
  columns,
  data,
  isFetching = false,
  skeleton,
  emptyMessage = "No records found",
  getRowClass,
}) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentItems = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHead}>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              Array.from({ length: 3 }).map(() => skeleton) || (
                <tr>
                  <td colSpan={columns.length}>Loading...</td>
                </tr>
              )
            ) : currentItems?.length > 0 ? (
              currentItems.map((row, index) => (
                <tr
                  key={row._id || index}
                  className={
                    getRowClass
                      ? getRowClass(row, index)
                      : index % 2 === 0
                      ? styles.tableRowEven
                      : styles.tableRowOdd
                  }
                >
                  {columns.map((col) => (
                    <td key={col.key} className={styles.tableCell}>
                      {col.render ? col.render(row, index) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-[10px]" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataPaginationClient
        totalPages={totalPages}
        totalDocs={0}
        page={page}
        pageSize={1}
        onPageChange={setPage}
        showTotal={false}
      />
    </>
  );
}

export default DataTableClient;
