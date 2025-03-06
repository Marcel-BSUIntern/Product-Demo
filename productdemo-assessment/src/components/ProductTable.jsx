import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Chip,
  Box,
} from "@mui/material";

function ProductTable({
  products,
  searchTerm,
  page,
  pageSize,
  setCurrentProduct,
  setOpen,
  handleDelete,
  setSelectedProduct,
}) {
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 600) {
        document.documentElement.style.setProperty(
          "--product-grid-columns",
          "1fr 1fr 1fr 1fr"
        );
      } else {
        document.documentElement.style.setProperty(
          "--product-grid-columns",
          "1fr"
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        padding: "1rem",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          "@media (max-width: 900px)": {
            minWidth: "100%",
            "& img": { width: 48, height: 48 },
            "& .MuiTypography-root": { fontSize: "0.9rem" },
            "& .MuiButton-root": { fontSize: "0.75rem", padding: "0.25rem" },
          },
          "@media (max-width: 600px)": {
            display: "block",
            "& thead": { display: "none" },
            "& tbody": {
              display: "block",
              "& tr": {
                display: "flex",
                flexDirection: "column",
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              },
            },
            "& td": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0",
            },
          },
        }}
      >
        <TableHead style={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Thumbnail
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Name
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Description
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Price & Discount
            </TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow
              key={product.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProduct(product)}
            >
              <TableCell>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: 64,
                    height: 64,
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">{product.title}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{product.description}</Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" color="primary">
                    ₱{(Number(product.price) || 0).toFixed(2)}
                  </Typography>
                  {product.discountPercentage && (
                    <Chip
                      label={`${product.discountPercentage}% OFF`}
                      color="primary"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentProduct(product);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ProductTable;
