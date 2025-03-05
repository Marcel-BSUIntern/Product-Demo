import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function ProductDetails({ product, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={!!product} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {product.title}
        <IconButton onClick={onClose} size="small" sx={{ color: "red" }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "100%", height: "auto", marginBottom: "10px" }}
        />
        <Typography variant="body1">{product.description}</Typography>
        <Typography variant="h6" color="primary" style={{ marginTop: "10px" }}>
          ₱{(Number(product.price) || 0).toFixed(2)}
        </Typography>
        {product.discount > 0 && (
          <Typography color="secondary">{product.discount}% OFF</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
