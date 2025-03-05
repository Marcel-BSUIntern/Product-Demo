import { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ searchTerm, setSearchTerm }) {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false); // Tracks focus state

  // Show "Searching..." only while typing & focused
  useEffect(() => {
    if (searchTerm && focused) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500); // Simulated delay
      return () => clearTimeout(timer);
    }
  }, [searchTerm, focused]);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        label="Search product"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)} // Hide "Searching..." when losing focus
        InputProps={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setSearchTerm("")}
                size="small"
                sx={{ color: "red" }}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loading && focused && (
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: "5px" }}
        >
          Searching...
        </Typography>
      )}
    </div>
  );
}

export default SearchBar;
