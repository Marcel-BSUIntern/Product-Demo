import { Pagination, Select, MenuItem, Box, Typography } from "@mui/material";

const PaginationControls = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1} // Adjust spacing between items
      sx={{ mt: 2 }}
    >
      {/* Pagination Controls */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        shape="rounded"
      />

      {/* Page Size Selector */}
      <Typography variant="body2">Per page</Typography>
      <Select
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
        size="small" // Make it more compact
        sx={{ minWidth: "70px" }} // Adjust width
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </Box>
  );
};

export default PaginationControls;
