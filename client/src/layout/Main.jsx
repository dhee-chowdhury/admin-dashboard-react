import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        {/* Navbar here */}
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
