import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@material-ui/core/";
import FormButton from "../Button";
import Select from "../Select";
import "./returnModal.css";

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

const initialFormState = {
  products: "",
};

const formValidation = Yup.object().shape({
  products: Yup.object().required("Required"),
});

export default function BasicModal({
  productData,
  setProductData,
  bookProducts,
  setBookProducts,
}) {
  // const [products, setProducts] = useState({});
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [childOpen, setChildOpen] = useState(false);
  const handleChildOpen = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const [currentProduct, setCurrentProduct] = useState(null);
  // const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   setProducts(bookProducts);
  // }, [bookProducts]);

  const handleSubmit = (values) => {
    handleChildOpen();
  };

  const handleChildSubmit = () => {
    handleChildClose();
    handleClose();

    const index = productData.findIndex(
      (product) => product.code === currentProduct.code
    );
    let changingProduct = productData;
    changingProduct[index].availability = true;
    setProductData(changingProduct);
    changingProduct = bookProducts.filter(
      (product) => product.code !== currentProduct.code
    );
    setBookProducts(changingProduct);
    localStorage.setItem("bookedData", JSON.stringify(changingProduct));
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        disabled={bookProducts.length === 0}
      >
        RETURN
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="title"
          >
            Return a product
          </Typography>
          <Formik
            initialValues={{ ...initialFormState }}
            validationSchema={formValidation}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <Select
                    name="products"
                    label="Product"
                    options={bookProducts}
                    returns={true}
                    setCurrentProduct={setCurrentProduct}
                  ></Select>
                </Grid>
                <Grid item xs={12}>
                  {currentProduct && currentProduct.usedMileage ? (
                    <span>Used Mileage: {currentProduct.usedMileage}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth="true"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormButton>Yes</FormButton>
                </Grid>
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="title"
          >
            Return a product
          </Typography>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              {currentProduct && `Your total price is $${currentProduct.cost}`}
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth="true"
                onClick={handleChildClose}
              >
                No
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth="true"
                onClick={handleChildSubmit}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
