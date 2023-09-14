import React from "react";
import {Box, Typography} from "@mui/material";
import NNGCLogo from "../../assets/nngc-logo.png";
import { Link } from 'react-router-dom';
const NavBottom = () => {
  return (
    <Box sx={{ padding: '1rem' }}>
	  <Box sx={{ maxWidth: '150px', mx: 'auto' }}>
          <Link to="/">
		  <img src={NNGCLogo} alt="Northern Neck Garbage logo" style={{ width: '100%', height: 'auto' }} />
          </Link>
	  </Box>
      <Typography align="center" variant="body1" sx={{ fontWeight: 300 }}>
		Let's Keep the Northern Neck Wonderful!
      </Typography>
    </Box>
  );
};

export default NavBottom;

