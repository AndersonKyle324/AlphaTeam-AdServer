import React from "react";
import styled from "styled-components";
import { useSortBy, useTable, useGroupBy, useExpanded } from "react-table";

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
  } = useTable({ columns, data }, useGroupBy, useExpanded)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    {column.isGrouped ? '🛑' : '👊'}
                  </span>
                ) : null }
                {column.render("Header")}
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
                return (
                  <td 
                    {...cell.getCellProps()}
                    style={{
                        background: cell.isGrouped
                          ? '#0aff0082'
                          : cell.isAggregated
                          ? '#ffa50078'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                    }}
                  >
                    {cell.isGrouped ? (
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? '👇' : '👉'}
                        </span>{' '}
                        {cell.render('Cell')} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : (
                      cell.render('Cell')
                    )}
                  </td>
                )
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
        Header: "Campaign",
        accessor: "campaign",
      },
      {
        Header: "Impressions",
        accessor: "impressions",
        aggregate: "sum",
        Aggregated: ({ value }) => `${value} (total)`
      },
      {
        Header: "Clicks",
        accessor: "clicks",
        aggregate: "sum",
        Aggregated: ({ value }) => `${value} (total)`
      },
      {
        Header: "Conversions",
        accessor: "conversions",
        aggregate: "sum",
        Aggregated: ({ value }) => `${value} (total)`
      },
      {
        Header: "Ad Name",
        accessor: "adName",
      },
      {
        Header: "Ad Size",
        accessor: "adSize",
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
        adName: "SwitchItUp",
        adSize: "Small",
        campaign: "Nintendo Switch",
        lastModified: "10-10-2020",
        impressions: 100,
        clicks: 10,
        conversions: 1,
      },
      {
        adName: "Apples4U",
        adSize: "Medium",
        campaign: "Apples",
        lastModified: "10-10-2020",
        impressions: 2000,
        clicks: 300,
        conversions: 50,
      },
      {
        adName: "OrangesRCool",
        adSize: "Large",
        campaign: "Oranges",
        lastModified: "10-10-2020",
        impressions: 10,
        clicks: 0,
        conversions: 0,
      },
      {
        adName: "BigSwitch",
        adSize: "Large",
        campaign: "Nintendo Switch",
        lastModified: "01-21-2020",
        impressions: 400,
        clicks: 300,
        conversions: 290,
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
