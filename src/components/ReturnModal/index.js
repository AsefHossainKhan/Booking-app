import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@material-ui/core/";
import FormButton from "../Button";
import DateTimePicker from "../DateTimePicker";
import Select from "../Select";
import data from "../../data/Data.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  //changed this???
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const initialFormState = {
  products: "",
  from: "",
  to: "",
};

const formValidation = Yup.object().shape({
  products: Yup.object().required("Required"),
  from: Yup.date().required("Required"),
  to: Yup.date()
    .required("Required")
    .when("from", (from, schema) => from && schema.min(from)),
});

export default function BasicModal() {
  const [products, setProducts] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [childOpen, setChildOpen] = useState(false);
  const handleChildOpen = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const handleSubmit = (values) => {
    console.log(values);
    handleChildOpen();
  };

  useEffect(() => {
    setProducts(
      data.map((row) => {
        return {
          row,
        };
      })
    );
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        RETURN
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book a product
          </Typography>
          <Formik
            initialValues={{ ...initialFormState }}
            validationSchema={formValidation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid item xs={12}>
                <Select
                  name="products"
                  label="Product"
                  options={products}
                ></Select>
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker name="from" label="From" />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker name="to" label="To" />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleClose}>No</Button>
              </Grid>
              <Grid item xs={12}>
                <FormButton>Yes</FormButton>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={childOpen}
        onClose={handleChildClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Book a product
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              {"It is going to cost you nothing"}
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleChildClose}>No</Button>
            </Grid>
            <Grid item xs={6}>
              <Button>Yes</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
