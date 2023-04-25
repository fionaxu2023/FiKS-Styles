import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts } from "../../../store/productSlice"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AdminProduct from './AdminSingleProduct';
import Userinfo from './Userinfo';
import AdminAdd from "./AdminAdd"
const AdminProducts = () => {

    const products = useSelector((state)=> state.products.allProducts);
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
   
     const Top = products.filter(
        (product) => product.category === "Top"
      );
      const Bottom = products.filter(
        (product) => product.category === "Bottom"
      );

      const Dress = products.filter(
        (product) => product.category === "Dress"
      );
      return (
        
        <Box width="80%" margin="80px auto">
          <Typography variant="h3" textAlign="center">
            Administrator Dashboard
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
            <Tab label="USER" value="USER"></Tab>
            <Tab label="ADD" value="ADD"></Tab>
          </Tabs>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
          >
            {value === "all" &&
              products.map((adminproduct) => (
                <AdminProduct adminproduct={adminproduct} key={adminproduct.id} />
              ))}
            {value === "TOP" &&
              Top.map((adminproduct) => (
                <AdminProduct adminproduct={adminproduct} key={adminproduct.id} />
              ))}
            {value === "BOTTOM" &&
               Bottom.map((adminproduct) => (
                <AdminProduct adminproduct={adminproduct} key={adminproduct.id} />
              ))}
            {value === "DRESS" &&
              Dress.map((adminproduct) => (
                <AdminProduct adminproduct={adminproduct} key={adminproduct.id} />
              ))}
              {value === "USER" && <Userinfo/> }
              {value === "ADD" && <AdminAdd/> }
          </Box>
        </Box>
      );
    };

export default AdminProducts;