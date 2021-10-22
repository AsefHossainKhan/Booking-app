import React from "react";
import Table from "./Components/Table";
import Stack from "@mui/material/Stack";
import BookModal from "./Components/BookModal";
import ReturnModal from "./Components/ReturnModal";
import "./App.css";

function App() {
  return (
    <div>
      <Table />
      <Stack spacing={2} direction="row">
        <BookModal />
        <ReturnModal />
      </Stack>
    </div>
  );
}

export default App;
