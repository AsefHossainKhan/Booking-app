import React, { useEffect, useState } from "react";
import Table from "./Components/Table";
import Stack from "@mui/material/Stack";
import BookModal from "./Components/BookModal";
import ReturnModal from "./Components/ReturnModal";
import data from "./data/Data.json";
import "./App.css";

function App() {
  const [productData, setProductData] = useState([]);
  const [bookedProducts, setBookedProducts] = useState([]);
  useEffect(() => {
    setProductData(
      data.map((row, index) => {
        return {
          id: row.code,
          index: index,
          name: row.name,
          code: row.code,
          type: row.type,
          max_durability: row.max_durability,
          price: row.price,
          availability: row.availability,
          needingRepair: row.needing_repair,
          durability: `${row.durability} / ${row.max_durability}`,
          mileage: row.mileage ? row.mileage : "N/A",
          minimum_rent_period: row.minimum_rent_period,
        };
      })
    );
  }, []);
  useEffect(() => {
    console.log(bookedProducts);
  }, [bookedProducts]);
  return (
    <div>
      <Table data={productData} />
      <Stack spacing={2} direction="row">
        <BookModal
          productData={productData}
          setProductData={setProductData}
          bookProducts={bookedProducts}
          setBookProducts={setBookedProducts}
        />
        <ReturnModal
          productData={productData}
          setProductData={setProductData}
          bookProducts={bookedProducts}
          setBookProducts={setBookedProducts}
        />
      </Stack>
    </div>
  );
}

export default App;
