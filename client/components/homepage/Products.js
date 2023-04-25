import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography, Pagination } from "@mui/material";
import Product from "./SingleProduct";

const Products = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [page, setPage] = useState(1);
  const cartitems = useSelector((state) => state.cart.items);
  const productsPerPage = 9;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const Top = products.filter((product) => product.category === "Top");
  const Bottom = products.filter((product) => product.category === "Bottom");
  const Dress = products.filter((product) => product.category === "Dress");

  const filteredProducts =
    value === "all"
      ? products
      : value === "TOP"
      ? Top
      : value === "BOTTOM"
      ? Bottom
      : Dress;

  const totalProducts = filteredProducts.length;
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="TOP" value="TOP" />
        <Tab label="BOTTOM" value="BOTTOM" />
        <Tab label="DRESS" value="DRESS" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {displayedProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="40px">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Products;
