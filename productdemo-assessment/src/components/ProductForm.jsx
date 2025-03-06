import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";

function ProductForm({
  open,
  setOpen,
  currentProduct,
  setCurrentProduct,
  handleSave,
}) {
  const [isDiscountValid, setIsDiscountValid] = useState(true);

  useEffect(() => {
    setIsDiscountValid(true);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "discount") {
      if (value === "" || (Number(value) >= 1 && Number(value) <= 100)) {
        setIsDiscountValid(true);
      } else {
        setIsDiscountValid(false);
      }
    }

    setCurrentProduct((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        "@media (max-width: 600px)": {
          ".MuiDialog-paper": {
            margin: "10px",
            width: "calc(100% - 20px)",
          },
        },
      }}
    >
      <DialogTitle>
        {currentProduct.id ? "Update Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={currentProduct.title || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={currentProduct.description || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={currentProduct.price || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Discount (%)"
          name="discount"
          type="number"
          value={currentProduct.discount || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
          inputProps={{ min: 1, max: 100 }}
          error={!isDiscountValid}
          helperText={
            !isDiscountValid ? "Discount must be between 1 and 100" : ""
          }
        />
        <TextField
          label="Thumbnail URL"
          name="thumbnail"
          value={currentProduct.thumbnail || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!isDiscountValid}
          style={{ opacity: isDiscountValid ? 1 : 0.5 }}
        >
          {currentProduct.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;
