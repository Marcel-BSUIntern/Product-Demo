import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails({ product, onClose }) {
  if (!product) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Dialog
      open={!!product}
      onClose={onClose}
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
        {/* Image Carousel using React Slick */}
        <Slider {...settings}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} - ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
          ))}
        </Slider>

        <Typography variant="h6" color="primary">
          ₱{(Number(product.price) || 0).toFixed(2)}
        </Typography>
        {product.discountPercentage > 0 && (
          <Typography
            color="secondary"
            sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
          >
            {product.discountPercentage}% OFF
          </Typography>
        )}
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          {product.description}
        </Typography>

        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Brand: <span style={{ fontWeight: "normal" }}>{product.brand}</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Category:{" "}
            <span style={{ fontWeight: "normal" }}>{product.category}</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Stock:{" "}
            <span style={{ fontWeight: "normal" }}>{product.stock} units</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Rating:{" "}
            <span style={{ fontWeight: "normal" }}>{product.rating} / 5</span>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDetails;
