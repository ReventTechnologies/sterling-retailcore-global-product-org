export const bulkCreationColumns = [
  {
    header: "S/N",
    accessor: "serial",
  },
  {
    header: "Surname",
    accessor: "surname",
    isSorted: true,
    isSortedDesc: true,
  },
  {
    header: "First Name",
    accessor: "firstName",
  },
  {
    header: "Other Names",
    accessor: "otherNames",
  },
  {
    header: "ID Type",
    accessor: "idType",
  },
  {
    header: "ID Number",
    accessor: "id",
  },
  {
    header: "Validation Status",
    accessor: "status",
    mapping: ["Failed", "Successful"],
  },
  {
    header: "Status Description",
    accessor: "statusDescription",
  },
  {
    header: "Action",
    accessor: "",
  },
];
export const bulkProcessSummaryColumns = [
  {
    header: "S/N",
    accessor: "serial",
  },
  {
    header: "Surname",
    accessor: "surname",
    isSorted: true,
    isSortedDesc: true,
  },
  {
    header: "First Name",
    accessor: "firstName",
  },
  {
    header: "Other Names",
    accessor: "otherNames",
  },
  {
    header: "ID Type",
    accessor: "idType",
  },
  {
    header: "ID Number",
    accessor: "id",
  },
  {
    header: "Generated ID",
    accessor: "generatedId",
  },
  {
    header: "Action",
    accessor: "",
  },
];

// 08083051087