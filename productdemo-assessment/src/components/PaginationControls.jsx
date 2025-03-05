import {
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
function PaginationControls({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalItems,
}) {
  const pageCount = Math.ceil(totalItems / pageSize);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <Pagination
        count={pageCount}
        page={page}
        onChange={(e, value) => setPage(value)}
        color="primary"
      />
      <FormControl variant="outlined" size="small">
        <InputLabel>Page Size</InputLabel>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          label="Page Size"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default PaginationControls;
