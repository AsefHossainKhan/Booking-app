import React, { useEffect, useState } from "react";
import Table from "./Components/Table";
import Stack from "@mui/material/Stack";
import BookModal from "./Components/BookModal";
import ReturnModal from "./Components/ReturnModal";
import data from "./data/Data.json";
import "./App.css";

function App() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    setProductData(
      data.map((row, index) => {
        return {
          id: row.code,
          index: index,
          name: row.name,
          code: row.code,
          availability: row.availability,
          needingRepair: row.needing_repair,
          durability: `${row.durability} / ${row.max_durability}`,
          mileage: row.mileage ? row.mileage : "N/A",
          test: "hello",
        };
      })
    );
  }, []);
  return (
    <div>
      <Table data={productData} />
      <Stack spacing={2} direction="row">
        <BookModal productData={productData} setProductData={setProductData} />
        <ReturnModal />
      </Stack>
    </div>
  );
}

export default App;
