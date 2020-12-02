import React from "react";
import styled from "styled-components";
import { useSortBy, useTable, useGroupBy, useExpanded } from "react-table";
import axios from "axios";

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
  } = useTable({ columns, data }, useGroupBy, useSortBy, useExpanded)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    {column.isGrouped ? 'X ' : 'O '}
                  </span>
                ) : null }
                {column.render("Header")}
                <span {...column.getSortByToggleProps()}>
                  {column.isSorted ? column.isSortedDesc
                    ? ' ↓'
                    : ' ↑'
                  : ' ---'}
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
                          {row.isExpanded ? '⇩' : '⇨'}
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

const columns = [
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
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} unique name(s)`
    },
    {
      Header: "Ad Size",
      accessor: "size",
      aggregate: "uniqueCount",
      Aggregated: ({ value }) => `${value} unique ad sizes`
    },
  ];

const tableData = [
  {
    adName: "SwitchItUp",
    size: "Small",
    campaign: "Nintendo Switch",
    impressions: 100,
    clicks: 10,
    conversions: 1,
  },
  {
    adName: "Apples4U",
    size: "Medium",
    campaign: "Apples",
    impressions: 2000,
    clicks: 300,
    conversions: 50,
  },
  {
    adName: "OrangesRCool",
    size: "Large",
    campaign: "Oranges",
    impressions: 10,
    clicks: 0,
    conversions: 0,
  },
  {
    adName: "BigSwitch",
    size: "Large",
    campaign: "Nintendo Switch",
    impressions: 400,
    clicks: 300,
    conversions: 290,
  },
];

class AdTable extends React.Component {
  state = { ads: [] }
  
  componentDidMount() {
    axios.get('/ad')
      .then(res => {
        const ads = res.data;
        console.log(ads);

        const tempArray = [];
        ads.forEach(ad => {
          var tempAd = {
            adName: ad.adName,
            altText: ad.altText,
            buttonAlign: ad.buttonAlign,
            buttonText: ad.buttonText,
            campaign: ad.campaign,
            size: ad.size,
            impressions: ad.statistics.impressions.seen,
            clicks: ad.statistics.impressions.clicks,
            conversions: ad.statistics.impressions.ctr,
            subtitle: ad.subtitle,
            title: ad.title,
            url: ad.url,
          }
          tempArray.push(tempAd);
        }) 
        this.setState({ ads: tempArray });
        console.log(this.state.ads);
      })
      .catch(err => {
        console.log(err);
      })
  }


  // Change tableData to ads once headers and attributes are solidified
  render() {
    return (
      <Styles>
        <Table columns={columns} data={tableData} />
      </Styles>
    )
  };
}

export default AdTable;
