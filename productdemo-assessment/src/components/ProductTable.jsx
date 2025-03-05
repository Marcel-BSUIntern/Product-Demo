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
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Table>
      <TableHead style={{ backgroundColor: "#f5f5f5" }}>
        <TableRow>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderTopLeftRadius: "10px", // Rounded left corner
            }}
          >
            Thumbnail
          </TableCell>
          <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            Name
          </TableCell>
          <TableCell
            style={{ fontWeight: "bold", fontSize: "1.1rem", width: "40%" }}
          >
            Description
          </TableCell>
          <TableCell style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            Price & Discount
          </TableCell>
          <TableCell
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderTopRightRadius: "10px", // Rounded right corner
            }}
          >
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
                style={{ width: 64, height: 64 }}
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
                {product.discount && (
                  <Chip
                    label={`${product.discount}% OFF`}
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
                  e.stopPropagation(); // Prevents row click event
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
                  e.stopPropagation(); // Prevents row click event
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
  );
}

export default ProductTable;
