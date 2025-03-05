import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Button, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import PaginationControls from "./components/PaginationControls";
import ProductDetails from "./components/ProductDetails"; // Import new component
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
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for product details modal

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
    <Container maxWidth="lg" className="container">
      <Paper elevation={3} style={{ padding: "1rem", paddingTop: "1rem" }}>
        <div
          style={{
            backgroundColor: "#007bff",
            padding: "10px",
            textAlign: "center",
            borderRadius: "3px",
            marginBottom: ".5rem",
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
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
          style={{ marginBottom: "1rem" }}
        >
          Add Product
        </Button>
        <ProductTable
          products={products}
          searchTerm={searchTerm}
          page={page}
          pageSize={pageSize}
          setCurrentProduct={setCurrentProduct}
          setOpen={setOpen}
          handleDelete={handleDelete}
          setSelectedProduct={setSelectedProduct} // Pass new function to open details
        />
        <PaginationControls
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItems={products.length}
        />
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
