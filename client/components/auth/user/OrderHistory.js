import React, { useEffect, useState } from "react";
import {fetchUserHistory} from "../../../store/orderSlice"
import { useSelector, useDispatch } from "react-redux";
import {fetchProducts} from "../../../store/productSlice"
import { shades } from "../../../theme";
import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const dispatch = useDispatch()
  const userId=useSelector(state=>state.auth.me.id)
  const products = useSelector((state) => state.products.allProducts);
  const historyorder=useSelector(state=>state.order.loggedinorder)  
  const navigate = useNavigate()
  const time= useSelector(state=>state.order.loggedinorder.updatedAt)
  // const matchingProducts =  historyorder ? 
  //   historyorder.map(({ productId }) => products.find(product => product.id === productId)) :
  //   [];
  console.log(historyorder)
  

  useEffect(()=>{
    if (userId){
      dispatch(fetchUserHistory(userId))
      dispatch(fetchProducts())
    }
  }, [dispatch,userId])


  return (
    <Box
      margin="0 auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, 300px)"
      justifyContent="space-around"
      rowGap="20px"
      columnGap="1.33%"
    >
      {!historyorder || historyorder.length === 0 ? (
        <Typography fontWeight="bold">You have not made any order yet</Typography>
      ) : (
        <>
          {historyorder.map((order, index) => {
            return (
              <div key={order.id}>
                <Box
                  sx={{
                    padding: "10px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    Order {index + 1}
                  </Typography>
                  {order.products.map(({ productId, quantity }) => {
                    const matchingProduct = products.find(
                      (product) => product.id === productId
                    );
                    return (
                      <Box
                        key={productId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            marginRight: "20px",
                            position: "relative",
                            height: "100px",
                            width: "100px",
                          }}
                        >
                          <img
                            alt={matchingProduct.name}
                            height="100%"
                            width="100%"
                            src={matchingProduct.imageURL}
                            onClick={() => navigate(`/product/${productId}`)}
                            style={{ cursor: "pointer" }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            {matchingProduct.name}
                          </Typography>
                          <Typography>
                            Quantity: {quantity} x ${matchingProduct.price}
                          </Typography>
                          <Typography>Total: ${matchingProduct.price * quantity}</Typography>
                          <Typography>Bought at: {order.createdAt}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </div>
            );
          })}
        </>
      )}
    </Box>
  );
}

export default OrderHistory;