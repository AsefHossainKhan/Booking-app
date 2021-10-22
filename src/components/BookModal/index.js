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

export default function BasicModal({ productData, setProductData }) {
  const [products, setProducts] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [childOpen, setChildOpen] = useState(false);
  const handleChildOpen = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [rentDuration, setRentDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (values) => {
    // console.log(values);
    setCurrentProduct(values.products);
    const rentPeriod = Math.floor(
      (Date.parse(values.to) - Date.parse(values.from)) / 86400000
    );
    setRentDuration(rentPeriod);
    if (rentPeriod < values.products.minimum_rent_period) {
      alert(
        `minimum rent period must be ${values.products.minimum_rent_period} days`
      );
    } else {
      setPrice(rentPeriod * values.products.price);
      handleChildOpen();
    }
  };

  const handleChildSubmit = () => {
    handleChildClose();
    handleClose();
    const totalMileage = rentDuration * 10;
    const durabilityDecrease =
      rentDuration * 2 + Math.floor(rentDuration / 10) * 2;

    const index = productData.findIndex(
      (product) => product.code === currentProduct.code
    );
    let changingProduct = productData;
    if (changingProduct[index].mileage !== "N/A") {
      changingProduct[index].mileage += totalMileage;
    }
    console.log(changingProduct[index].durability);
    let s = changingProduct[index].durability;
    let y = parseInt(s.split("/")[0].trim());
    if (y <= durabilityDecrease) {
      y = 0;
      changingProduct[index].availability = false;
    } else if (y > durabilityDecrease) {
      y -= durabilityDecrease;
    }
    changingProduct[index].durability = `${y} / ${s.split("/")[1].trim()}`;
    setProductData(changingProduct);
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
        Book
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
              {`Your estimated price is ${price} \n Do you want to procede?`}
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleChildClose}>No</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleChildSubmit}>Yes</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
