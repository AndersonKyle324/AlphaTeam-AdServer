import React from "react";
import styled from "styled-components";
import { Button, Alert } from "react-bootstrap";
import {
  useRowSelect,
  useSortBy,
  useTable,
  useGroupBy,
  useExpanded,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";
import PublishModal from "../PublishModal/PublishModal";
import AddModal from "../AddModal/AddModal";
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function Table({ columns, data }) {
  const [inputs, setInputs] = React.useState({
    showPub: false,
    showAdd: false,
    selectedAd: {},
    error: false,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    { columns, data },
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Create a column for selection
        {
          id: "selection",
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const openAddModal = () => {
    if (selectedFlatRows.length !== 1) {
      setInputs({ ...inputs, error: true });
    } else {
      const ad = selectedFlatRows[0].original;
      setInputs({ ...inputs, selectedAd: ad, showAdd: true, error: false });
    }
  };

  const openPublishModal = () => {
    if (selectedFlatRows.length !== 1) {
      setInputs({ ...inputs, error: true });
    } else {
      const ad = selectedFlatRows[0].original;
      setInputs({ ...inputs, selectedAd: ad, showPub: true, error: false });
    }
  };

  return (
    <div style={{margin: '10px'}}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>Σ</span>
                  ) : null}{" "}
                  {column.render("Header")}{" "}
                  <span {...column.getSortByToggleProps()}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortAmountDown} />
                      ) : (
                        <FontAwesomeIcon icon={faSortAmountDownAlt} />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faSort} />
                    )}
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
                          ? "#0aff0082"
                          : cell.isAggregated
                          ? "#ffa50078"
                          : cell.isPlaceholder
                          ? "#ff000042"
                          : "white",
                      }}
                    >
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "⇩" : "⇨"}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={() => openAddModal()} style={{ margin: "10px" }}>Edit Selected Ad</Button>
      <Button onClick={() => openPublishModal()}>Publish Selected Ad</Button>
      {inputs.error ? (
        <Alert variant="warning" className="p-2">
          Select 1 valid ad
        </Alert>
      ) : null}
      <PublishModal
        ad={inputs.selectedAd}
        show={inputs.showPub}
        onHide={() => setInputs({ ...inputs, showPub: false })}
      />
      <AddModal
        ad={inputs.selectedAd}
        show={inputs.showAdd}
        onHide={() => setInputs({ ...inputs, showAdd: false })}
      />
    </div>
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
    Aggregated: ({ value }) => `${value} (total)`,
  },
  {
    Header: "Clicks",
    accessor: "clicks",
    aggregate: "sum",
    Aggregated: ({ value }) => `${value} (total)`,
  },
  {
    Header: "Conversions",
    accessor: "conversions",
    aggregate: "sum",
    Aggregated: ({ value }) => `${value} (total)`,
  },
  {
    Header: "Ad Name",
    accessor: "adName",
    aggregate: "uniqueCount",
    Aggregated: ({ value }) => `${value} unique name(s)`,
  },
  {
    Header: "Ad Size",
    accessor: "size",
    aggregate: "uniqueCount",
    Aggregated: ({ value }) => `${value} unique ad sizes`,
  },
];

class AdTable extends React.Component {
  state = { ads: [] };

  componentDidMount() {
    axios
      .get("/ad")
      .then((res) => {
        const ads = res.data;

        const tempArray = [];
        ads.forEach((ad) => {
          var tempAd = {
            id: ad.id,
            adName: ad.adName,
            altText: ad.altText,
            alignment: ad.alignment,
            buttonText: ad.buttonText,
            campaign: ad.campaign,
            size: ad.size,
            impressions: ad.statistics.seen,
            clicks: ad.statistics.clicks,
            conversions: ad.statistics.ctr,
            subtitle: ad.subtitle,
            title: ad.title,
            url: ad.url,
          };
          tempArray.push(tempAd);
        });
        this.setState({ ads: tempArray });
        console.log(this.state.ads);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Styles>
        <Table columns={columns} data={this.state.ads} />
      </Styles>
    );
  }
}

export default AdTable;
