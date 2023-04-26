import React from 'react';
import OrderHistory from "./user/OrderHistory"
import { useSelector } from 'react-redux';
import EditProfile from './user/EditProfile';
import Profile from "./user/Profile"
import { useState } from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const UserPage=()=>{
    const [value, setValue] = useState("profile");

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };



    return (
        <Box width="80%" margin="80px auto">
          <Typography variant="h3" textAlign="center">
            User Dashboard
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
            <Tab label="Profile" value="profile" />
            <Tab label="Edit" value="edit" />
            <Tab label="Order" value="order" />
          </Tabs>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
          >
            {value === "profile" && <Profile/>}
            {value === "edit" && <EditProfile/>}
            {value === "order" && <OrderHistory/>}
          </Box>
        </Box>
      );
    };

export default UserPage