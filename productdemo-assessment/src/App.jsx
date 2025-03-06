import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Button, Typography, Grid } from "@mui/material";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import PaginationControls from "./components/PaginationControls";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    discount: "",
    thumbnail: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/smartphones")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddOrUpdate = () => {
    if (currentProduct.id) {
      setProducts(
        products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
      );
    } else {
      const newProduct = { ...currentProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    setOpen(false);
    setCurrentProduct({
      id: null,
      title: "",
      description: "",
      price: "",
      discount: "",
      thumbnail: "",
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Container
      maxWidth="lg"
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: "0 auto",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "1rem",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={1} style={{ margin: 0, width: "100%" }}>
          <Grid item xs={12}>
            <div
              style={{
                backgroundColor: "#007bff",
                padding: "10px",
                textAlign: "center",
                borderRadius: "3px",
                marginBottom: ".2rem",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                style={{ color: "white", fontWeight: "bold" }}
              >
                PRODUCTS DEMO
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ textAlign: "left", marginBottom: ".1rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setCurrentProduct({
                  id: null,
                  title: "",
                  description: "",
                  price: "",
                  discount: "",
                  thumbnail: "",
                });
                setOpen(true);
              }}
              style={{
                marginBottom: ".1rem",
                width: "200px",
                maxWidth: "100%",
              }}
            >
              Add Product
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: ".2rem",
              marginTop: 0,
            }}
          >
            <div style={{ width: "80%" }}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <div
              style={{ width: "100%", maxWidth: "1200px", padding: "0 1rem" }}
            >
              <ProductTable
                products={products}
                searchTerm={searchTerm}
                page={page}
                pageSize={pageSize}
                setCurrentProduct={setCurrentProduct}
                setOpen={setOpen}
                handleDelete={handleDelete}
                setSelectedProduct={setSelectedProduct}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <PaginationControls
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalItems={products.length}
            />
          </Grid>
        </Grid>

        <ProductForm
          open={open}
          setOpen={setOpen}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          handleSave={handleAddOrUpdate}
        />

        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Paper>
    </Container>
  );
}

export default App;
