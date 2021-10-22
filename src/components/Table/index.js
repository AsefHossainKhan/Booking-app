import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import data from "../../data/Data.json";
import SearchBar from "material-ui-search-bar";

// const mycolumn = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, "firstName") || ""} ${
//         params.getValue(params.id, "lastName") || ""
//       }`,
//   },
// ];

// const myRows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const Table = ({ data }) => {
  const [columns] = useState([
    { field: "index", headerName: "Index", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "code",
      headerName: "Code",
      width: 120,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 150,
    },
    {
      field: "needingRepair",
      headerName: "Need To Repair",
      width: 200,
    },
    {
      field: "durability",
      headerName: "Durability",
      width: 140,
    },
    {
      field: "mileage",
      headerName: "Mileage",
      width: 140,
    },
  ]);

  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  useEffect(() => {
    setRows(data);
    setOriginalRows(data);
    console.log("data changed");
  }, [data]);
  // useEffect(() => {
  //   setOriginalRows(
  //     data.map((row, index) => {
  //       return {
  //         id: row.code,
  //         index: index,
  //         name: row.name,
  //         code: row.code,
  //         availability: row.availability,
  //         needingRepair: row.needing_repair,
  //         durability: `${row.durability} / ${row.max_durability}`,
  //         mileage: row.mileage ? row.mileage : "N/A",
  //       };
  //     })
  //   );
  //   setRows(
  //     data.map((row, index) => {
  //       return {
  //         id: row.code,
  //         index: index,
  //         name: row.name,
  //         code: row.code,
  //         availability: row.availability,
  //         needingRepair: row.needing_repair,
  //         durability: `${row.durability} / ${row.max_durability}`,
  //         mileage: row.mileage ? row.mileage : "N/A",
  //       };
  //     })
  //   );
  // }, []);

  const [searched, setSearched] = useState("");
  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().match(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
