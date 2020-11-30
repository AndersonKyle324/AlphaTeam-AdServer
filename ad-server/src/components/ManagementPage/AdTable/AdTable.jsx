import React from "react";
import styled from "styled-components";
import { useSortBy, useTable } from "react-table";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function AdTable({ show }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Ad Name",
        accessor: "adName",
      },
      {
        Header: "Ad Size",
        accessor: "adSize",
      },
      {
        Header: "Campaign",
        accessor: "campaign",
      },
      {
        Header: "Last Modified",
        accessor: "lastModified",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        adName: "Hello",
        adSize: "World",
        campaign: "Nintendo Switch",
        lastModified: "10-10-2020",
      },
      {
        adName: "this",
        adSize: "works",
        campaign: "Nintendo Switch",
        lastModified: "10-10-2020",
      },
      {
        adName: "whatever",
        adSize: "you want",
        campaign: "Nintendo Switch",
        lastModified: "10-10-2020",
      },
    ],
    []
  );

  return (
    <Styles
      style={{
        display: show ? "block" : "none",
      }}
    >
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default AdTable;
